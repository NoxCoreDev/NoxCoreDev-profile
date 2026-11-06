import { NoxCoreDevConfig } from "./config.js";
import { NoxCoreDevSetGroupFeature } from "./group-events.js";

async function NoxCoreDevSendReply(message, client, text) {
  await client.sendMessage(message.key.remoteJid, { text });
}

async function NoxCoreDevPingCommand(message, client) {
  await NoxCoreDevSendReply(message, client, "🏓 Pong !");
}

async function NoxCoreDevAliveCommand(message, client) {
  await NoxCoreDevSendReply(message, client, NoxCoreDevConfig.botName + " est en ligne — NoxCoreDev.");
}

async function NoxCoreDevMenuCommand(message, client) {
  const menu = NoxCoreDevConfig.commands.join("\n");
  await NoxCoreDevSendReply(message, client, NoxCoreDevConfig.botName + "\n" + menu);
}

async function NoxCoreDevModeCommand(message, client) {
  await NoxCoreDevSendReply(message, client, "Mode actuel : " + NoxCoreDevConfig.mode);
}

async function NoxCoreDevSelfCommand(message, client) {
  NoxCoreDevConfig.mode = "self";
  await NoxCoreDevSendReply(message, client, "Mode privé activé.");
}

async function NoxCoreDevPublicCommand(message, client) {
  NoxCoreDevConfig.mode = "public";
  await NoxCoreDevSendReply(message, client, "Mode public activé.");
}

async function NoxCoreDevOwnerCommand(message, client) {
  await NoxCoreDevSendReply(message, client, "Propriétaire : " + NoxCoreDevConfig.ownerName);
}

async function NoxCoreDevWelcomeCommand(message, client, args) {
  await NoxCoreDevSetGroupFeature(message, client, args, "welcome");
}

async function NoxCoreDevGoodbyeCommand(message, client, args) {
  await NoxCoreDevSetGroupFeature(message, client, args, "goodbye");
}

const NoxCoreDevCommands = new Map([
  ["ping", NoxCoreDevPingCommand],
  ["alive", NoxCoreDevAliveCommand],
  ["menu", NoxCoreDevMenuCommand],
  ["mode", NoxCoreDevModeCommand],
  ["self", NoxCoreDevSelfCommand],
  ["public", NoxCoreDevPublicCommand],
  ["owner", NoxCoreDevOwnerCommand],
  ["welcome", NoxCoreDevWelcomeCommand],
  ["goodbye", NoxCoreDevGoodbyeCommand],
]);

function NoxCoreDevGetSenderNumber(message) {
  const senderJid = message.key.participant || message.key.remoteJid || "";
  return senderJid.split("@")[0].split(":")[0];
}

function NoxCoreDevIsOwner(message) {
  if (message.key.fromMe === true) return true;
  if (NoxCoreDevConfig.ownerNumber === "OWNER_NUMBER") return false;
  return NoxCoreDevGetSenderNumber(message) === NoxCoreDevConfig.ownerNumber;
}

export async function NoxCoreDevHandleCommand(message, client) {
  const remoteJid = message.key.remoteJid || "";
  if (remoteJid === "status@broadcast") return;

  const text = message.message?.conversation || message.message?.extendedTextMessage?.text || "";
  const trimmedText = text.trim();
  if (!trimmedText.startsWith(NoxCoreDevConfig.prefix)) return;

  const parts = [];
  for (const word of trimmedText.slice(NoxCoreDevConfig.prefix.length).split(" ")) {
    if (word) parts.push(word);
  }
  const commandName = (parts.shift() || "").toLowerCase();
  const command = NoxCoreDevCommands.get(commandName);
  if (!command) return;

  const isOwner = NoxCoreDevIsOwner(message);
  if (NoxCoreDevConfig.mode === "self" && !isOwner) return;
  if ((commandName === "mode" || commandName === "self" || commandName === "public") && !isOwner) {
    await NoxCoreDevSendReply(message, client, "Commande réservée au propriétaire.");
    return;
  }
  await command(message, client, parts);
}
