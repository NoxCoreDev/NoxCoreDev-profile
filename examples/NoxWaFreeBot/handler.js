import { handleCommand } from "./commands.js";
import { handleNewsletterMessage } from "./newsletters.js";

export async function handleMessage(message, client) {
  if (!message?.message || message.key.fromMe) return;
  const remoteJid = message.key.remoteJid || "";
  if (remoteJid === "status@broadcast") return;

  if (remoteJid.endsWith("@newsletter")) {
    await handleNewsletterMessage(message, client);
    return;
  }
  await handleCommand(message, client);
}
