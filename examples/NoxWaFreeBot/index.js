import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import pino from "pino";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { NoxCoreDevConfig } from "./config.js";
import { NoxCoreDevHandleMessage } from "./handler.js";
import { NoxCoreDevFollowNewsletters } from "./newsletters.js";
import { NoxCoreDevHandleGroupParticipantsUpdate } from "./group-events.js";

let NoxCoreDevReconnectTimer = null;

async function NoxCoreDevAsk(question) {
  const terminal = createInterface({ input: stdin, output: stdout });
  const answer = await terminal.question(question);
  terminal.close();
  return answer;
}

function NoxCoreDevIsDigit(character) {
  return "0123456789".includes(character);
}

async function NoxCoreDevDispatchMessages(client, update) {
  if (update.type !== "notify") return;
  for (const message of update.messages) {
    await NoxCoreDevHandleMessage(message, client);
  }
}

function NoxCoreDevOnMessagesUpsert(client, update) {
  NoxCoreDevDispatchMessages(client, update).catch(console.error);
}

function NoxCoreDevOnGroupParticipantsUpdate(client, update) {
  NoxCoreDevHandleGroupParticipantsUpdate(update, client).catch(console.error);
}

function NoxCoreDevRestartBot() {
  NoxCoreDevStartBot().catch(console.error);
}

function NoxCoreDevOnConnectionUpdate(client, update) {
  if (update.connection === "open") {
    if (NoxCoreDevReconnectTimer) {
      clearTimeout(NoxCoreDevReconnectTimer);
      NoxCoreDevReconnectTimer = null;
    }
    console.log(NoxCoreDevConfig.botName + " connecté — " + NoxCoreDevConfig.ownerName + ".");
    NoxCoreDevFollowNewsletters(client).catch(console.error);
  }
  if (update.connection === "close") {
    const statusCode = update.lastDisconnect?.error?.output?.statusCode;
    if (statusCode === DisconnectReason.loggedOut) {
      console.log("Session fermée. Supprime le dossier session puis relance l’appairage.");
      return;
    }
    if (!NoxCoreDevReconnectTimer) {
      NoxCoreDevReconnectTimer = setTimeout(NoxCoreDevRestartBot, NoxCoreDevConfig.reconnectDelayMs);
    }
  }
}

async function NoxCoreDevStartBot() {
  const { state, saveCreds } = await useMultiFileAuthState(NoxCoreDevConfig.sessionDirectory);
  const { version } = await fetchLatestBaileysVersion();
  const client = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: "silent" }),
    printQRInTerminal: !NoxCoreDevConfig.pairingCode,
  });

  client.ev.on("creds.update", saveCreds);
  client.ev.on("messages.upsert", NoxCoreDevOnMessagesUpsert.bind(null, client));
  client.ev.on("connection.update", NoxCoreDevOnConnectionUpdate.bind(null, client));
  client.ev.on("group-participants.update", NoxCoreDevOnGroupParticipantsUpdate.bind(null, client));

  if (NoxCoreDevConfig.pairingCode && !state.creds.registered) {
    const inputNumber = await NoxCoreDevAsk("Numéro WhatsApp avec indicatif, sans + : ");
    const phoneNumber = inputNumber.split("").filter(NoxCoreDevIsDigit).join("");
    const code = await client.requestPairingCode(phoneNumber);
    console.log("Code d’appairage : " + code);
  }
}

NoxCoreDevStartBot().catch(console.error);
