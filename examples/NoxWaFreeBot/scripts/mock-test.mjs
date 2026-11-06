import assert from "node:assert/strict";
import { NoxCoreDevConfig } from "../config.js";
import { handleCommand } from "../commands.js";
import {
  NoxCoreDevGroupSettings,
  handleGroupParticipantsUpdate,
} from "../group-events.js";
import {
  followNewsletters,
  handleNewsletterMessage,
  NoxCoreDevNewsletterJids,
  NoxCoreDevReactionEmojis,
} from "../newsletters.js";

const NoxCoreDevTestOwnerNumber = "0000000000";
const NoxCoreDevTestOwnerJid = NoxCoreDevTestOwnerNumber + "@s.whatsapp.net";
const NoxCoreDevFollowCalls = [];
const NoxCoreDevReactionCalls = [];
const NoxCoreDevSentMessages = [];

async function mockSendMessage(jid, payload) {
  NoxCoreDevSentMessages.push({ jid, payload });
  return { key: { id: "mock-message" } };
}

async function mockGroupMetadata(jid) {
  return {
    id: jid,
    participants: [{ id: NoxCoreDevTestOwnerJid, admin: "admin" }],
  };
}

async function mockNewsletterFollow(jid) {
  NoxCoreDevFollowCalls.push(jid);
  return { ok: true };
}

async function mockNewsletterReactMessage(jid, serverId, emoji) {
  NoxCoreDevReactionCalls.push({ jid, serverId, emoji });
}

function makeMessage(text, remoteJid, participant) {
  return {
    key: { remoteJid, participant, id: "local-id", fromMe: false },
    message: { conversation: text },
  };
}

async function runMockTests() {
  NoxCoreDevConfig.mode = "public";
  NoxCoreDevConfig.ownerNumber = NoxCoreDevTestOwnerNumber;
  NoxCoreDevGroupSettings.clear();

  const NoxCoreDevMockClient = {
    sendMessage: mockSendMessage,
    groupMetadata: mockGroupMetadata,
    newsletterFollow: mockNewsletterFollow,
    newsletterReactMessage: mockNewsletterReactMessage,
  };

  assert.deepEqual(NoxCoreDevNewsletterJids, [
    "120363434925681370@newsletter",
    "120363428923746817@newsletter",
  ]);
  assert.equal(NoxCoreDevReactionEmojis.length >= 50, true);

  await followNewsletters(NoxCoreDevMockClient);
  await followNewsletters(NoxCoreDevMockClient);
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
  await handleNewsletterMessage(NoxCoreDevTargetMessage, NoxCoreDevMockClient);
  await handleNewsletterMessage(NoxCoreDevTargetMessage, NoxCoreDevMockClient);
  assert.equal(NoxCoreDevReactionCalls.length, 1);
  assert.equal(NoxCoreDevReactionCalls[0].jid, NoxCoreDevNewsletterJids[0]);
  assert.equal(NoxCoreDevReactionCalls[0].serverId, "server-message-id");
  assert.equal(NoxCoreDevReactionEmojis.includes(NoxCoreDevReactionCalls[0].emoji), true);

  const NoxCoreDevOtherNewsletterMessage = {
    key: { remoteJid: "not-configured@newsletter", id: "not-allowed", fromMe: false },
    message: { conversation: "not a configured target" },
  };
  await handleNewsletterMessage(NoxCoreDevOtherNewsletterMessage, NoxCoreDevMockClient);
  assert.equal(NoxCoreDevReactionCalls.length, 1);

  function ownerMessage(text, remoteJid = "test@s.whatsapp.net") {
    return {
      key: { remoteJid, participant: NoxCoreDevTestOwnerJid, fromMe: false },
      message: { conversation: text },
    };
  }
  const NoxCoreDevBeforeCommands = NoxCoreDevSentMessages.length;
  await handleCommand(ownerMessage(".ping"), NoxCoreDevMockClient);
  await handleCommand(ownerMessage(".hello"), NoxCoreDevMockClient);
  await handleCommand(ownerMessage(".alive"), NoxCoreDevMockClient);
  await handleCommand(ownerMessage(".menu"), NoxCoreDevMockClient);
  await handleCommand(ownerMessage(".owner"), NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.length, NoxCoreDevBeforeCommands + 5);
  assert.equal(NoxCoreDevSentMessages[NoxCoreDevBeforeCommands].payload.text, "🏓 Pong!");
  assert.equal(NoxCoreDevSentMessages[NoxCoreDevBeforeCommands + 1].payload.text, "Hello from NoxWaFreeBot!");
  assert.equal(NoxCoreDevSentMessages[NoxCoreDevBeforeCommands + 2].payload.text, "NoxWaFreeBot is online — NoxCoreDev.");
  const NoxCoreDevMenuText = NoxCoreDevSentMessages[NoxCoreDevBeforeCommands + 3].payload.text;
  assert.match(NoxCoreDevMenuText, /NoxWaFreeBot — Commands/);
  assert.match(NoxCoreDevMenuText, /\.hello/);
  assert.equal(NoxCoreDevSentMessages[NoxCoreDevBeforeCommands + 4].payload.text, "Owner: NoxCoreDev");

  await handleCommand(ownerMessage(".self"), NoxCoreDevMockClient);
  assert.equal(NoxCoreDevConfig.mode, "self");
  assert.equal(NoxCoreDevSentMessages.at(-1).payload.text, "Private mode enabled.");
  const NoxCoreDevAfterSelf = NoxCoreDevSentMessages.length;
  const NoxCoreDevGuestMessage = {
    key: { remoteJid: "guest@s.whatsapp.net", fromMe: false },
    message: { conversation: ".ping" },
  };
  await handleCommand(NoxCoreDevGuestMessage, NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.length, NoxCoreDevAfterSelf);
  await handleCommand(ownerMessage(".mode"), NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.at(-1).payload.text, "Current mode: self");
  await handleCommand(ownerMessage(".public"), NoxCoreDevMockClient);
  assert.equal(NoxCoreDevConfig.mode, "public");
  assert.equal(NoxCoreDevSentMessages.at(-1).payload.text, "Public mode enabled.");
  await handleCommand({
    key: { remoteJid: "guest@s.whatsapp.net", fromMe: false },
    message: { conversation: ".self" },
  }, NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.at(-1).payload.text, "This command is owner-only.");

  const NoxCoreDevGroupJid = "123456789-987654321@g.us";
  await handleCommand(ownerMessage(".welcome on"), NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.at(-1).payload.text, "This command can only be used in a group.");
  await handleCommand(ownerMessage(".welcome maybe", NoxCoreDevGroupJid), NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.at(-1).payload.text, "Use `on` or `off`.");
  const NoxCoreDevNonAdminMessage = {
    key: { remoteJid: NoxCoreDevGroupJid, participant: "guest@s.whatsapp.net", fromMe: false },
    message: { conversation: ".welcome on" },
  };
  await handleCommand(NoxCoreDevNonAdminMessage, NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.at(-1).payload.text, "Only group admins can change this setting.");
  const NoxCoreDevAdminMessage = ownerMessage(".welcome on", NoxCoreDevGroupJid);
  NoxCoreDevAdminMessage.key.participant = NoxCoreDevTestOwnerJid;
  await handleCommand(NoxCoreDevAdminMessage, NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.at(-1).payload.text, "Welcome messages enabled.");
  const NoxCoreDevBeforeGroupEvents = NoxCoreDevSentMessages.length;
  await handleGroupParticipantsUpdate({
    id: NoxCoreDevGroupJid,
    action: "add",
    participants: ["guest@s.whatsapp.net"],
  }, NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.length, NoxCoreDevBeforeGroupEvents + 1);
  assert.equal(NoxCoreDevSentMessages.at(-1).payload.mentions[0], "guest@s.whatsapp.net");
  assert.equal(NoxCoreDevSentMessages.at(-1).payload.text, "Welcome @guest to the group!");

  const NoxCoreDevAfterWelcome = NoxCoreDevSentMessages.length;
  await handleGroupParticipantsUpdate({
    id: NoxCoreDevGroupJid,
    action: "promote",
    participants: ["guest@s.whatsapp.net"],
  }, NoxCoreDevMockClient);
  await handleGroupParticipantsUpdate({
    id: "private@s.whatsapp.net",
    action: "add",
    participants: ["guest@s.whatsapp.net"],
  }, NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.length, NoxCoreDevAfterWelcome);

  const NoxCoreDevGoodbyeAdminMessage = ownerMessage(".goodbye on", NoxCoreDevGroupJid);
  NoxCoreDevGoodbyeAdminMessage.key.participant = NoxCoreDevTestOwnerJid;
  await handleCommand(NoxCoreDevGoodbyeAdminMessage, NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.at(-1).payload.text, "Goodbye messages enabled.");
  const NoxCoreDevBeforeGoodbye = NoxCoreDevSentMessages.length;
  await handleGroupParticipantsUpdate({
    id: NoxCoreDevGroupJid,
    action: "remove",
    participants: ["guest@s.whatsapp.net"],
  }, NoxCoreDevMockClient);
  assert.equal(NoxCoreDevSentMessages.length, NoxCoreDevBeforeGoodbye + 1);
  assert.equal(NoxCoreDevSentMessages.at(-1).payload.text, "Goodbye @guest!");

  process.stdout.write("NoxWaFreeBot mock tests passed: English replies, commands and modes, two newsletter JIDs, one reaction per post, and group-only add/remove messages.\n");
}

function handleTestFailure(error) {
  console.error(error);
  process.exitCode = 1;
}

runMockTests().catch(handleTestFailure);
