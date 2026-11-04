import React, { useEffect, useState } from "react";
import { Eye, Heart, Share2 } from "lucide-react";
import { usePreferences } from "../context/PreferencesContext";

let fallbackVisitorId = "";

function newVisitorId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((value) => value.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function getVisitorId() {
  try {
    const key = "noxcoredev-social-visitor";
    let id = window.localStorage.getItem(key);
    if (!id) {
      id = newVisitorId();
      window.localStorage.setItem(key, id);
    }
    return id;
  } catch {
    fallbackVisitorId ||= newVisitorId();
    return fallbackVisitorId;
  }
}

async function readJson(response) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Article counters are unavailable.");
  return payload;
}

export default function ArticleSocialActions({ article, title, description, recordView = false, compact = false }) {
  const { t, language } = usePreferences();
  const [stats, setStats] = useState(null);
  const [state, setState] = useState("loading");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    const visitorId = getVisitorId();
    const url = `/api/article-stats?slug=${encodeURIComponent(article.slug)}`;
    const request = recordView
      ? fetch("/api/article-stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: article.slug, visitorId, action: "view" }),
        })
      : fetch(url, { headers: { Accept: "application/json", "X-Visitor-Id": visitorId } });

    request
      .then(readJson)
      .then((result) => {
        if (!active) return;
        setStats(result);
        setState("ready");
      })
      .catch(() => {
        if (active) setState("unavailable");
      });

    return () => { active = false; };
  }, [article.slug, recordView]);

  const updateReaction = async () => {
    if (state !== "ready" || busy) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/article-stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: article.slug,
          visitorId: getVisitorId(),
          action: stats.liked ? "unlike" : "like",
        }),
      });
      const result = await readJson(response);
      setStats(result);
    } catch {
      setMessage(t("article.statsUnavailable"));
    } finally {
      setBusy(false);
    }
  };

  const shareArticle = async () => {
    const url = `${window.location.origin}/blog/${article.slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, text: description, url });
        setMessage(t("article.shareDone"));
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setMessage(t("blog.linkCopied"));
      } else {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank", "noopener,noreferrer");
        setMessage(t("article.shareDone"));
      }
    } catch (error) {
      if (error.name !== "AbortError") setMessage(t("blog.shareUnavailable"));
    }
    window.setTimeout(() => setMessage(""), 3000);
  };

  const count = (value) => new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-US").format(value);
  const unavailable = state === "unavailable";
  const viewCount = stats ? count(stats.views) : unavailable ? "—" : "…";
  const likeCount = stats ? count(stats.likes) : unavailable ? "—" : "…";

  return (
    <div className={`border-t border-slate-200 pt-4 dark:border-slate-800 ${compact ? "mt-4" : "mt-5"}`}>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
        <span className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300" aria-label={`${viewCount} ${t("article.views")}`}>
          <Eye size={17} aria-hidden="true" />
          <span>{viewCount}</span>
          <span>{t("article.views")}</span>
        </span>
        <button
          type="button"
          onClick={updateReaction}
          disabled={state !== "ready" || busy}
          aria-pressed={Boolean(stats?.liked)}
          className={`inline-flex items-center gap-2 font-semibold transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-60 ${stats?.liked ? "text-primary" : "text-slate-600 dark:text-slate-300"}`}
        >
          <Heart size={17} aria-hidden="true" fill={stats?.liked ? "currentColor" : "none"} />
          <span>{stats?.liked ? t("article.unlike") : t("article.like")}</span>
          <span aria-label={`${likeCount} ${t("article.likes")}`}>{likeCount}</span>
        </button>
        <button
          type="button"
          onClick={shareArticle}
          className="inline-flex items-center gap-2 font-semibold text-slate-600 transition hover:text-primary dark:text-slate-300"
        >
          <Share2 size={17} aria-hidden="true" /> {t("blog.share")}
        </button>
      </div>
      <p className="mt-2 min-h-4 text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
        {message || (unavailable && !compact ? t("article.statsUnavailable") : "")}
      </p>
    </div>
  );
}
