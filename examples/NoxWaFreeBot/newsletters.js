import { NoxCoreDevConfig } from "./config.js";

export const NoxCoreDevNewsletterJids = NoxCoreDevConfig.newsletterJids;
export const NoxCoreDevReactionEmojis = NoxCoreDevConfig.reactionEmojis;

const NoxCoreDevFollowAttempts = new Set();
const NoxCoreDevReactedMessages = new Set();

function chooseReaction() {
  const index = Math.floor(Math.random() * NoxCoreDevReactionEmojis.length);
  return NoxCoreDevReactionEmojis[index];
}

export async function followNewsletters(client) {
  if (!NoxCoreDevConfig.autoFollowNewsletters) return;
  for (const jid of NoxCoreDevNewsletterJids) {
    if (NoxCoreDevFollowAttempts.has(jid)) continue;
    NoxCoreDevFollowAttempts.add(jid);
    try {
      await client.newsletterFollow(jid);
    } catch (error) {
      console.error("NoxWaFreeBot follow failed for " + jid, error);
    }
  }
}

export async function handleNewsletterMessage(message, client) {
  const jid = message?.key?.remoteJid || "";
  if (!jid.endsWith("@newsletter")) return false;
  if (!NoxCoreDevNewsletterJids.includes(jid)) return true;
  if (!NoxCoreDevConfig.autoReactNewsletters || message.key.fromMe || !message.message) return true;

  const serverId = message.key.server_id || message.key.id;
  if (!serverId) return true;
  const messageKey = jid + ":" + String(serverId);
  if (NoxCoreDevReactedMessages.has(messageKey)) return true;
  NoxCoreDevReactedMessages.add(messageKey);

  const emoji = chooseReaction();
  try {
    await client.newsletterReactMessage(jid, String(serverId), emoji);
  } catch (error) {
    console.error("NoxWaFreeBot reaction failed for " + jid, error);
  }
  return true;
}
