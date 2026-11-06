import { NoxCoreDevConfig } from "./config.js";

export const NoxCoreDevGroupSettings = new Map();

function NoxCoreDevGetGroupSettings(groupJid) {
  let settings = NoxCoreDevGroupSettings.get(groupJid);
  if (!settings) {
    settings = {
      welcome: NoxCoreDevConfig.welcome.enabled,
      goodbye: NoxCoreDevConfig.goodbye.enabled,
    };
    NoxCoreDevGroupSettings.set(groupJid, settings);
  }
  return settings;
}

export async function NoxCoreDevSetGroupFeature(message, client, args, feature) {
  const groupJid = message.key.remoteJid || "";
  if (!groupJid.endsWith("@g.us")) {
    await client.sendMessage(groupJid, { text: "Cette commande se règle dans un groupe." });
    return;
  }

  const value = (args[0] || "").toLowerCase();
  if (value !== "on" && value !== "off") {
    await client.sendMessage(groupJid, { text: "Utilise on ou off." });
    return;
  }

  const senderJid = message.key.participant || "";
  const metadata = await client.groupMetadata(groupJid);
  let senderIsAdmin = false;
  for (const participant of metadata.participants || []) {
    if (participant.id === senderJid && (participant.admin === "admin" || participant.admin === "superadmin")) {
      senderIsAdmin = true;
      break;
    }
  }
  if (!senderIsAdmin) {
    await client.sendMessage(groupJid, { text: "Option réservée aux administrateurs du groupe." });
    return;
  }

  const settings = NoxCoreDevGetGroupSettings(groupJid);
  settings[feature] = value === "on";
  NoxCoreDevGroupSettings.set(groupJid, settings);
  await client.sendMessage(groupJid, { text: feature + " : " + value });
}

export async function NoxCoreDevHandleGroupParticipantsUpdate(update, client) {
  const groupJid = update?.id || "";
  if (!groupJid.endsWith("@g.us")) return;
  if (update.action !== "add" && update.action !== "remove") return;

  const feature = update.action === "add" ? "welcome" : "goodbye";
  const settings = NoxCoreDevGetGroupSettings(groupJid);
  if (!settings[feature]) return;

  const template = NoxCoreDevConfig[feature].message;
  for (const participantJid of update.participants || []) {
    if (typeof participantJid !== "string" || !participantJid) continue;
    const mention = participantJid.split("@")[0];
    const text = template.split("@user").join("@" + mention);
    await client.sendMessage(groupJid, { text, mentions: [participantJid] });
  }
}
