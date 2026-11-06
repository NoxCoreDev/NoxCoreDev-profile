import { NoxCoreDevConfig } from "./config.js";

export const NoxCoreDevGroupSettings = new Map();

function getGroupSettings(groupJid) {
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

export async function setGroupFeature(message, client, args, feature) {
  const groupJid = message.key.remoteJid || "";
  if (!groupJid.endsWith("@g.us")) {
    await client.sendMessage(groupJid, { text: "This command can only be used in a group." });
    return;
  }

  const value = (args[0] || "").toLowerCase();
  if (value !== "on" && value !== "off") {
    await client.sendMessage(groupJid, { text: "Use `on` or `off`." });
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
    await client.sendMessage(groupJid, { text: "Only group admins can change this setting." });
    return;
  }

  const settings = getGroupSettings(groupJid);
  settings[feature] = value === "on";
  NoxCoreDevGroupSettings.set(groupJid, settings);
  const featureLabel = feature === "welcome" ? "Welcome messages" : "Goodbye messages";
  const featureStatus = value === "on" ? "enabled." : "disabled.";
  await client.sendMessage(groupJid, { text: featureLabel + " " + featureStatus });
}

export async function handleGroupParticipantsUpdate(update, client) {
  const groupJid = update?.id || "";
  if (!groupJid.endsWith("@g.us")) return;
  if (update.action !== "add" && update.action !== "remove") return;

  const feature = update.action === "add" ? "welcome" : "goodbye";
  const settings = getGroupSettings(groupJid);
  if (!settings[feature]) return;

  const template = NoxCoreDevConfig[feature].message;
  for (const participantJid of update.participants || []) {
    if (typeof participantJid !== "string" || !participantJid) continue;
    const mention = participantJid.split("@")[0];
    const text = template.split("@user").join("@" + mention);
    await client.sendMessage(groupJid, { text, mentions: [participantJid] });
  }
}
