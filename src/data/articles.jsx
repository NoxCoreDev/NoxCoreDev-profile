import React from "react";

export const articles = [
  {
    id: 1,
    slug: "nox-nx-sessions-whatsapp",
    fr: {
      category: "Bots WhatsApp",
      title: "NOX-NX : penser la gestion de plusieurs sessions WhatsApp",
      excerpt: "Retour sur l’idée derrière NOX-NX : réunir l’appairage et le suivi de plusieurs sessions dans un parcours compréhensible.",
      content: (
        <div className="space-y-6">
          <p>NOX-NX est un projet de bot WhatsApp multi-session accompagné d’un tableau de bord web. Je l’aborde avec une question simple : comment rendre la connexion et le suivi des sessions plus faciles à comprendre, sans demander à l’utilisateur de deviner ce qui se passe en arrière-plan ?</p>
          <h2 className="text-2xl font-bold">Le parcours avant la connexion</h2>
          <p>Un code d’appairage est une étape concrète : il faut savoir quand le demander, où l’utiliser et comment reconnaître que la session est bien associée. Le tableau de bord sert de point de repère pour lancer cette étape et retrouver les sessions à suivre.</p>
          <p>Pour moi, une interface utile ne se limite pas à afficher des boutons. Elle doit distinguer clairement les actions disponibles, les informations de la session et les messages qui aident à comprendre la suite du parcours.</p>
          <h2 className="text-2xl font-bold">Le suivi compte autant que la connexion</h2>
          <p>Quand plusieurs sessions sont concernées, il devient important de ne pas les confondre. Un nom ou un état visible aide à savoir sur quelle session on agit. Les états d’attente, de connexion ou d’erreur devraient aussi être présentés de façon explicite : c’est une priorité de conception et de test pour ce type d’outil.</p>
          <h2 className="text-2xl font-bold">Ce que je veux améliorer</h2>
          <p>Je veux continuer à rendre le parcours prévisible : guider l’appairage, expliquer les retours de l’interface et garder la gestion des sessions lisible. Ce projet me fait travailler autant la logique du bot que la qualité de l’expérience web autour de lui.</p>
          <p>NOX-NX s’inscrit dans mon intérêt pour les bots, les applications web et l’automatisation — avec un objectif constant : construire des outils que l’on peut utiliser et comprendre.</p>
        </div>
      ),
    },
    en: {
      category: "WhatsApp Bots",
      title: "NOX-NX: designing a clearer way to manage WhatsApp sessions",
      excerpt: "The idea behind NOX-NX: bringing pairing and multi-session monitoring into a workflow people can understand.",
      content: (
        <div className="space-y-6">
          <p>NOX-NX is a multi-session WhatsApp bot project with a web dashboard. I approach it with a straightforward question: how can connecting and monitoring sessions be easier to understand, without asking people to guess what is happening in the background?</p>
          <h2 className="text-2xl font-bold">The steps before connecting</h2>
          <p>A pairing code is a concrete step: users need to know when to request it, where to use it, and how to tell when a session has been linked. The dashboard is intended to be a clear place to start that process and return to the sessions being monitored.</p>
          <p>To me, a useful interface is more than a collection of buttons. It should make available actions, session information, and next-step guidance easy to distinguish.</p>
          <h2 className="text-2xl font-bold">Monitoring matters as much as connecting</h2>
          <p>When several sessions are involved, it becomes important not to mix them up. A visible name or status can help users know which session they are acting on. Waiting, connected, and error states should also be explicit—an important design and testing priority for this kind of tool.</p>
          <h2 className="text-2xl font-bold">What I want to improve</h2>
          <p>I want to keep making the workflow predictable: guide pairing, explain interface feedback, and keep session management readable. This project lets me work on the bot logic as well as the quality of the web experience around it.</p>
          <p>NOX-NX reflects my interest in bots, web applications, and automation, with one consistent goal: building tools people can use and understand.</p>
        </div>
      ),
    },
  },
  {
    id: 2,
    slug: "spider-nx-code-appairage",
    fr: {
      category: "Automatisation",
      title: "Spider NX : du code d’appairage à une gestion claire des sessions",
      excerpt: "Comment je pense le parcours d’un projet qui relie un numéro WhatsApp à un bot et à une interface web.",
      content: (
        <div className="space-y-6">
          <p>Spider NX associe un bot WhatsApp multi-appareils à un site web qui permet de lier un numéro par code d’appairage et de gérer les sessions. Le projet me pousse à réfléchir à l’ensemble du parcours, pas seulement au moment où le code apparaît à l’écran.</p>
          <h2 className="text-2xl font-bold">Rendre chaque étape compréhensible</h2>
          <p>Un parcours bien présenté répond aux questions dans le bon ordre : quelle action lancer, où saisir le code, puis comment revenir à l’interface pour suivre la session. Si une étape prend du temps ou échoue, un retour clair vaut mieux qu’un silence qui laisse l’utilisateur dans le doute.</p>
          <h2 className="text-2xl font-bold">Le site web fait partie du produit</h2>
          <p>La page de gestion n’est pas un simple supplément au bot. C’est le point de contact qui aide à démarrer et à comprendre la gestion des sessions. Je cherche donc à garder les commandes et les informations importantes faciles à repérer, sur ordinateur comme sur téléphone.</p>
          <h2 className="text-2xl font-bold">Penser aussi aux cas moins simples</h2>
          <p>Une session peut être en attente, déjà associée ou nécessiter une nouvelle tentative. Prévoir comment présenter ces situations fait partie du travail : les utilisateurs doivent pouvoir distinguer l’état actuel de l’action suivante. Les informations de session méritent également une attention particulière et ne doivent pas être exposées inutilement.</p>
          <p>Spider NX est un de mes projets d’apprentissage en automatisation et en développement web. Je l’utilise pour progresser sur les interactions entre un bot, ses sessions et l’interface qui les accompagne.</p>
        </div>
      ),
    },
    en: {
      category: "Automation",
      title: "Spider NX: from pairing code to clearer session management",
      excerpt: "How I think about the journey in a project that connects a WhatsApp number, a bot, and a web interface.",
      content: (
        <div className="space-y-6">
          <p>Spider NX combines a multi-device WhatsApp bot with a website for linking a number using a pairing code and managing sessions. The project encourages me to think about the whole journey, not only the moment a code appears on screen.</p>
          <h2 className="text-2xl font-bold">Make every step understandable</h2>
          <p>A well-presented flow answers questions in the right order: what action to start, where to enter the code, and how to return to the interface to monitor the session. If a step takes time or fails, clear feedback is better than silence that leaves people guessing.</p>
          <h2 className="text-2xl font-bold">The website is part of the product</h2>
          <p>The management page is not just an add-on to the bot. It is the point of contact that helps people get started and understand their sessions. I aim to keep key actions and information easy to find on both desktop and mobile.</p>
          <h2 className="text-2xl font-bold">Consider the less straightforward cases too</h2>
          <p>A session may be waiting, already linked, or need another attempt. Planning how to present these situations is part of the work: users should be able to tell the current state from the next action. Session information also deserves care and should not be exposed unnecessarily.</p>
          <p>Spider NX is one of my projects for learning automation and web development. I use it to improve how a bot, its sessions, and the interface around them work together.</p>
        </div>
      ),
    },
  },
  {
    id: 3,
    slug: "mon-approche-bots-automatisation",
    fr: {
      category: "Développement & DevOps",
      title: "Construire des bots utiles : mon approche de l’automatisation",
      excerpt: "De NOX-NX et Spider NX à MININOXBOT V3, TGCloud et NOX Tools : les principes que je garde en tête quand je crée un outil.",
      content: (
        <div className="space-y-6">
          <p>Je crée des projets autour des bots, du web et de l’automatisation. Des noms comme NOX-NX, Spider NX, MININOXBOT V3, TGCloud et NOX Tools correspondent à des pistes que je développe et explore. Plutôt que de commencer par empiler des fonctionnalités, j’essaie d’abord de comprendre le parcours que l’outil doit rendre plus simple.</p>
          <h2 className="text-2xl font-bold">Partir d’un besoin concret</h2>
          <p>Un bot est utile lorsqu’il aide quelqu’un à accomplir une tâche précise. Je commence donc par clarifier l’action principale, les informations nécessaires et ce que l’utilisateur doit voir après chaque étape. Cette réflexion évite de confondre une longue liste de commandes avec une expérience réellement claire.</p>
          <h2 className="text-2xl font-bold">Relier bot, interface et fonctionnement</h2>
          <p>Quand un projet comprend aussi un site ou un tableau de bord, les deux parties doivent raconter la même histoire : les commandes déclenchent des actions compréhensibles et l’interface aide à suivre ce qui se passe. Les erreurs et les états en attente font partie du parcours ; il faut leur réserver une place au lieu de les découvrir trop tard.</p>
          <h2 className="text-2xl font-bold">Apprendre en construisant</h2>
          <p>Mon apprentissage est autodidacte. Chaque projet est l’occasion de travailler la logique JavaScript, les intégrations, les interfaces, le débogage et les bases du déploiement. Je préfère avancer par étapes, vérifier chaque partie et améliorer ce qui manque plutôt que de promettre des résultats que je n’ai pas mesurés.</p>
          <p>C’est l’approche que je veux continuer à appliquer à mes outils : des objectifs clairs, une expérience lisible et une attention constante à la fiabilité.</p>
        </div>
      ),
    },
    en: {
      category: "Development & DevOps",
      title: "Building useful bots: my approach to automation",
      excerpt: "From NOX-NX and Spider NX to MININOXBOT V3, TGCloud, and NOX Tools: the principles I keep in mind when building a tool.",
      content: (
        <div className="space-y-6">
          <p>I build projects around bots, the web, and automation. Names such as NOX-NX, Spider NX, MININOXBOT V3, TGCloud, and NOX Tools represent projects I am developing and exploring. Instead of starting by piling on features, I first try to understand which part of a user's journey the tool should make simpler.</p>
          <h2 className="text-2xl font-bold">Start with a real need</h2>
          <p>A bot is useful when it helps someone complete a specific task. I start by clarifying the main action, the information required, and what the user should see after each step. This helps avoid mistaking a long list of commands for a genuinely clear experience.</p>
          <h2 className="text-2xl font-bold">Connect the bot, interface, and operation</h2>
          <p>When a project also includes a website or dashboard, both parts should tell the same story: commands trigger understandable actions and the interface helps people follow what is happening. Errors and waiting states are part of the journey too; they deserve a place in the design instead of being discovered too late.</p>
          <h2 className="text-2xl font-bold">Learn by building</h2>
          <p>I am self-taught. Each project gives me a chance to work on JavaScript logic, integrations, interfaces, debugging, and deployment fundamentals. I prefer to make progress in steps, check each part, and improve what is missing rather than promise results I have not measured.</p>
          <p>That is the approach I want to keep bringing to my tools: clear goals, an understandable experience, and continued attention to reliability.</p>
        </div>
      ),
    },
  },
];
