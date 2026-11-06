import { NoxCoreDevConfig } from "./config.js";
import { setGroupFeature } from "./group-events.js";

async function sendReply(message, client, text) {
  await client.sendMessage(message.key.remoteJid, { text });
}

async function pingCommand(message, client) {
  await sendReply(message, client, "🏓 Pong!");
}

async function helloCommand(message, client) {
  await sendReply(message, client, "Hello from NoxWaFreeBot!");
}

async function aliveCommand(message, client) {
  await sendReply(message, client, NoxCoreDevConfig.botName + " is online — NoxCoreDev.");
}

async function menuCommand(message, client) {
  const menu = NoxCoreDevConfig.commands.join("\n");
  await sendReply(message, client, NoxCoreDevConfig.botName + " — Commands\n" + menu);
}

async function modeCommand(message, client) {
  await sendReply(message, client, "Current mode: " + NoxCoreDevConfig.mode);
}

async function selfCommand(message, client) {
  NoxCoreDevConfig.mode = "self";
  await sendReply(message, client, "Private mode enabled.");
}

async function publicCommand(message, client) {
  NoxCoreDevConfig.mode = "public";
  await sendReply(message, client, "Public mode enabled.");
}

async function NoxCoreDevOwnerCommand(message, client) {
  await sendReply(message, client, "Owner: " + NoxCoreDevConfig.ownerName);
}

async function welcomeCommand(message, client, args) {
  await setGroupFeature(message, client, args, "welcome");
}

async function goodbyeCommand(message, client, args) {
  await setGroupFeature(message, client, args, "goodbye");
}

const NoxCoreDevCommands = new Map([
  ["ping", pingCommand],
  ["hello", helloCommand],
  ["alive", aliveCommand],
  ["menu", menuCommand],
  ["mode", modeCommand],
  ["self", selfCommand],
  ["public", publicCommand],
  ["owner", NoxCoreDevOwnerCommand],
  ["welcome", welcomeCommand],
  ["goodbye", goodbyeCommand],
]);

function getSenderNumber(message) {
  const senderJid = message.key.participant || message.key.remoteJid || "";
  return senderJid.split("@")[0].split(":")[0];
}

function NoxCoreDevIsOwner(message) {
  if (message.key.fromMe === true) return true;
  if (NoxCoreDevConfig.ownerNumber === "OWNER_NUMBER") return false;
  return getSenderNumber(message) === NoxCoreDevConfig.ownerNumber;
}

export async function handleCommand(message, client) {
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
    await sendReply(message, client, "This command is owner-only.");
    return;
  }
  await command(message, client, parts);
}
