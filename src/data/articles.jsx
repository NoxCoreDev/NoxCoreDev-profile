import botWhatsappSimple from "./articles/whatsapp-simple-baileys.js";
import articleNoxHosting from "./articles/nox-hosting.js";

export const blogAuthor = {
  name: "Othman",
  brand: "NoxCoreDev",
  avatar: "/logo-icon.svg",
  bio: {
    fr: "Développeur autodidacte · Automatisation & DevOps",
    en: "Self-taught developer · Automation & DevOps",
  },
};

export const articles = [
  {
    id: 1,
    slug: "nox-nx-sessions-whatsapp",
    publishedAt: "2026-11-04",
    cover: "/blog/nox-nx-cover.webp",
    ogImage: "/og/nox-nx-sessions-whatsapp.jpg",
    fr: {
      category: "Bots WhatsApp",
      title: "NOX-NX : penser la gestion de plusieurs sessions WhatsApp",
      excerpt: "Comment j’aborde un bot multi-session avec codes d’appairage et tableau de bord web — du premier lien au suivi quotidien.",
      intro: "NOX-NX est un de mes projets de bot WhatsApp : il associe plusieurs sessions, des codes d’appairage et un tableau de bord web pour les connecter et les suivre. Dans cet article, je détaille les problèmes d’expérience et les points techniques que je prends en compte autour de ce parcours, sans confondre les objectifs de conception avec des résultats mesurés.",
      tags: ["WhatsApp", "Node.js", "Baileys", "Multi-session", "Tableau de bord web"],
      sections: [
        {
          heading: "Pourquoi le multi-session est aussi un problème d’interface",
          paragraphs: [
            "Quand un outil ne gère qu’une seule connexion, le contexte est évident : l’utilisateur sait généralement à quelle session il se rapporte. Dès que plusieurs sessions coexistent, cette évidence disparaît. Il faut pouvoir distinguer les connexions, savoir laquelle est active et comprendre quelle action s’appliquera à laquelle.",
            "C’est pour cela que je ne considère pas le tableau de bord comme une simple décoration du bot. Il fait partie du produit. Les libellés, l’ordre des actions et la visibilité de l’état doivent aider à répondre à une question très pratique : « qu’est-ce qui se passe avec cette session précise ? »",
          ],
        },
        {
          heading: "Le code d’appairage mérite un parcours à part entière",
          paragraphs: [
            "L’appairage est le premier moment où l’utilisateur relie son compte au service. Un parcours clair indique quelle session est concernée, explique où utiliser le code et donne un retour compréhensible après l’action. Si le code n’est plus utilisable ou si la connexion tarde, l’interface doit éviter de laisser la personne sans repère.",
            "Dans NOX-NX, le code d’appairage est une fonction centrale. Je pense donc les étapes autour de lui comme un petit parcours guidé : démarrer une demande, présenter l’information nécessaire, attendre la confirmation et rendre visible le prochain choix. Il ne s’agit pas d’inventer une promesse de connexion instantanée, mais de rendre l’attente et les possibilités lisibles.",
          ],
        },
        {
          heading: "Ce qu’un tableau de bord doit rendre évident",
          paragraphs: [
            "Une interface de gestion de sessions doit d’abord montrer les unités que l’on gère. Un nom ou un repère visible, un état présenté sans ambiguïté et des commandes placées près de la session concernée limitent les erreurs de manipulation. Sur téléphone, ces mêmes informations doivent rester faciles à parcourir sans transformer chaque session en écran séparé.",
            "Le projet met en relation un bot Node.js utilisant Baileys et une interface web. Cette combinaison me fait réfléchir à la séparation des responsabilités : le bot s’occupe de ses interactions, tandis que l’interface web expose les contrôles et les informations utiles. Le lien entre les deux doit rester compréhensible pour la personne qui utilise l’outil, même si les détails techniques sont ailleurs.",
          ],
        },
        {
          heading: "Les cas limites font partie du produit",
          paragraphs: [
            "Un scénario réussi ne suffit pas à décrire la qualité d’un outil de session. Je garde aussi en tête les codes expirés, une confirmation qui n’arrive pas, une session qui se déconnecte et une nouvelle tentative lancée par erreur. Ce sont des situations de conception et de test à anticiper, pas des statistiques de fiabilité que je prétends avoir mesurées.",
            "Les données liées à une session doivent également être traitées avec soin. Une information nécessaire à la connexion ne devrait pas se retrouver dans un message public, une capture partagée ou un journal de diagnostic qui n’en a pas besoin. Réduire l’exposition et expliquer les actions sensibles fait partie des bonnes habitudes que je veux conserver dans mes projets.",
          ],
        },
        {
          heading: "Ma checklist pour faire évoluer NOX-NX",
          paragraphs: ["Pour chaque amélioration du parcours, je veux pouvoir vérifier des choses simples :"],
          bullets: [
            "La session concernée est-elle identifiable avant de lancer une action ?",
            "Le code, son usage et l’attente de confirmation sont-ils expliqués dans le bon ordre ?",
            "Les erreurs et les reconnexions donnent-elles une prochaine étape claire ?",
            "L’interface reste-t-elle lisible sur petit écran et avec plusieurs sessions ?",
          ],
          ending: "Ces questions m’aident à ne pas réduire le travail à l’ajout de commandes. NOX-NX est un terrain concret pour approfondir les bots, les interfaces web et la gestion de sessions, en gardant l’expérience de la personne au centre.",
        },
      ],
      takeaways: [
        "Un tableau de bord fait partie du produit, pas seulement de son apparence.",
        "L’appairage et les états de session doivent être expliqués étape par étape.",
        "Les cas d’erreur et la confidentialité doivent être pensés dès la conception.",
      ],
    },
    en: {
      category: "WhatsApp Bots",
      title: "NOX-NX: designing clearer WhatsApp multi-session management",
      excerpt: "How I approach a multi-session bot with pairing codes and a web dashboard—from the first link to ongoing monitoring.",
      intro: "NOX-NX is one of my WhatsApp bot projects: it brings together multiple sessions, pairing codes, and a web dashboard for connecting and monitoring them. In this article, I explain the experience and technical questions I consider around that workflow, while separating design goals from measured results.",
      tags: ["WhatsApp", "Node.js", "Baileys", "Multi-session", "Web dashboard"],
      sections: [
        {
          heading: "Why multi-session is also an interface problem",
          paragraphs: [
            "When a tool manages only one connection, context is usually obvious: people know which session they are referring to. Once several sessions can coexist, that stops being obvious. Users need to distinguish connections, see which one is active, and understand which session an action will affect.",
            "That is why I do not treat the dashboard as decoration around the bot. It is part of the product. Labels, action order, and visible status should help answer a very practical question: ‘what is happening with this particular session?’",
          ],
        },
        {
          heading: "Pairing deserves a complete workflow",
          paragraphs: [
            "Pairing is the first moment when a user links an account to the service. A clear workflow identifies the session, explains where to use the code, and provides understandable feedback afterwards. If a code is no longer usable or the connection takes time, the interface should not leave the person without a next step.",
            "In NOX-NX, pairing codes are central to the feature set. I therefore think of the surrounding steps as a small guided journey: start a request, present the information needed, wait for confirmation, and make the next choice visible. The goal is not to promise an instant connection, but to make waiting and available actions understandable.",
          ],
        },
        {
          heading: "What a dashboard should make obvious",
          paragraphs: [
            "A session-management interface should first show the units being managed. A visible name or identifier, an unambiguous status, and controls placed near the relevant session all help prevent mistakes. On mobile, the same information should remain easy to scan without forcing each session onto a separate screen.",
            "The project connects a Node.js bot using Baileys with a web interface. This combination makes me think about separating responsibilities: the bot handles its interactions while the web interface exposes useful controls and information. The connection between the two should remain understandable to the person using the tool, even when the implementation details stay out of sight.",
          ],
        },
        {
          heading: "Edge cases are part of the product",
          paragraphs: [
            "A successful pairing alone does not define the quality of a session tool. I also keep expired codes, missing confirmation, a disconnected session, and an accidental retry in mind. These are design and testing scenarios to consider—not reliability statistics that I claim to have measured.",
            "Session-related data also needs care. Information required for a connection should not end up in a public message, a shared screenshot, or a diagnostic log that does not need it. Limiting exposure and explaining sensitive actions are habits I want to maintain across my projects.",
          ],
        },
        {
          heading: "My checklist for evolving NOX-NX",
          paragraphs: ["For each improvement to the workflow, I want to be able to check a few simple things:"],
          bullets: [
            "Can users identify the relevant session before starting an action?",
            "Are the code, its use, and the confirmation wait explained in the right order?",
            "Do errors and reconnection attempts provide a clear next step?",
            "Does the interface stay readable on a small screen and with multiple sessions?",
          ],
          ending: "These questions help me avoid reducing the work to adding more commands. NOX-NX is a practical place to deepen my experience with bots, web interfaces, and session management while keeping the person using the tool at the center.",
        },
      ],
      takeaways: [
        "A dashboard is part of the product, not just its appearance.",
        "Pairing and session states should be explained step by step.",
        "Error cases and privacy belong in the design from the start.",
      ],
    },
  },
  {
    id: 2,
    slug: "spider-nx-code-appairage",
    publishedAt: "2026-11-04",
    cover: "/blog/spider-nx-cover.webp",
    ogImage: "/og/spider-nx-code-appairage.jpg",
    fr: {
      category: "Automatisation",
      title: "Spider NX : du code d’appairage à une gestion claire des sessions",
      excerpt: "Retour détaillé sur un projet multi-appareils qui relie l’appairage WhatsApp à une interface web de gestion.",
      intro: "Spider NX est un projet de bot WhatsApp multi-appareils accompagné d’un site web pour lier un numéro par code d’appairage et gérer les sessions. Je m’intéresse ici au parcours complet : ce que la personne fait sur son téléphone, ce que le service doit lui expliquer et la manière dont l’interface peut l’aider à garder le fil.",
      tags: ["Spider NX", "WhatsApp", "Node.js", "Express", "Socket.IO"],
      sections: [
        {
          heading: "Commencer par l’action que l’utilisateur comprend",
          paragraphs: [
            "Un code d’appairage a un avantage : il transforme une connexion technique en une action concrète à réaliser depuis l’application de messagerie. Mais cette simplicité dépend des instructions qui l’entourent. La personne doit comprendre quel numéro est concerné, où le code sera utilisé et ce qu’elle peut attendre ensuite.",
            "Pour Spider NX, je conçois la première étape comme une explication courte, suivie d’une action principale clairement identifiable. Si plusieurs sessions sont gérées, le contexte de chacune doit rester visible avant et après l’appairage. Cela réduit le risque d’agir sur la mauvaise connexion et évite de faire du code une énigme.",
          ],
        },
        {
          heading: "Ne pas confondre code demandé et session prête",
          paragraphs: [
            "Un bon retour d’interface distingue les étapes. Demander un code, le saisir sur l’appareil, attendre une réponse et retrouver une session liée sont des moments différents. Si l’interface les résume tous en un seul indicateur vague, la personne ne sait plus si elle doit patienter, recommencer ou vérifier son téléphone.",
            "Je veux que les messages accompagnent l’action réelle : une attente visible pendant qu’une réponse est nécessaire, une confirmation compréhensible après l’association et une instruction utile si l’essai doit être refait. Ce sont des critères de conception et de validation à appliquer au fil du développement, pas des promesses de disponibilité continue.",
          ],
        },
        {
          heading: "Le navigateur et le bot doivent se compléter",
          paragraphs: [
            "Le site web sert de point de contrôle pour lancer le processus et retrouver les sessions à gérer. Il doit rester suffisamment simple pour qu’une personne puisse comprendre les actions sans connaître la structure interne du bot. À l’inverse, l’interface ne devrait pas masquer un état qu’il est nécessaire de connaître pour continuer.",
            "Les technologies associées à Spider NX comprennent Node.js, Express et Socket.IO. Ce choix me donne un cadre pour travailler la liaison entre les fonctions du service et l’interface web, et pour réfléchir à la façon dont une évolution de session peut être communiquée. Le principe important reste indépendant de l’outil : afficher une information seulement lorsqu’elle correspond à l’état que le service peut réellement confirmer.",
          ],
        },
        {
          heading: "Dessiner aussi les chemins de récupération",
          paragraphs: [
            "Un parcours de connexion ne se termine pas au premier succès. Le réseau peut être interrompu, un code peut expirer, une session existante peut devoir être remplacée ou l’utilisateur peut fermer l’onglet avant la fin. Pour chacun de ces cas, je cherche à définir une récupération compréhensible plutôt qu’un message technique sans contexte.",
            "Une checklist utile peut couvrir l’ouverture sur téléphone, la saisie du code, l’annulation, l’expiration, le retour à l’interface et une nouvelle tentative. Je veux aussi vérifier que les informations sensibles ne s’affichent pas plus longtemps ou à plus d’endroits que nécessaire. Ce sont des points d’attention à tester, pas des résultats déjà quantifiés.",
          ],
        },
        {
          heading: "Ce que Spider NX m’apporte",
          paragraphs: [
            "Ce projet me fait travailler à la frontière du bot et du produit web. Il ne suffit pas que chaque partie fonctionne isolément : les termes utilisés, les états affichés et les prochaines actions doivent former une seule histoire cohérente.",
            "Mon objectif d’évolution est de rendre ce parcours aussi explicite que possible, sur mobile comme sur ordinateur. Cette exigence d’explication est utile pour toute automatisation : un outil devient plus facile à utiliser lorsque les personnes comprennent ce qu’il fait et ce qui leur est demandé.",
          ],
        },
      ],
      takeaways: [
        "Un code d’appairage doit être accompagné d’instructions situées au bon moment.",
        "L’interface doit distinguer demande, attente, confirmation et récupération.",
        "Les états montrés doivent refléter ce que le service peut réellement confirmer.",
      ],
    },
    en: {
      category: "Automation",
      title: "Spider NX: from pairing code to clear session management",
      excerpt: "A detailed look at a multi-device project connecting WhatsApp pairing with a web-based session manager.",
      intro: "Spider NX is a multi-device WhatsApp bot project with a website for linking a number through a pairing code and managing sessions. Here I look at the full journey: what someone does on their phone, what the service needs to explain, and how the interface can help them keep track.",
      tags: ["Spider NX", "WhatsApp", "Node.js", "Express", "Socket.IO"],
      sections: [
        {
          heading: "Start with an action the user understands",
          paragraphs: [
            "A pairing code has one advantage: it turns a technical connection into a concrete action to complete from the messaging app. But that simplicity depends on the instructions around it. People need to know which number is involved, where the code will be used, and what to expect next.",
            "For Spider NX, I think of the first step as a short explanation followed by one clearly identifiable main action. If multiple sessions are managed, each session's context should remain visible before and after pairing. That lowers the risk of acting on the wrong connection and keeps the code from becoming a puzzle.",
          ],
        },
        {
          heading: "Do not confuse a requested code with a ready session",
          paragraphs: [
            "Good interface feedback distinguishes the steps. Requesting a code, entering it on a device, waiting for a response, and returning to a linked session are different moments. If the interface sums them up in one vague status, people do not know whether to wait, try again, or check their phone.",
            "I want messages to follow the real action: a visible waiting state while a response is needed, an understandable confirmation after pairing, and a useful instruction if another attempt is required. These are design and validation criteria to apply during development, not promises of continuous availability.",
          ],
        },
        {
          heading: "The browser and the bot should complement each other",
          paragraphs: [
            "The website acts as a control point for starting the process and returning to the sessions being managed. It should be simple enough for someone to understand without knowing the bot's internal structure. At the same time, the interface should not hide a state that is needed to continue.",
            "The technologies associated with Spider NX include Node.js, Express, and Socket.IO. That gives me a setting in which to work on the connection between service functions and the web interface, and to think about how a session change can be communicated. The important principle is tool-independent: show information only when it corresponds to a state the service can actually confirm.",
          ],
        },
        {
          heading: "Design recovery paths too",
          paragraphs: [
            "A connection workflow does not end with the first success. A network can drop, a code can expire, an existing session may need to be replaced, or someone may close the tab before the process finishes. For each case, I try to define a clear way back instead of showing a technical message with no context.",
            "A useful checklist can cover opening the flow on a phone, entering the code, cancelling, expiry, returning to the interface, and retrying. I also want to check that sensitive information is not shown for longer or in more places than necessary. These are points to test, not already quantified results.",
          ],
        },
        {
          heading: "What Spider NX teaches me",
          paragraphs: [
            "This project has me working at the boundary between a bot and a web product. It is not enough for each part to work in isolation: the language, displayed states, and next actions need to tell one coherent story.",
            "My goal as the project evolves is to make this flow as explicit as possible on both mobile and desktop. That focus on explanation is useful for any automation: a tool is easier to use when people understand what it does and what it asks them to do.",
          ],
        },
      ],
      takeaways: [
        "A pairing code needs instructions at the right point in the flow.",
        "The interface should distinguish request, waiting, confirmation, and recovery.",
        "Displayed status should reflect what the service can actually confirm.",
      ],
    },
  },
  {
    id: 3,
    slug: "mon-approche-bots-automatisation",
    publishedAt: "2026-11-04",
    cover: "/blog/automation-workflow-cover.webp",
    ogImage: "/og/mon-approche-bots-automatisation.jpg",
    fr: {
      category: "Développement & DevOps",
      title: "Construire des bots utiles : ma méthode pour passer de l’idée à l’outil",
      excerpt: "Des projets WhatsApp et Telegram aux bases du DevOps : les étapes que je suis pour créer une automatisation compréhensible et maintenable.",
      intro: "Je travaille sur des projets autour des bots, du web et de l’automatisation, notamment NOX-NX, Spider NX, MININOXBOT V3, TGCloud et NOX Tools. Je ne vais pas attribuer ici des fonctionnalités non vérifiées à chacun : cet article parle plutôt de ma méthode de travail et des questions que je me pose pour transformer une idée de bot en outil clair.",
      tags: ["Bots", "Automatisation", "Telegram", "WhatsApp", "DevOps"],
      sections: [
        {
          heading: "1. Décrire le problème avant la liste de commandes",
          paragraphs: [
            "La première étape consiste à exprimer ce que la personne veut accomplir en une phrase. Une commande n’est qu’un moyen d’y arriver. Si je commence par inventer beaucoup de commandes, je risque de construire une interface chargée avant d’avoir compris le vrai besoin.",
            "Je note ensuite le parcours : point de départ, information nécessaire, action demandée au bot et confirmation attendue. Cette description aide aussi à distinguer une fonction essentielle d’une idée à garder pour plus tard. Le périmètre reste plus facile à tester lorsqu’il est visible.",
          ],
        },
        {
          heading: "2. Choisir le bon endroit pour chaque action",
          paragraphs: [
            "Un bot de messagerie est pratique pour les interactions courtes et guidées. Une page web ou un tableau de bord est parfois plus lisible pour parcourir plusieurs éléments ou vérifier leur état. Quand un projet utilise les deux, je veux que l’utilisateur sache où commencer et pourquoi une action se déroule dans l’un ou l’autre endroit.",
            "Cette distinction ne dépend pas d’un nom de framework. Elle dépend de la tâche : est-elle rapide et répétitive, ou demande-t-elle une vue d’ensemble ? En répondant à cela, je peux garder le bot utile sans essayer de mettre toute l’application dans une conversation.",
          ],
        },
        {
          heading: "3. Traiter l’état, les erreurs et les données avec soin",
          paragraphs: [
            "Les automatisations ont une mémoire opérationnelle : une demande peut être en attente, terminée ou avoir besoin d’une action supplémentaire. Même sans infrastructure complexe, il faut décider quelle information l’outil conserve, combien de temps elle reste nécessaire et comment une personne peut comprendre l’état actuel.",
            "Je considère également les erreurs comme des étapes à concevoir. Une réponse utile dit ce qui n’a pas marché à un niveau compréhensible et, lorsque c’est possible, indique une suite. Les identifiants, jetons et informations d’accès doivent rester hors des captures publiques, des messages partagés et des sorties de diagnostic inutiles.",
          ],
        },
        {
          heading: "4. Préparer le fonctionnement au-delà de mon ordinateur",
          paragraphs: [
            "Un prototype local répond à une question, mais un outil que d’autres doivent essayer demande quelques précautions de fonctionnement. Je pense à la configuration, à la séparation des valeurs sensibles et à la façon de redémarrer le service lorsqu’il s’arrête. L’objectif est d’éviter que des valeurs propres à mon environnement se retrouvent codées directement dans le projet.",
            "Pour le débogage, des journaux sobres peuvent aider à repérer une étape qui échoue sans enregistrer plus de données personnelles que nécessaire. Pour le déploiement, je préfère des changements petits et contrôlables : construire, vérifier l’application et garder une façon simple de comprendre ce qui a été modifié.",
          ],
        },
        {
          heading: "5. Apprendre publiquement, sans gonfler les résultats",
          paragraphs: [
            "Mon parcours est autodidacte. Les projets comme MININOXBOT V3, TGCloud et NOX Tools constituent pour moi des terrains de pratique, aux côtés des projets WhatsApp déjà présentés. Je peux y travailler JavaScript, les intégrations, les interfaces, le débogage et les notions de DevOps, puis noter honnêtement ce qui reste à améliorer.",
            "Je préfère expliquer un choix, une limite ou une prochaine étape plutôt que d’annoncer un chiffre de performance que je n’ai pas mesuré. Cette façon d’écrire rend aussi le portfolio plus utile : on peut voir le raisonnement derrière le projet, pas seulement son nom.",
          ],
          ending: "C’est la méthode que je veux continuer à appliquer : partir d’un besoin clair, choisir une forme adaptée, anticiper les états difficiles et documenter ce que j’apprends en construisant.",
        },
      ],
      takeaways: [
        "Commencer par le besoin et le parcours, pas par la quantité de commandes.",
        "Faire travailler le bot et l’interface web là où chacun est le plus utile.",
        "Penser configuration, erreurs et données sensibles avant de déployer.",
      ],
    },
    en: {
      category: "Development & DevOps",
      title: "Building useful bots: my process for turning an idea into a tool",
      excerpt: "From WhatsApp and Telegram projects to DevOps fundamentals: the steps I follow to build automation people can understand and maintain.",
      intro: "I work on projects around bots, the web, and automation, including NOX-NX, Spider NX, MININOXBOT V3, TGCloud, and NOX Tools. I will not assign unverified features to each name here; this article is about my working process and the questions I ask when turning a bot idea into a clear tool.",
      tags: ["Bots", "Automation", "Telegram", "WhatsApp", "DevOps"],
      sections: [
        {
          heading: "1. Describe the problem before the command list",
          paragraphs: [
            "The first step is to describe what a person wants to accomplish in one sentence. A command is only one way to get there. If I start by inventing a large command list, I risk building a crowded interface before understanding the actual need.",
            "I then write down the journey: starting point, information needed, action requested from the bot, and expected confirmation. This also helps separate an essential feature from an idea to save for later. Scope is easier to test when it is visible.",
          ],
        },
        {
          heading: "2. Put each action in the right place",
          paragraphs: [
            "A messaging bot is convenient for short, guided interactions. A website or dashboard can be clearer for browsing several items or checking their status. When a project uses both, I want people to know where to start and why an action happens in one place rather than the other.",
            "This distinction does not depend on a framework name. It depends on the task: is it quick and repetitive, or does it need an overview? Answering that helps keep a bot useful without trying to fit an entire application into a conversation.",
          ],
        },
        {
          heading: "3. Treat state, errors, and data with care",
          paragraphs: [
            "Automation has operational state: a request may be pending, complete, or require another action. Even without complex infrastructure, it is worth deciding what information a tool retains, how long it is needed, and how someone can understand the current state.",
            "I also treat errors as steps to design. A useful response says what went wrong in understandable terms and, when possible, suggests what to do next. Identifiers, tokens, and access details should stay out of public screenshots, shared messages, and unnecessary diagnostic output.",
          ],
        },
        {
          heading: "4. Plan for life beyond my own computer",
          paragraphs: [
            "A local prototype answers one question, but a tool that others may try needs a few operational considerations. I think about configuration, keeping sensitive values separate, and how to restart a service if it stops. The goal is to avoid hard-coding values that belong only to my own environment.",
            "For debugging, concise logs can help locate a failing step without recording more personal data than necessary. For deployment, I prefer changes that are small and easy to check: build the app, verify it, and keep a simple record of what changed.",
          ],
        },
        {
          heading: "5. Share the learning without inflating results",
          paragraphs: [
            "I am self-taught. Projects such as MININOXBOT V3, TGCloud, and NOX Tools give me places to practise alongside the WhatsApp projects already introduced. I can work on JavaScript, integrations, interfaces, debugging, and DevOps fundamentals, then honestly note what still needs improvement.",
            "I would rather explain a decision, a limitation, or a next step than announce a performance number I have not measured. That approach also makes a portfolio more useful: readers can see the thinking behind a project, not just its name.",
          ],
          ending: "That is the process I want to keep using: start with a clear need, choose a suitable form, anticipate difficult states, and document what I learn while building.",
        },
      ],
      takeaways: [
        "Start with the need and the user journey, not the number of commands.",
        "Let the bot and web interface do the work each is best suited for.",
        "Consider configuration, error paths, and sensitive data before deployment.",
      ],
    },
  },
  botWhatsappSimple,
  articleNoxHosting,
];

export function getLatestArticles(list = articles, limit = 3) {
  return [...list]
    .sort((first, second) => new Date(second.publishedAt) - new Date(first.publishedAt))
    .slice(0, limit);
}

export function getArticleReadingMinutes(post) {
  const text = [
    post.title,
    post.excerpt,
    post.intro,
    ...post.sections.flatMap((section) => [
      section.heading,
      ...(section.paragraphs || []),
      ...(section.bullets || []),
      section.ending || "",
      section.callout?.title || "",
      section.callout?.body || "",
      ...(section.codeBlocks || []).map((block) => block.code),
    ]),
    ...(post.takeaways || []),
  ].join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
