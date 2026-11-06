import { NoxWaFreeBotCode } from "./noxwafreebot-code.js";

const NoxCoreDevBlocks = {
  package: NoxWaFreeBotCode.package,
  config: NoxWaFreeBotCode.config,
  index: NoxWaFreeBotCode.index,
  handler: NoxWaFreeBotCode.handler,
  commands: NoxWaFreeBotCode.commands,
  newsletters: NoxWaFreeBotCode.newsletters,
  groups: NoxWaFreeBotCode.groups,
  ignore: NoxWaFreeBotCode.ignore,
};

const NoxCoreDevRunCommands = {
  label: "Terminal — portfolio",
  language: "bash",
  code: "cd examples/NoxWaFreeBot\nnpm install\nnpm test\nnpm start\n\n# Depuis la racine du portfolio :\nnpm run test:noxwafreebot",
};

const article = {
  id: 4,
  slug: "bot-whatsapp-simple-baileys",
  publishedAt: "2026-11-06",
  cover: "/blog/noxwafreebot-cover.png",
  coverAspect: "4:5",
  ogImageType: "image/png",
  ogImageWidth: 1664,
  ogImageHeight: 2080,
  downloadUrl: "/downloads/noxwafreebot-base.zip",
  fr: {
    category: "Bots WhatsApp",
    title: "Un bot WhatsApp simple avec Baileys : du premier appairage aux commandes",
    excerpt: "NoxWaFreeBot, fichier par fichier : configuration centrale, commandes NoxCoreDev, appairage Baileys, deux newsletters autorisées et événements de groupe ciblés.",
    downloadLabel: "Télécharger la base complète (.zip)",
    intro: "NoxWaFreeBot est le nom du bot; seules quelques fonctions liées au propriétaire portent le préfixe NoxCoreDev, tandis que les fonctions génériques gardent des noms courts. Cette base complète reprend la structure du projet fourni — session Baileys, gestionnaire de commandes et événement d’appairage — puis la rend cohérente avec l’identité et les fonctions demandées. Le ZIP joint contient le code source et les tests hors ligne, mais aucun numéro propriétaire réel, code d’appairage ou fichier de session.",
    tags: ["NoxWaFreeBot", "NoxCoreDev", "WhatsApp", "Baileys", "Node.js"],
    sections: [
      {
        heading: "La base et sa version Baileys",
        paragraphs: [
          "Le bot utilise Node.js 20+ et la version stable `@whiskeysockets/baileys` 6.7.24. Le code source de cette version expose bien `newsletterFollow(jid)` et `newsletterReactMessage(jid, serverId, reaction)`; ces noms sont vérifiés dans le paquet officiel, pas devinés à partir d’un exemple ancien.",
          "La structure est volontairement simple : `index.js` lance le socket, `handler.js` aiguille les messages, `commands.js` contient les commandes, `newsletters.js` traite les deux cibles autorisées et `group-events.js` gère les événements de groupe. Les fonctions utilitaires gardent des noms courts; le préfixe `NoxCoreDev` reste réservé à quelques fonctions liées au propriétaire.",
        ],
        codeBlocks: [NoxCoreDevBlocks.package],
        sources: [
          {
            label: {
              fr: "Publication officielle Baileys 6.7.24",
              en: "Official Baileys 6.7.24 release",
            },
            href: "https://github.com/WhiskeySockets/Baileys/releases/tag/v6.7.24",
          },
          {
            label: {
              fr: "Paquet npm Baileys 6.7.24",
              en: "Baileys 6.7.24 npm package",
            },
            href: "https://www.npmjs.com/package/@whiskeysockets/baileys/v/6.7.24",
          },
        ],
      },
      {
        heading: "1. `config.js` — tous les réglages au même endroit",
        paragraphs: [
          "La configuration centralise le nom `NoxWaFreeBot`, le nom du propriétaire `NoxCoreDev`, `ownerNumber`, le préfixe `.`, le mode initial `public`, le dossier de session et le délai de reconnexion. Elle contient aussi les commandes du menu, les deux JID autorisés, les interrupteurs auto-follow/auto-react, la liste d’emojis et les modèles d’accueil/départ.",
          "Le ZIP conserve le placeholder `OWNER_NUMBER` pour le champ `ownerNumber`. Remplace ce texte par les chiffres du numéro du propriétaire avec indicatif international, sans `+`. Aucun numéro personnel n’est inclus. Si le placeholder reste, les commandes réservées au propriétaire ne reconnaissent aucun numéro. `.self` et `.public` mettent à jour `config.mode` en mémoire; `.mode` l’affiche.",
        ],
        codeBlocks: [NoxCoreDevBlocks.config],
        callout: {
          title: "Deux cibles newsletter, définies dans la configuration",
          body: "La liste fixe contient uniquement `120363434925681370@newsletter` et `120363428923746817@newsletter`. Les fonctions d’automatisation utilisent cette liste et ne parcourent pas d’autres JID.",
        },
      },
      {
        heading: "2. `index.js` — démarrage et appairage par code",
        paragraphs: [
          "`index.js` crée le socket Baileys avec la session locale et un logger silencieux. Au premier démarrage, il demande le numéro à associer et affiche le code renvoyé par `requestPairingCode`. `printQRInTerminal` reste désactivé quand l’option `pairingCode` est activée : le parcours n’imite donc pas un QR.",
          "Le même fichier écoute `messages.upsert`, `connection.update` et `group-participants.update`. À la connexion, le follow des deux newsletters configurées est tenté une seule fois par processus; une reconnexion ne répète pas la demande. Les identifiants générés sont rangés dans le dossier local `session/`.",
        ],
        codeBlocks: [NoxCoreDevBlocks.index],
      },
      {
        heading: "3. `handler.js` — router sans mêler commandes et newsletters",
        paragraphs: [
          "Le handler ignore les messages sortants, les messages sans contenu et les statuts. Un JID de newsletter est transmis au traitement newsletter puis quitte immédiatement le flux des commandes. Les autres messages arrivent dans `handleCommand`, qui ne répond que si le texte commence par le préfixe configuré.",
          "Ce découpage évite qu’une publication de newsletter déclenche par hasard `.ping` ou une autre commande, et garde les réponses automatiques hors des conversations qui ne sont pas concernées.",
        ],
        codeBlocks: [NoxCoreDevBlocks.handler],
      },
      {
        heading: "4. `commands.js` — commandes, propriétaire et modes",
        paragraphs: [
          "`.ping` répond une seule fois avec Pong; `.hello` répond « Hello from NoxWaFreeBot! »; `.alive` confirme que NoxWaFreeBot est en ligne; `.menu` affiche les commandes configurées; `.owner` donne le nom `NoxCoreDev`. `.mode` montre le mode courant, tandis que `.self` et `.public` sont réservées au numéro propriétaire renseigné dans `config.js`.",
          "`.welcome on/off` et `.goodbye on/off` délèguent le réglage à `group-events.js`. Les commandes de contrôle n’ont pas d’effet quand le placeholder du propriétaire n’a pas été remplacé. Le mode change en mémoire et revient au réglage initial après redémarrage.",
          "Les textes visibles dans les réponses du bot sont en anglais; l’article conserve ses explications en français et en anglais.",
        ],
        codeBlocks: [NoxCoreDevBlocks.commands],
      },
      {
        heading: "5. `newsletters.js` — follow et une réaction par nouvelle publication",
        paragraphs: [
          "`NoxCoreDevFollowNewsletters` parcourt seulement les deux JID de `config.js` et appelle `client.newsletterFollow(jid)` une fois par JID et par processus. La réaction exige un message entrant d’une cible autorisée avec un identifiant; le code utilise `key.server_id` lorsqu’il existe, sinon `key.id`.",
          "Pour chaque nouveau post ciblé, `client.newsletterReactMessage(jid, serverId, emoji)` envoie au plus une réaction choisie dans les 60 emojis variés configurés. Une clé de déduplication évite une seconde réaction au même message. La fonction ne suit et ne réagit à aucun autre JID, n’envoie pas de publication et n’a pas de boucle d’envoi.",
        ],
        codeBlocks: [NoxCoreDevBlocks.newsletters],
        sources: [
          {
            label: {
              fr: "Code source officiel Baileys 6.7.24 — fonctions newsletter",
              en: "Official Baileys 6.7.24 source — newsletter functions",
            },
            href: "https://github.com/WhiskeySockets/Baileys/blob/v6.7.24/src/Socket/newsletter.ts",
          },
          {
            label: {
              fr: "Types officiels des identifiants de message",
              en: "Official message identifier types",
            },
            href: "https://github.com/WhiskeySockets/Baileys/blob/v6.7.24/src/Types/Message.ts",
          },
        ],
        callout: {
          title: "Limite explicite des automatisations",
          body: "Le code suit et traite exactement `120363434925681370@newsletter` et `120363428923746817@newsletter`. Un autre JID de newsletter est ignoré et ne reçoit aucune réaction.",
        },
      },
      {
        heading: "6. `group-events.js` — accueil/départ uniquement sur les événements de groupe",
        paragraphs: [
          "La commande `.welcome on/off` ou `.goodbye on/off` est réglable dans un groupe par un administrateur. La réponse de bienvenue part uniquement sur `group-participants.update` avec `action: add`; le message d’au revoir part uniquement avec `action: remove`. Les événements `promote` et `demote`, les messages ordinaires et les conversations privées ne déclenchent pas ces textes.",
          "Chaque réponse reste dans le groupe concerné et mentionne le participant indiqué par l’événement. Les réglages par groupe sont gardés dans une Map en mémoire et reviennent à leur valeur de configuration après un redémarrage.",
        ],
        codeBlocks: [NoxCoreDevBlocks.groups],
        sources: [
          {
            label: {
              fr: "Types officiels des événements Baileys 6.7.24",
              en: "Official Baileys 6.7.24 event types",
            },
            href: "https://github.com/WhiskeySockets/Baileys/blob/v6.7.24/src/Types/Events.ts",
          },
        ],
      },
      {
        heading: "7. `README.md`, `.gitignore` et le test mocké",
        paragraphs: [
          "`README.md` explique l’installation, le remplacement de `OWNER_NUMBER`, le code d’appairage, toutes les commandes, les deux newsletters autorisées et le comportement des événements de groupe. `.gitignore` exclut `session/`, `node_modules/`, `.env` et les journaux. Le ZIP n’embarque pas de credentials, de numéro propriétaire réel ni de session WhatsApp.",
          "`scripts/mock-test.mjs` remplace le socket par un faux client. Il vérifie les commandes, le changement de mode, les deux JID, le nombre d’emojis, l’unicité des réactions et les seules actions de groupe `add`/`remove`; aucun compte n’est connecté pendant le test. Le portfolio possède aussi un test qui compare les blocs copiables aux fichiers du ZIP.",
        ],
        codeBlocks: [NoxCoreDevBlocks.ignore],
        bullets: [
          "Le manifeste `package.json` contient `npm start` et `npm test`.",
          "Depuis le dossier `examples/NoxWaFreeBot`, `npm test` n’a besoin d’aucune session WhatsApp.",
          "Le bouton de téléchargement fournit la base complète dans un ZIP sans secrets ni fichiers d’authentification.",
        ],
      },
      {
        heading: "Installer et vérifier la base",
        paragraphs: [
          "Le ZIP peut être extrait dans son propre dossier. Après avoir configuré `ownerNumber`, installe les dépendances, lance `npm test` hors ligne, puis `npm start` pour effectuer l’appairage réel. Depuis le dépôt du portfolio, `npm run test:noxwafreebot` vérifie aussi que l’article et le code source restent synchronisés.",
        ],
        codeBlocks: [NoxCoreDevRunCommands],
        ending: "La base garde une limite claire : une session Baileys, des fonctions utilitaires aux noms courts, quelques fonctions liées au propriétaire préfixées NoxCoreDev, deux JID newsletter et des réponses de groupe déclenchées uniquement par les événements qui les concernent.",
      },
    ],
    takeaways: [
      "`config.js` centralise le nom, le propriétaire, `OWNER_NUMBER`, le mode et les paramètres des fonctions.",
      "Baileys 6.7.24 fournit les appels newsletter vérifiés; le code est limité à deux JID et une réaction par post.",
      "Les welcomes/goodbyes ne répondent qu’aux événements d’ajout/retrait activés dans un groupe.",
    ],
  },
  en: {
    category: "WhatsApp Bots",
    title: "A simple WhatsApp bot with Baileys: pairing and first commands",
    excerpt: "NoxWaFreeBot, file by file: central configuration, NoxCoreDev commands, Baileys pairing, two allowed newsletters, and targeted group events.",
    downloadLabel: "Download the complete starter (.zip)",
    intro: "NoxWaFreeBot is the bot name; only a few owner-related functions use the NoxCoreDev prefix, while generic helpers keep short names. This complete starter follows the supplied project’s structure—Baileys session, command handler, and pairing flow—then aligns it with the requested identity and features. The ZIP contains source code and offline tests, but no real owner number, pairing code, or session file.",
    tags: ["NoxWaFreeBot", "NoxCoreDev", "WhatsApp", "Baileys", "Node.js"],
    sections: [
      {
        heading: "The starter and its Baileys version",
        paragraphs: [
          "The bot uses Node.js 20+ and the stable `@whiskeysockets/baileys` 6.7.24 release. Its official source exposes `newsletterFollow(jid)` and `newsletterReactMessage(jid, serverId, reaction)`; these names were checked against the published package, not guessed from an older example.",
          "The structure stays simple: `index.js` starts the socket, `handler.js` routes messages, `commands.js` contains commands, `newsletters.js` handles the two allowed targets, and `group-events.js` handles group events. Generic helpers keep short names; the `NoxCoreDev` prefix is reserved for a few owner-related functions.",
        ],
        codeBlocks: [NoxCoreDevBlocks.package],
        sources: [
          {
            label: {
              fr: "Publication officielle Baileys 6.7.24",
              en: "Official Baileys 6.7.24 release",
            },
            href: "https://github.com/WhiskeySockets/Baileys/releases/tag/v6.7.24",
          },
          {
            label: {
              fr: "Paquet npm Baileys 6.7.24",
              en: "Baileys 6.7.24 npm package",
            },
            href: "https://www.npmjs.com/package/@whiskeysockets/baileys/v/6.7.24",
          },
        ],
      },
      {
        heading: "1. `config.js` — all settings in one place",
        paragraphs: [
          "Configuration centralizes the `NoxWaFreeBot` name, `NoxCoreDev` owner name, `ownerNumber`, `.` prefix, initial `public` mode, session folder, reconnect delay, and menu commands. It also contains the two allowed JIDs, auto-follow/auto-react switches, emoji list, and welcome/goodbye templates.",
          "The ZIP keeps the `OWNER_NUMBER` placeholder for `ownerNumber`. Replace it with the owner’s international phone digits without `+`. No personal number is included. If the placeholder remains, owner-only commands cannot identify a number. `.self` and `.public` update `config.mode` in memory; `.mode` displays it.",
        ],
        codeBlocks: [NoxCoreDevBlocks.config],
        callout: {
          title: "Two newsletter targets, set in configuration",
          body: "The fixed list contains only `120363434925681370@newsletter` and `120363428923746817@newsletter`. Automation functions use this list and do not scan other JIDs.",
        },
      },
      {
        heading: "2. `index.js` — startup and pairing code",
        paragraphs: [
          "`index.js` creates the Baileys socket with the local session and a silent logger. On first start it asks for the number to link and prints the code returned by `requestPairingCode`. `printQRInTerminal` stays disabled when `pairingCode` is enabled, so this flow does not imitate a QR.",
          "The same file listens for `messages.upsert`, `connection.update`, and `group-participants.update`. On connection, following the two configured newsletters is attempted once per process; reconnecting does not repeat the request. Generated credentials live in the local `session/` folder.",
        ],
        codeBlocks: [NoxCoreDevBlocks.index],
      },
      {
        heading: "3. `handler.js` — route messages without mixing commands and newsletters",
        paragraphs: [
          "The handler ignores outgoing messages, empty messages, and status updates. A newsletter JID is passed to the newsletter handler and immediately leaves the command flow. Other messages reach `handleCommand`, which responds only when text starts with the configured prefix.",
          "This split prevents a newsletter post from accidentally triggering `.ping` or another command, and keeps automatic replies away from unrelated conversations.",
        ],
        codeBlocks: [NoxCoreDevBlocks.handler],
      },
      {
        heading: "4. `commands.js` — commands, owner, and modes",
        paragraphs: [
          "`.ping` replies once with Pong; `.hello` replies “Hello from NoxWaFreeBot!”; `.alive` confirms NoxWaFreeBot is online; `.menu` lists configured commands; `.owner` displays `NoxCoreDev`. `.mode` shows the current mode, while `.self` and `.public` are reserved for the owner number configured in `config.js`.",
          "`.welcome on/off` and `.goodbye on/off` delegate their settings to `group-events.js`. Control commands have no effect until the owner placeholder is replaced. Mode changes remain in memory and reset to the initial value after restart.",
          "All user-facing bot replies are in English; the article explanations remain available in both French and English.",
        ],
        codeBlocks: [NoxCoreDevBlocks.commands],
      },
      {
        heading: "5. `newsletters.js` — follow and one reaction per new post",
        paragraphs: [
          "`NoxCoreDevFollowNewsletters` iterates only over the two JIDs in `config.js` and calls `client.newsletterFollow(jid)` once per JID per process. A reaction requires an inbound message from an allowed target with an identifier; the code uses `key.server_id` when present, otherwise `key.id`.",
          "For each new targeted post, `client.newsletterReactMessage(jid, serverId, emoji)` sends at most one reaction selected from the configured list of 60 varied emojis. A de-duplication key prevents reacting twice to one message. The function does not follow or react to another JID, publish messages, or run a send loop.",
        ],
        codeBlocks: [NoxCoreDevBlocks.newsletters],
        sources: [
          {
            label: {
              fr: "Code source officiel Baileys 6.7.24 — fonctions newsletter",
              en: "Official Baileys 6.7.24 source — newsletter functions",
            },
            href: "https://github.com/WhiskeySockets/Baileys/blob/v6.7.24/src/Socket/newsletter.ts",
          },
          {
            label: {
              fr: "Types officiels des identifiants de message",
              en: "Official message identifier types",
            },
            href: "https://github.com/WhiskeySockets/Baileys/blob/v6.7.24/src/Types/Message.ts",
          },
        ],
        callout: {
          title: "Explicit automation limit",
          body: "The code follows and processes exactly `120363434925681370@newsletter` and `120363428923746817@newsletter`. Another newsletter JID is ignored and receives no reaction.",
        },
      },
      {
        heading: "6. `group-events.js` — welcome/goodbye only on relevant group events",
        paragraphs: [
          "`.welcome on/off` and `.goodbye on/off` are configured in a group by an administrator. A welcome is sent only for `group-participants.update` with `action: add`; a goodbye is sent only with `action: remove`. `promote`/`demote`, ordinary messages, and private chats do not trigger either text.",
          "Each reply stays in the relevant group and mentions only the participant named by the event. Per-group settings are kept in an in-memory Map and reset to the configuration defaults on restart.",
        ],
        codeBlocks: [NoxCoreDevBlocks.groups],
        sources: [
          {
            label: {
              fr: "Types officiels des événements Baileys 6.7.24",
              en: "Official Baileys 6.7.24 event types",
            },
            href: "https://github.com/WhiskeySockets/Baileys/blob/v6.7.24/src/Types/Events.ts",
          },
        ],
      },
      {
        heading: "7. `README.md`, `.gitignore`, and mocked tests",
        paragraphs: [
          "`README.md` explains installation, replacing `OWNER_NUMBER`, pairing, every command, the two allowed newsletters, and group-event behavior. `.gitignore` excludes `session/`, `node_modules/`, `.env`, and logs. The ZIP contains no credentials, real owner number, or WhatsApp session.",
          "`scripts/mock-test.mjs` replaces the socket with a fake client. It checks commands, mode switching, the two JIDs, emoji count, reaction de-duplication, and the only group actions `add`/`remove`; no account is connected during the test. The portfolio also has a test that compares copyable blocks with the ZIP source files.",
        ],
        codeBlocks: [NoxCoreDevBlocks.ignore],
        bullets: [
          "`package.json` defines `npm start` and `npm test`.",
          "From `examples/NoxWaFreeBot`, `npm test` does not need a WhatsApp session.",
          "The download button provides the complete starter ZIP without secrets or authentication files.",
        ],
      },
      {
        heading: "Install and verify the starter",
        paragraphs: [
          "Extract the ZIP into its own folder. After configuring `ownerNumber`, install dependencies, run `npm test` offline, then use `npm start` for real pairing. From the portfolio repository, `npm run test:noxwafreebot` also verifies that article and source code stay in sync.",
        ],
        codeBlocks: [NoxCoreDevRunCommands],
        ending: "The starter keeps a clear boundary: one Baileys session, short names for generic helpers, the NoxCoreDev prefix on a few owner-related functions, two newsletter JIDs, and group replies triggered only by relevant events.",
      },
    ],
    takeaways: [
      "`config.js` centralizes the name, owner, `OWNER_NUMBER`, mode, and function settings.",
      "Baileys 6.7.24 provides the verified newsletter calls; code is limited to two JIDs and one reaction per post.",
      "Welcome/goodbye replies only respond to enabled group add/remove events.",
    ],
  },
};

export default article;
