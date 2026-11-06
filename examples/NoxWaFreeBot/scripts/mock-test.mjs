import assert from "node:assert/strict";
import { NoxCoreDevConfig } from "../config.js";
import { NoxCoreDevHandleCommand } from "../commands.js";
import {
  NoxCoreDevGroupSettings,
  NoxCoreDevHandleGroupParticipantsUpdate,
} from "../group-events.js";
import {
  NoxCoreDevFollowNewsletters,
  NoxCoreDevHandleNewsletterMessage,
  NoxCoreDevNewsletterJids,
  NoxCoreDevReactionEmojis,
} from "../newsletters.js";

const NoxCoreDevTestOwnerNumber = "0000000000";
const NoxCoreDevTestOwnerJid = NoxCoreDevTestOwnerNumber + "@s.whatsapp.net";
const NoxCoreDevFollowCalls = [];
const NoxCoreDevReactionCalls = [];
const NoxCoreDevSentMessages = [];

async function NoxCoreDevMockSendMessage(jid, payload) {
  NoxCoreDevSentMessages.push({ jid, payload });
  return { key: { id: "mock-message" } };
}

async function NoxCoreDevMockGroupMetadata(jid) {
  return {
    id: jid,
    participants: [{ id: NoxCoreDevTestOwnerJid, admin: "admin" }],
  };
}

async function NoxCoreDevMockNewsletterFollow(jid) {
  NoxCoreDevFollowCalls.push(jid);
  return { ok: true };
}

async function NoxCoreDevMockNewsletterReactMessage(jid, serverId, emoji) {
  NoxCoreDevReactionCalls.push({ jid, serverId, emoji });
}

function NoxCoreDevMakeMessage(text, remoteJid, participant) {
  return {
    key: { remoteJid, participant, id: "local-id", fromMe: false },
    message: { conversation: text },
  };
}

async function NoxCoreDevRunMockTests() {
  NoxCoreDevConfig.mode = "public";
  NoxCoreDevConfig.ownerNumber = NoxCoreDevTestOwnerNumber;
  NoxCoreDevGroupSettings.clear();

  const NoxCoreDevMockClient = {
    sendMessage: NoxCoreDevMockSendMessage,
    groupMetadata: NoxCoreDevMockGroupMetadata,
    newsletterFollow: NoxCoreDevMockNewsletterFollow,
    newsletterReactMessage: NoxCoreDevMockNewsletterReactMessage,
  };

  assert.deepEqual(NoxCoreDevNewsletterJids, [
    "120363434925681370@newsletter",
    "120363428923746817@newsletter",
  ]);
  assert.equal(NoxCoreDevReactionEmojis.length >= 50, true);

  await NoxCoreDevFollowNewsletters(NoxCoreDevMockClient);
  await NoxCoreDevFollowNewsletters(NoxCoreDevMockClient);
  assert.deepEqual(NoxCoreDevFollowCalls, NoxCoreDevNewsletterJids);

  const NoxCoreDevTargetMessage = {
    key: {
      remoteJid: NoxCoreDevNewsletterJids[0],
      id: "local-message-id",
      server_id: "server-message-id",
      fromMe: false,
    },
    message: { conversation: "newsletter post" },
  };
  await NoxCoreDevHandleNewsletterMessage(NoxCoreDevTargetMessage, NoxCoreDevMockClient);
  await NoxCoreDevHandleNewsletterMessage(NoxCoreDevTargetMessage, NoxCoreDevMockClient);
  assert.equal(NoxCoreDevReactionCalls.length, 1);
  assert.equal(NoxCoreDevReactionCalls[0].jid, NoxCoreDevNewsletterJids[0]);
  assert.equal(NoxCoreDevReactionCalls[0].serverId, "server-message-id");
  assert.equal(NoxCoreDevReactionEmojis.includes(NoxCoreDevReactionCalls[0].emoji), true);

  const NoxCoreDevOtherNewsletterMessage = {
    key: { remoteJid: "not-configured@newsletter", id: "not-allowed", fromMe: false },
    message: { conversation: "not a configured target" },
  };
  await NoxCoreDevHandleNewsletterMessage(NoxCoreDevOtherNewsletterMessage, NoxCoreDevMockClient);
  assert.equal(NoxCoreDevReactionCalls.length, 1);

  function NoxCoreDevOwnerMessage(text, remoteJid = "test@s.whatsapp.net") {
    return {
      key: { remoteJid, participant: NoxCoreDevTestOwnerJid, fromMe: false },
      message: { conversation: text },
    };
  }
  const NoxCoreDevBeforeCommands = NoxCoreDevSentMessages.length;
  await NoxCoreDevHandleCommand(NoxCoreDevOwnerMessage(".ping"), NoxCoreDevMockClient);
  await NoxCoreDevHandleCommand(NoxCoreDevOwnerMessage(".alive"), NoxCoreDevMockClient);
  await NoxCoreDevHandleCommand(NoxCoreDevOwnerMessage(".menu"), NoxCoreDevMockClient);
  await NoxCoreDevHandleCommand(NoxCoreDevOwnerMessage(".owner"), NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.length >= NoxCoreDevBeforeCommands + 4, true);
  let NoxCoreDevFoundBotName = false;
  for (const NoxCoreDevSentMessage of NoxCoreDevSentMessages) {
    if (NoxCoreDevSentMessage.payload.text.includes("NoxWaFreeBot")) NoxCoreDevFoundBotName = true;
  }
  assert.equal(NoxCoreDevFoundBotName, true);

  await NoxCoreDevHandleCommand(NoxCoreDevOwnerMessage(".self"), NoxCoreDevMockClient);
  assert.equal(NoxCoreDevConfig.mode, "self");
  const NoxCoreDevAfterSelf = NoxCoreDevSentMessages.length;
  const NoxCoreDevGuestMessage = {
    key: { remoteJid: "guest@s.whatsapp.net", fromMe: false },
    message: { conversation: ".ping" },
  };
  await NoxCoreDevHandleCommand(NoxCoreDevGuestMessage, NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.length, NoxCoreDevAfterSelf);
  await NoxCoreDevHandleCommand(NoxCoreDevOwnerMessage(".mode"), NoxCoreDevMockClient);
  await NoxCoreDevHandleCommand(NoxCoreDevOwnerMessage(".public"), NoxCoreDevMockClient);
  assert.equal(NoxCoreDevConfig.mode, "public");

  const NoxCoreDevGroupJid = "123456789-987654321@g.us";
  const NoxCoreDevAdminMessage = NoxCoreDevOwnerMessage(".welcome on", NoxCoreDevGroupJid);
  NoxCoreDevAdminMessage.key.participant = NoxCoreDevTestOwnerJid;
  await NoxCoreDevHandleCommand(NoxCoreDevAdminMessage, NoxCoreDevMockClient);
  const NoxCoreDevBeforeGroupEvents = NoxCoreDevSentMessages.length;
  await NoxCoreDevHandleGroupParticipantsUpdate({
    id: NoxCoreDevGroupJid,
    action: "add",
    participants: ["guest@s.whatsapp.net"],
  }, NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.length, NoxCoreDevBeforeGroupEvents + 1);
  assert.equal(NoxCoreDevSentMessages.at(-1).payload.mentions[0], "guest@s.whatsapp.net");

  const NoxCoreDevAfterWelcome = NoxCoreDevSentMessages.length;
  await NoxCoreDevHandleGroupParticipantsUpdate({
    id: NoxCoreDevGroupJid,
    action: "promote",
    participants: ["guest@s.whatsapp.net"],
  }, NoxCoreDevMockClient);
  await NoxCoreDevHandleGroupParticipantsUpdate({
    id: "private@s.whatsapp.net",
    action: "add",
    participants: ["guest@s.whatsapp.net"],
  }, NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.length, NoxCoreDevAfterWelcome);

  const NoxCoreDevGoodbyeAdminMessage = NoxCoreDevOwnerMessage(".goodbye on", NoxCoreDevGroupJid);
  NoxCoreDevGoodbyeAdminMessage.key.participant = NoxCoreDevTestOwnerJid;
  await NoxCoreDevHandleCommand(NoxCoreDevGoodbyeAdminMessage, NoxCoreDevMockClient);
  const NoxCoreDevBeforeGoodbye = NoxCoreDevSentMessages.length;
  await NoxCoreDevHandleGroupParticipantsUpdate({
    id: NoxCoreDevGroupJid,
    action: "remove",
    participants: ["guest@s.whatsapp.net"],
  }, NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.length, NoxCoreDevBeforeGoodbye + 1);
  assert.match(NoxCoreDevSentMessages.at(-1).payload.text, /Au revoir/);

  process.stdout.write("NoxWaFreeBot mock tests passed: commands, modes, two newsletter JIDs, one reaction per post, and group-only add/remove messages.\n");
}

function NoxCoreDevHandleTestFailure(error) {
  console.error(error);
  process.exitCode = 1;
}

NoxCoreDevRunMockTests().catch(NoxCoreDevHandleTestFailure);
