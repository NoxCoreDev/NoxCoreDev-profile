const crypto = require("node:crypto");
const ARTICLE_SLUGS = require("../src/data/article-slugs.json");

const VIEW_WINDOW_SECONDS = 24 * 60 * 60;
const RATE_LIMIT_PER_MINUTE = 120;
const DEFAULT_SITE_URL = "https://noxcoredev.is-a.dev";

const recordViewScript = `
local created = redis.call('SET', KEYS[1], '1', 'NX', 'EX', ARGV[1])
if created then
  return redis.call('INCR', KEYS[2])
end
return tonumber(redis.call('GET', KEYS[2]) or '0')
`;

const toggleLikeScript = `
local liked = redis.call('GET', KEYS[2])
if ARGV[1] == 'like' and not liked then
  redis.call('SET', KEYS[2], '1')
  return redis.call('INCR', KEYS[1])
end
if ARGV[1] == 'unlike' and liked then
  redis.call('DEL', KEYS[2])
  local count = redis.call('DECR', KEYS[1])
  if count < 0 then
    redis.call('SET', KEYS[1], '0')
    return 0
  end
  return count
end
return tonumber(redis.call('GET', KEYS[1]) or '0')
`;

const rateLimitScript = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('EXPIRE', KEYS[1], 60) end
return count
`;

function send(res, status, payload) {
  res.setHeader("Cache-Control", "no-store");
  return res.status(status).json(payload);
}

function validVisitorId(value) {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function hash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

async function redisCommand(command) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Social database is not configured.");

  const response = await fetch(`${url.replace(/\/$/, "")}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([command]),
  });
  const result = await response.json();
  if (!response.ok || !Array.isArray(result) || result[0]?.error) {
    throw new Error("The social database request failed.");
  }
  return result[0]?.result;
}

async function readStats(slug, visitorHash) {
  const viewsKey = `article:${slug}:views`;
  const likesKey = `article:${slug}:likes`;
  const commands = [["MGET", viewsKey, likesKey]];
  if (visitorHash) commands.push(["GET", `article:${slug}:voter:${visitorHash}`]);

  const url = process.env.UPSTASH_REDIS_REST_URL.replace(/\/$/, "");
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });
  const result = await response.json();
  if (!response.ok || !Array.isArray(result) || result.some((item) => item?.error)) {
    throw new Error("The social database request failed.");
  }

  const [views, likes] = result[0]?.result || [];
  return {
    views: Number(views || 0),
    likes: Number(likes || 0),
    liked: visitorHash ? result[1]?.result === "1" : false,
  };
}

function getVisitorId(req, body) {
  const raw = req.method === "GET" ? req.headers["x-visitor-id"] : body?.visitorId;
  return validVisitorId(raw) ? raw : null;
}

function getRequestIp(req) {
  const realIp = req.headers["x-real-ip"];
  const forwarded = req.headers["x-forwarded-for"];
  const firstForwarded = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0];
  return (realIp || firstForwarded || req.socket?.remoteAddress || "unknown").trim();
}

function originIsAllowed(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    const allowedOrigins = new Set([new URL(process.env.SITE_URL || DEFAULT_SITE_URL).origin]);
    if (process.env.VERCEL_URL) {
      const deploymentUrl = process.env.VERCEL_URL.startsWith("http")
        ? process.env.VERCEL_URL
        : `https://${process.env.VERCEL_URL}`;
      allowedOrigins.add(new URL(deploymentUrl).origin);
    }
    return allowedOrigins.has(new URL(origin).origin);
  } catch {
    return false;
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return send(res, 405, { error: "Method not allowed." });
  }
  if (!originIsAllowed(req)) return send(res, 403, { error: "Origin not allowed." });
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return send(res, 503, { error: "Article counters are not configured." });
  }

  const body = req.method === "POST" && typeof req.body === "string"
    ? (() => { try { return JSON.parse(req.body); } catch { return {}; } })()
    : req.body || {};
  const slug = req.method === "GET" ? req.query?.slug : body.slug;
  if (typeof slug !== "string" || !ARTICLE_SLUGS.includes(slug)) {
    return send(res, 404, { error: "Article not found." });
  }

  const visitorId = getVisitorId(req, body);
  const visitorHash = visitorId ? hash(visitorId) : null;

  try {
    if (req.method === "GET") {
      return send(res, 200, await readStats(slug, visitorHash));
    }

    if (!visitorHash) return send(res, 400, { error: "A valid visitor ID is required." });
    const ipHash = hash(getRequestIp(req));
    const rateCount = Number(await redisCommand([
      "EVAL",
      rateLimitScript,
      "1",
      `article:rate:${ipHash}:${Math.floor(Date.now() / 60000)}`,
    ]));
    if (rateCount > RATE_LIMIT_PER_MINUTE) {
      return send(res, 429, { error: "Too many requests. Try again shortly." });
    }

    const action = body.action;
    if (action === "view") {
      await redisCommand([
        "EVAL",
        recordViewScript,
        "2",
        `article:${slug}:viewed:${visitorHash}`,
        `article:${slug}:views`,
        String(VIEW_WINDOW_SECONDS),
      ]);
    } else if (action === "like" || action === "unlike") {
      await redisCommand([
        "EVAL",
        toggleLikeScript,
        "2",
        `article:${slug}:likes`,
        `article:${slug}:voter:${visitorHash}`,
        action,
      ]);
    } else {
      return send(res, 400, { error: "Unsupported action." });
    }

    return send(res, 200, await readStats(slug, visitorHash));
  } catch (error) {
    console.error("Article stats error:", error.message);
    return send(res, 502, { error: "Article counters are temporarily unavailable." });
  }
};
