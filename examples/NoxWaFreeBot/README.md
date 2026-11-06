# NoxWaFreeBot — NoxCoreDev starter

A small Node.js + Baileys starter for pairing by code, basic commands, two allow-listed newsletters, and targeted group events.

## Files

- `package.json` requires Node.js 20+, pins Baileys 6.7.24, and defines `start` and `test` scripts.
- `config.js` centralizes the bot name, owner name and number, mode, prefix, session directory, reconnect delay, newsletter JIDs, reactions, commands, and welcome/goodbye templates.
- `index.js` opens the session, requests a pairing code, and connects the Baileys event handlers.
- `handler.js` separates regular messages from newsletter posts before dispatching commands.
- `commands.js` implements `.ping`, `.hello`, `.alive`, `.menu`, `.mode`, `.self`, `.public`, `.owner`, `.welcome`, and `.goodbye`.
- `newsletters.js` follows the configured targets and sends at most one de-duplicated reaction per new post.
- `group-events.js` handles per-group settings and participant add/remove messages.
- `scripts/mock-test.mjs` tests behavior using a simulated socket; it does not connect to WhatsApp.
- `.gitignore` excludes sessions, `node_modules`, `.env`, and log files.

## Configure the owner

In `config.js`, replace `ownerNumber: "OWNER_NUMBER"` with the owner's international phone number as digits only, without `+` (for example, `224XXXXXXXX`). The ZIP keeps the placeholder and contains no personal number, pairing code, token, or session file. Until it is replaced, owner-only commands will not recognize an owner number.

The initial mode is `"public"`. `.self` switches to owner-only mode, `.public` switches back to public mode, and `.mode` displays the current mode. These changes are held in memory and reset to the value in `config.js` after a restart.

## Install and start

Requirement: Node.js 20 or newer.

```bash
npm install
npm start
```

On first start, enter the WhatsApp number to link with its country code, using digits only and no `+`. Enter the displayed pairing code in WhatsApp's link-by-phone flow. Session credentials are created locally in `session/`, which Git ignores.

## Offline tests

```bash
npm test
```

The test uses simulated responses and the dummy number `0000000000`; it does not create a session or contact WhatsApp.

## Commands

| Command | Response or function |
| --- | --- |
| `.ping` | Replies once with “Pong!”. |
| `.hello` | Replies “Hello from NoxWaFreeBot!”. |
| `.alive` | Confirms that NoxWaFreeBot is online. |
| `.menu` | Lists the configured commands. |
| `.mode` | Displays `public` or `self`; owner only. |
| `.self` | Switches to owner-only mode. |
| `.public` | Switches back to public mode. |
| `.owner` | Displays the owner name, `NoxCoreDev`. |
| `.welcome on/off` | Enables or disables group welcome messages; group admins only. |
| `.goodbye on/off` | Enables or disables group goodbye messages; group admins only. |

## Newsletters

`config.js` contains exactly these two JIDs: `120363434925681370@newsletter` and `120363428923746817@newsletter`. `newsletters.js` uses the Baileys 6.7.24 methods `newsletterFollow(jid)` and `newsletterReactMessage(jid, serverId, emoji)`. At most one reaction, chosen from 60 emojis, is sent for a new incoming post from an allowed target. Duplicates are ignored; these functions do not follow or process any other JID.

## Welcome and goodbye events

Welcome and goodbye messages are sent only from `group-participants.update` when `action` is `add` or `remove` and the corresponding group setting is enabled. `promote`/`demote` events, ordinary messages, and private chats do not trigger them. Group settings are held in memory and reset to their defaults after a restart.
