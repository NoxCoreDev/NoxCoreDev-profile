import { NoxCoreDevHandleCommand } from "./commands.js";
import { NoxCoreDevHandleNewsletterMessage } from "./newsletters.js";

export async function NoxCoreDevHandleMessage(message, client) {
  if (!message?.message || message.key.fromMe) return;
  const remoteJid = message.key.remoteJid || "";
  if (remoteJid === "status@broadcast") return;

  if (remoteJid.endsWith("@newsletter")) {
    await NoxCoreDevHandleNewsletterMessage(message, client);
    return;
  }
  await NoxCoreDevHandleCommand(message, client);
}
