# NoxWaFreeBot — base NoxCoreDev

Starter pédagogique Node.js + Baileys, configuré pour l’appairage par code, les commandes, deux newsletters autorisées et les événements d’ajout/retrait de groupe.

## Arborescence

- `package.json` fixe Node.js 20+, Baileys 6.7.24 et les scripts `start` et `test`.
- `config.js` centralise le nom du bot, le propriétaire et son numéro, le mode, le préfixe, le répertoire de session, le délai de reconnexion, les JID newsletter, les réactions, les commandes et les modèles d’accueil/départ.
- `index.js` ouvre la session, demande le code d’appairage et raccorde les événements Baileys.
- `handler.js` distingue les messages normaux des newsletters, puis transmet les commandes.
- `commands.js` définit `.ping`, `.alive`, `.menu`, `.mode`, `.self`, `.public`, `.owner`, `.welcome` et `.goodbye`.
- `newsletters.js` effectue le follow des cibles configurées et une réaction dédupliquée par nouvelle publication ciblée.
- `group-events.js` gère les réglages par groupe et les messages d’arrivée/départ.
- `scripts/mock-test.mjs` teste les fonctions avec un socket simulé; il ne se connecte pas à WhatsApp.
- `.gitignore` exclut les sessions, `node_modules`, `.env` et les journaux.

## Configurer le propriétaire

Dans `config.js`, remplace `ownerNumber: "OWNER_NUMBER"` par le numéro du propriétaire, chiffres avec indicatif international et sans le signe `+` (par exemple, `224XXXXXXXX`). Le ZIP conserve le placeholder et ne contient aucun numéro personnel, code d’appairage, jeton ou fichier de session. Si le placeholder n’est pas remplacé, les commandes réservées au propriétaire ne reconnaîtront aucun numéro.

`mode` commence à `"public"`. `.self` passe en mode propriétaire uniquement; `.public` réactive le mode public; `.mode` affiche le réglage. Ces changements sont en mémoire et reviennent à la valeur de `config.js` après redémarrage.

## Installer et démarrer

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
npm start
```

Au premier démarrage, saisis le numéro WhatsApp à lier avec indicatif, sans `+`. Utilise le code affiché dans l’écran WhatsApp de connexion par numéro. Les identifiants de session sont créés localement dans `session/`, ignoré par Git.

Tests hors ligne :

```bash
npm test
```

Le test utilise uniquement des réponses simulées et le numéro factice `0000000000`; il ne crée pas de session et ne contacte pas WhatsApp.

## Commandes

| Commande | Fonction |
| --- | --- |
| `.ping` | Répond une fois « Pong ». |
| `.alive` | Confirme que NoxWaFreeBot est en ligne. |
| `.menu` | Affiche les commandes de `config.js`. |
| `.mode` | Affiche `public` ou `self` (propriétaire). |
| `.self` | Passe en mode propriétaire uniquement. |
| `.public` | Repasse en mode public. |
| `.owner` | Affiche le nom `NoxCoreDev`. |
| `.welcome on/off` | Active/désactive l’accueil dans le groupe; réservé aux administrateurs du groupe. |
| `.goodbye on/off` | Active/désactive le message de départ; réservé aux administrateurs du groupe. |

## Newsletters

`config.js` contient exactement ces deux JID : `120363434925681370@newsletter` et `120363428923746817@newsletter`. `newsletters.js` utilise les méthodes de Baileys 6.7.24 `newsletterFollow(jid)` et `newsletterReactMessage(jid, serverId, emoji)`. Au plus une réaction, choisie parmi 60 emojis, est envoyée à une nouvelle publication entrante d’une cible autorisée. Les doublons sont ignorés; aucun autre JID n’est suivi ni traité par ces fonctions.

## Accueil et départ

Les messages de bienvenue et de départ sont déclenchés uniquement depuis l’événement `group-participants.update`, lorsque `action` vaut `add` ou `remove` et que l’option correspondante du groupe est activée. Les événements `promote`/`demote`, les messages ordinaires et les conversations privées ne déclenchent pas ces textes. Les réglages de groupe sont gardés en mémoire et reviennent à leur valeur par défaut après redémarrage.
