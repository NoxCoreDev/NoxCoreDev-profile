import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import pino from "pino";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { NoxCoreDevConfig } from "./config.js";
import { handleMessage } from "./handler.js";
import { followNewsletters } from "./newsletters.js";
import { handleGroupParticipantsUpdate } from "./group-events.js";

let NoxCoreDevReconnectTimer = null;

async function ask(question) {
  const terminal = createInterface({ input: stdin, output: stdout });
  const answer = await terminal.question(question);
  terminal.close();
  return answer;
}

function isDigit(character) {
  return "0123456789".includes(character);
}

async function dispatchMessages(client, update) {
  if (update.type !== "notify") return;
  for (const message of update.messages) {
    await handleMessage(message, client);
  }
}

function onMessagesUpsert(client, update) {
  dispatchMessages(client, update).catch(console.error);
}

function onGroupParticipantsUpdate(client, update) {
  handleGroupParticipantsUpdate(update, client).catch(console.error);
}

function restartBot() {
  startBot().catch(console.error);
}

function onConnectionUpdate(client, update) {
  if (update.connection === "open") {
    if (NoxCoreDevReconnectTimer) {
      clearTimeout(NoxCoreDevReconnectTimer);
      NoxCoreDevReconnectTimer = null;
    }
    console.log(NoxCoreDevConfig.botName + " connected — " + NoxCoreDevConfig.ownerName + ".");
    followNewsletters(client).catch(console.error);
  }
  if (update.connection === "close") {
    const statusCode = update.lastDisconnect?.error?.output?.statusCode;
    if (statusCode === DisconnectReason.loggedOut) {
      console.log("Session logged out. Remove the session folder and start pairing again.");
      return;
    }
    if (!NoxCoreDevReconnectTimer) {
      NoxCoreDevReconnectTimer = setTimeout(restartBot, NoxCoreDevConfig.reconnectDelayMs);
    }
  }
}

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(NoxCoreDevConfig.sessionDirectory);
  const { version } = await fetchLatestBaileysVersion();
  const client = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: "silent" }),
    printQRInTerminal: !NoxCoreDevConfig.pairingCode,
  });

  client.ev.on("creds.update", saveCreds);
  client.ev.on("messages.upsert", onMessagesUpsert.bind(null, client));
  client.ev.on("connection.update", onConnectionUpdate.bind(null, client));
  client.ev.on("group-participants.update", onGroupParticipantsUpdate.bind(null, client));

  if (NoxCoreDevConfig.pairingCode && !state.creds.registered) {
    const inputNumber = await ask("WhatsApp number with country code, digits only, no +: ");
    const phoneNumber = inputNumber.split("").filter(isDigit).join("");
    const code = await client.requestPairingCode(phoneNumber);
    console.log("Pairing code: " + code);
  }
}

startBot().catch(console.error);
