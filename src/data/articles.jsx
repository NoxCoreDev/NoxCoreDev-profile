export const articles = [
  {
    id: 1,
    slug: "create-your-own-whatsapp-bot-2025",
    date: new Date("2025-11-09"),
    category: "Bots",
    title: "Create Your Own WhatsApp Bot – Complete 2025 Guide",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=800",
    excerpt: "Learn how to create an automated WhatsApp bot. This tutorial covers installation, source files, and step-by-step deployment.",
    content: (
  <div className="space-y-6">

    {/* INTRO */}
    <p>
      Dans ce guide, nous allons créer un bot WhatsApp complet étape par étape.
      Ce bot utilise la librairie Baileys pour fonctionner avec un QR code.
    </p>

    {/* EXPPLICATION */}
    <p>
      Avant de commencer, assure-toi d’avoir installé Node.js sur ton système.
      Ensuite, initialise un projet Node avec npm.
    </p>

    {/* FICHIER 1 */}
    <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-blue-600 space-y-2">

      <p className="font-bold">📁 Fichier principal : bot.js</p>

      <p>Crée un fichier <code>bot.js</code> et colle ce code :</p>

      {/* CODE BLOCK */}
      <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto">
{`const { default: makeWASocket } = require("@whiskeysockets/baileys");

async function startBot() {
  const sock = makeWASocket();
  console.log("Bot démarré !");
}

startBot();`}
      </pre>

      {/* COPY BUTTON (simple exemple) */}
      <button
        onClick={() => navigator.clipboard.writeText(`const { default: makeWASocket } = require("@whiskeysockets/baileys");`)}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Copier le code
      </button>

    </div>

    {/* EXPPLICATION */}
    <p>
      Ce code initialise une connexion WhatsApp. Lors de la première exécution,
      un QR code sera généré.
    </p>

    {/* FICHIER 2 */}
    <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-blue-600 space-y-2">

      <p className="font-bold">📁 Fichier : package.json</p>

      <p>Ajoute les dépendances suivantes :</p>

      <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto">
{`{
  "name": "whatsapp-bot",
  "version": "1.0.0",
  "dependencies": {
    "@whiskeysockets/baileys": "^6.0.0"
  }
}`}
      </pre>

    </div>

    {/* FICHIER 3 */}
    <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-blue-600 space-y-2">

      <p className="font-bold">📁 Fichier : config.js</p>

      <p>Ajoute ta configuration :</p>

      <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto">
{`module.exports = {
  prefix: "!",
  owner: "TonNom"
};`}
      </pre>

    </div>

    {/* EXPLICATION FINALE */}
    <p>
      Une fois tous les fichiers configurés, lance le bot avec la commande :
    </p>

    <pre className="bg-black text-green-400 p-4 rounded-lg">
node bot.js
    </pre>

    {/* CTA DOWNLOAD */}
    <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg border-l-4 border-green-600 space-y-2">

      <p className="font-bold">
        📦 Télécharger le projet complet
      </p>

      <p>
        Clique sur le lien ci-dessous pour télécharger tous les fichiers prêts à l’emploi :
      </p>

      <a
        href="https://www.mediafire.com/file/sr9vdjhr3qouxyc/FREE-BASE-BOT-2026-EN.zip/file"
        className="text-blue-600 font-bold underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Télécharger le projet complet
      </a>

    </div>

  </div>
)
  },

  {
  id: 2,
  slug: "automate-whatsapp-productivity",
  date: new Date("2025-11-11"),
  category: "Bots",
  title: "How to automate WhatsApp to boost your productivity",
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800",
  excerpt: "Discover how to automate WhatsApp messages, commands and workflows to save hours every day.",
  content: (
    <div className="space-y-6">

      <p>
        Automation is one of the most powerful tools for developers and entrepreneurs.
        With a WhatsApp bot, you can reply instantly, manage groups, and execute commands 24/7.
      </p>

      <h2 className="font-bold text-xl">⚡ Why automate WhatsApp?</h2>
      <ul className="list-disc ml-6">
        <li>Reply instantly to messages</li>
        <li>Manage groups automatically</li>
        <li>Save time on repetitive tasks</li>
        <li>Create a 24/7 assistant</li>
      </ul>

      <h2 className="font-bold text-xl">📁 Example: Auto-reply command</h2>

      <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-blue-600">
        <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto">
{`if (text === ".hello") {
  await obito.sendMessage(message.key.remoteJid, {
    text: "👋 Hello! I am your automated bot."
  });
}`}
        </pre>
      </div>

      <p>
        This simple command automatically replies when a user sends ".hello".
      </p>

      <h2 className="font-bold text-xl">🤖 Advanced automation ideas</h2>

      <ul className="list-disc ml-6">
        <li>Auto welcome new members</li>
        <li>Auto-delete spam links</li>
        <li>Schedule messages</li>
        <li>Send daily reports</li>
      </ul>

      <h2 className="font-bold text-xl">⏰ Example: Scheduled message</h2>

      <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-blue-600">
        <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto">
{`setInterval(() => {
  obito.sendMessage("225xxxx@s.whatsapp.net", {
    text: "⏰ Daily reminder!"
  });
}, 86400000);`}
        </pre>
      </div>

      <p>
        With automation, your WhatsApp becomes a powerful productivity machine.
      </p>

    </div>
  ),
},

  {
  id: 3,
  slug: "top-5-bot-projects",
  date: new Date("2025-11-13"),
  category: "Bots",
  title: "Top 5 projects to start with a bot",
  image: "https://files.catbox.moe/fvljdj.jpg",
  excerpt: "Discover the best beginner-friendly bot projects to improve your coding skills.",
  content: (
    <div className="space-y-6">

      <p>
        If you are starting with bots, choosing the right project is crucial.
        Here are 5 powerful ideas you can build today.
      </p>

      <h2 className="font-bold text-xl">1️⃣ Notification Bot</h2>
      <p>Sends alerts like weather, news or crypto prices.</p>

      <pre className="bg-black text-green-400 p-4 rounded-lg">
{`fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
  .then(res => res.json())
  .then(data => console.log(data));`}
      </pre>

      <h2 className="font-bold text-xl">2️⃣ Download Bot</h2>
      <p>Download videos from TikTok or YouTube.</p>

      <h2 className="font-bold text-xl">3️⃣ Quiz Bot</h2>
      <p>Create interactive quizzes for groups.</p>

      <h2 className="font-bold text-xl">4️⃣ Reminder Bot</h2>
      <p>Set reminders for tasks.</p>

      <h2 className="font-bold text-xl">5️⃣ Moderation Bot</h2>
      <p>Auto-delete links and manage groups.</p>

      <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
        <p className="font-bold">🔥 Pro tip:</p>
        <p>Start small, then combine all these features into one powerful bot.</p>
      </div>

    </div>
  ),
},

  {
  id: 4,
  slug: "html-css-basics",
  date: new Date("2025-11-15"),
  category: "Websites",
  title: "Mastering HTML5 & CSS3: The Basics of the Web",
  image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800",
  excerpt: "Learn HTML structure and CSS styling to build modern websites.",
  content: (
    <div className="space-y-6">

      <p>
        HTML provides structure, while CSS adds design.
        Together, they form the foundation of every website.
      </p>

      <h2 className="font-bold text-xl">📄 Basic HTML structure</h2>

      <pre className="bg-black text-green-400 p-4 rounded-lg">
{`<!DOCTYPE html>
<html>
<head>
  <title>My Site</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`}
      </pre>

      <h2 className="font-bold text-xl">🎨 CSS example</h2>

      <pre className="bg-black text-green-400 p-4 rounded-lg">
{`body {
  background: black;
  color: white;
}`}
      </pre>

      <h2 className="font-bold text-xl">🚀 SEO Tips</h2>

      <ul className="list-disc ml-6">
        <li>Use semantic tags (&lt;article&gt;, &lt;section&gt;)</li>
        <li>Optimize images</li>
        <li>Use proper headings</li>
      </ul>

    </div>
  ),
},

  {
  id: 5,
  slug: "react-seo-optimization",
  date: new Date("2025-11-17"),
  category: "Websites",
  title: "Optimizing React performance for SEO",
  image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800",
  excerpt: "Improve your React app speed and SEO ranking.",
  content: (
    <div className="space-y-6">

      <p>
        React apps are fast, but SEO can be tricky if not optimized properly.
      </p>

      <h2 className="font-bold text-xl">⚡ Performance tips</h2>

      <ul className="list-disc ml-6">
        <li>Lazy loading components</li>
        <li>Compress images</li>
        <li>Use CDN</li>
      </ul>

      <h2 className="font-bold text-xl">📦 Lazy loading example</h2>

      <pre className="bg-black text-green-400 p-4 rounded-lg">
{`const Blog = React.lazy(() => import("./Blog"));`}
      </pre>

      <h2 className="font-bold text-xl">🚀 Best solution</h2>

      <p>
        Use Next.js for SSR (Server Side Rendering).
      </p>

    </div>
  ),
},

  {
  id: 6,
  slug: "ai-for-coding",
  date: new Date("2025-11-20"),
  category: "AI",
  title: "Artificial Intelligence at the Service of Code",
  image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800",
  excerpt: "Discover how AI tools improve coding speed and quality.",
  content: (
    <div className="space-y-6">

      <p>
        AI is transforming development. Tools like ChatGPT and Copilot help developers code faster.
      </p>

      <h2 className="font-bold text-xl">🤖 What AI can do</h2>

      <ul className="list-disc ml-6">
        <li>Generate code</li>
        <li>Fix bugs</li>
        <li>Explain errors</li>
      </ul>

      <h2 className="font-bold text-xl">💡 Example: Generate function</h2>

      <pre className="bg-black text-green-400 p-4 rounded-lg">
{`function sum(a, b) {
  return a + b;
}`}
      </pre>

      <h2 className="font-bold text-xl">⚠️ Important</h2>

      <p>
        AI is powerful, but always review your code for security.
      </p>

    </div>
  ),
},

  {
    id: 7,
    slug: "responsive-design-guide",
    date: new Date("2025-11-22"),
    category: "Websites",
    title: "Responsive Design Guide: Mobile-First",
    image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=800",
    excerpt: "Over 60% of traffic is mobile. Your site must be perfect on smartphones.",
    content: <p>Use CSS Flexbox and Grid. Tailwind makes responsive design easy with classes like md:flex and lg:grid.</p>,
  },

  {
    id: 8,
    slug: "web-security-basics",
    date: new Date("2025-11-25"),
    category: "Security",
    title: "Securing Your Web App: The Basics",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
    excerpt: "Protecting user data is a priority.",
    content: <p>Always validate user inputs and enforce HTTPS across your entire site.</p>,
  },

  {
    id: 9,
    slug: "deploy-bot-vps",
    date: new Date("2025-11-28"),
    category: "Bots",
    title: "Deploying Your Bot on a VPS (24/7)",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    excerpt: "Run your bot 24/7 without keeping your PC on.",
    content: <p>Use a VPS with PM2 to keep your Node.js bot always running and auto-restarting.</p>,
  },

  {
    id: 10,
    slug: "adsense-blog-preparation",
    date: new Date("2025-12-01"),
    category: "Monetization",
    title: "Preparing Your Blog for Google AdSense",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800",
    excerpt: "All the tips to get approved by Google AdSense.",
    content: <p>Focus on unique content, clean navigation, and legal pages like Privacy Policy.</p>,
  },

  {
    id: 11,
    slug: "openai-react-integration",
    date: new Date("2025-12-05"),
    category: "AI",
    title: "Integrating OpenAI API into React",
    image: "https://images.unsplash.com/photo-1676299081847-824916de030a?q=80&w=800",
    excerpt: "Add AI features to your website.",
    content: <p>Never expose your API key in frontend. Always use a backend proxy.</p>,
  },

  {
    id: 12,
    slug: "python-vs-node-bots",
    date: new Date("2025-12-10"),
    category: "Bots",
    title: "Python vs Node.js for Bots",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800",
    excerpt: "Which language should you choose?",
    content: <p>Node.js is better for real-time bots like WhatsApp, Python excels in data processing.</p>,
  },

  {
    id: 13,
    slug: "group-management-bot",
    date: new Date("2025-12-15"),
    category: "Bots",
    title: "Group Management Bot: Auto-kick & Welcome",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800",
    excerpt: "Moderate your WhatsApp group automatically.",
    content: <p>Auto-welcome users and remove spam links automatically.</p>,
  },

  {
    id: 14,
    slug: "protect-whatsapp-bot",
    date: new Date("2025-12-18"),
    category: "Bots",
    title: "Protecting Your WhatsApp Bot from Bans",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800",
    excerpt: "Avoid getting banned by WhatsApp.",
    content: <p>Don’t spam messages and simulate human-like delays between actions.</p>,
  },

  {
    id: 15,
    slug: "portfolio-that-converts",
    date: new Date("2025-12-22"),
    category: "Websites",
    title: "Creating a Portfolio That Attracts Clients",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800",
    excerpt: "Land freelance jobs with a strong portfolio.",
    content: <p>Showcase 3 strong projects instead of many average ones.</p>,
  },

  {
    id: 16,
    slug: "typescript-intro",
    date: new Date("2025-12-25"),
    category: "Websites",
    title: "Introduction to TypeScript for JS Devs",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=800",
    excerpt: "Avoid bugs with static typing.",
    content: <p>TypeScript helps catch errors before running your code.</p>,
  },

  {
    id: 17,
    slug: "tailwind-css-guide",
    date: new Date("2025-12-28"),
    category: "Websites",
    title: "Tailwind CSS: Ultra-fast Pro Designs",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800",
    excerpt: "Design faster with Tailwind.",
    content: <p>Use utility classes instead of writing long CSS files.</p>,
  },

  {
    id: 18,
    slug: "web3-future",
    date: new Date("2026-01-02"),
    category: "Websites",
    title: "The Future of the Web: Web3 and Decentralization",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800",
    excerpt: "Understand blockchain and Web3.",
    content: <p>Web3 focuses on decentralization and user data ownership.</p>,
  },

  {
    id: 19,
    slug: "vscode-extensions-2026",
    date: new Date("2026-01-05"),
    category: "Websites",
    title: "Top 10 VS Code Extensions in 2026",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800",
    excerpt: "Boost your productivity.",
    content: <p>Extensions like Prettier and GitLens are essential.</p>,
  },

  {
    id: 20,
    slug: "discord-bot-nodejs",
    date: new Date("2026-01-08"),
    category: "Bots",
    title: "Creating a Discord Bot with Node.js",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=800",
    excerpt: "Build a Discord bot.",
    content: <p>Use Discord.js to create powerful bots.</p>,
  },

  {
    id: 21,
    slug: "css-dark-mode",
    date: new Date("2026-01-12"),
    category: "Websites",
    title: "The CSS Dark Mode Guide",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800",
    excerpt: "Add dark mode to your site.",
    content: <p>Use prefers-color-scheme for automatic dark mode.</p>,
  },

  {
    id: 22,
    slug: "learn-sql-basics",
    date: new Date("2026-01-15"),
    category: "Websites",
    title: "Learning SQL to Manage Your Data",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800",
    excerpt: "Master databases with SQL.",
    content: <p>Learn SELECT, JOIN and indexing for performance.</p>,
  },

{
    id: 23,
    slug: "create-whatsapp-bot-2026-EN",
    date: new Date("2026-03-25"),
    category: "Bots",
    title: "Create Your WhatsApp Bot – 2026 Method",
    image: "https://files.catbox.moe/spydhh.png",
    excerpt: "Learn the 2026 method to create a WhatsApp bot using Baileys with dynamic commands and pairing code.",
    content: (
      <div className="space-y-6">

        {/* INTRO */}
        <p>
          In this 2026 guide, we will create a fully functional WhatsApp bot step by step.
          This bot uses Baileys with multi-file authentication and pairing code support.
        </p>

        {/* REQUIREMENTS */}
        <p>
          Make sure Node.js is installed on your system. Then initialize a Node project with <code>npm init -y</code>.
        </p>

        {/* FILE 1 */}
        <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-blue-600 space-y-2">
          <p className="font-bold">📁 Main File: <code>index.js</code></p>
          <p>Paste the following code to start the bot:</p>
          <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto">
{`import makeWASocket, { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } from "@whiskeysockets/baileys";
import pino from "pino";
import readline from "readline";
import { handleCommand } from "./handler.js";
import { BotName, BotVersion } from "./config.js";

console.clear();
console.log(\`🚀 Starting \${BotName} V\${BotVersion} Bot...\`);

const usePairingCode = true;

const question = (text) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(text, (ans) => { rl.close(); resolve(ans); }));
};

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const { version } = await fetchLatestBaileysVersion();

  const bot = makeWASocket({
    version,
    printQRInTerminal: !usePairingCode,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    logger: pino({ level: "silent" }),
    auth: state,
  });

  if (usePairingCode && !bot.authState.creds.registered) {
    const number = await question("📱 Enter your number: ");
    const code = await bot.requestPairingCode(number);
    console.log(\`✅ PAIRING CODE: \${code}\`);
  }

  bot.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "open") console.log("✅ BOT SUCCESSFULLY CONNECTED !");
    else if (connection === "close") {
      if (lastDisconnect?.error?.output?.statusCode === DisconnectReason.loggedOut) {
        console.log("❌ Session expired. Delete 'session' folder and log in again.");
      } else {
        console.log("⚠️ Reconnecting...");
        startBot();
      }
    }
  });

  bot.ev.on("messages.upsert", async (chatUpdate) => {
    const msg = chatUpdate.messages[0];
    if (!msg.message) return;
    if (msg.key.remoteJid === "status@broadcast") return;
    await handleCommand(msg, bot);
  });

  bot.ev.on("creds.update", saveCreds);
}

startBot();`}
          </pre>
        </div>

        {/* FILE 2 */}
        <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-blue-600 space-y-2">
          <p className="font-bold">📁 Handler File: <code>handler.js</code></p>
          <p>This file dynamically loads commands, handles owner & private mode, and logs messages.</p>
        </div>

        {/* FILE 3 */}
        <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-blue-600 space-y-2">
          <p className="font-bold">📁 Config File: <code>config.js</code></p>
          <p>Define your bot info, owner, prefix, mode, and media:</p>
          <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto">
{`export const BotName = "Bot Base for My followers";
export const BotVersion = "0.0.1";
export const OwnerName = "JEAN STEPH DEV";
export const OwnerNumber = "2250712XXXX";
export const CreatorNumber = "2250712XXXX";
export const Prefix = ".";
export const Mode = "public"; // public / private
export const AutoReact = true;
export const AutoRead = false;`}
          </pre>
        </div>

        {/* FILE 4 */}
        <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-blue-600 space-y-2">
          <p className="font-bold">📁 Package.json</p>
          <p>Install dependencies for Baileys:</p>
          <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto">
{`{
  "name": "your-bot",
  "version": "1.0.0",
  "type": "module",
  "scripts": { "start": "node index.js" },
  "dependencies": {
    "@whiskeysockets/baileys": "^6.7.8",
    "@hapi/boom": "^10.0.1",
    "pino": "^9.0.0"
  }
}`}
          </pre>
        </div>

        {/* FINAL EXECUTION */}
        <p>Run your bot with:</p>
        <pre className="bg-black text-green-400 p-4 rounded-lg">npm start</pre>

        {/* CTA */}
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg border-l-4 border-green-600 space-y-2">
          <p className="font-bold">📦 Download Full Project</p>
          <a href="https://www.mediafire.com/file/sr9vdjhr3qouxyc/FREE-BASE-BOT-2026-EN.zip/file" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline">
            Download WhatsApp Bot 2026
          </a>
        </div>
      </div>
    ),
  },

  {
    id: 24,
    slug: "create-whatsapp-bot-2026-FR",
    date: new Date("2026-03-25"),
    category: "Bots",
    title: "Créer votre bot WhatsApp – Méthode 2026",
    image: "https://files.catbox.moe/spydhh.png",
    excerpt: "Apprenez la méthode 2026 pour créer un bot WhatsApp avec Baileys, commandes dynamiques et pairing code.",
    content: (
      <div className="space-y-6">

        {/* INTRO */}
        <p>
          Dans ce guide 2026, nous allons créer un bot WhatsApp complet étape par étape.
          Ce bot utilise Baileys avec authentification multi-fichiers et support du pairing code.
        </p>

        {/* PREREQUIS */}
        <p>
          Assurez-vous que Node.js est installé sur votre système. Initialisez ensuite un projet Node avec <code>npm init -y</code>.
        </p>

        {/* FICHIER 1 */}
        <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-blue-600 space-y-2">
          <p className="font-bold">📁 Fichier principal : <code>index.js</code></p>
          <p>Collez ce code pour démarrer le bot :</p>
          <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto">
{`import makeWASocket, { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } from "@whiskeysockets/baileys";
import pino from "pino";
import readline from "readline";
import { handleCommand } from "./handler.js";
import { BotName, BotVersion } from "./config.js";

console.clear();
console.log(\`🚀 Démarrage de \${BotName} V\${BotVersion}...\`);

const usePairingCode = true;

const question = (text) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(text, (ans) => { rl.close(); resolve(ans); }));
};

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const { version } = await fetchLatestBaileysVersion();

  const bot = makeWASocket({
    version,
    printQRInTerminal: !usePairingCode,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    logger: pino({ level: "silent" }),
    auth: state,
  });

  if (usePairingCode && !bot.authState.creds.registered) {
    const number = await question("📱 Entrez votre numéro : ");
    const code = await bot.requestPairingCode(number);
    console.log(\`✅ CODE DE PAIRING : \${code}\`);
  }

  bot.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "open") console.log("✅ BOT CONNECTÉ AVEC SUCCÈS !");
    else if (connection === "close") {
      if (lastDisconnect?.error?.output?.statusCode === DisconnectReason.loggedOut) {
        console.log("❌ Session expirée. Supprimez le dossier 'session' et reconnectez-vous.");
      } else {
        console.log("⚠️ Reconnexion...");
        startBot();
      }
    }
  });

  bot.ev.on("messages.upsert", async (chatUpdate) => {
    const msg = chatUpdate.messages[0];
    if (!msg.message) return;
    if (msg.key.remoteJid === "status@broadcast") return;
    await handleCommand(msg, bot);
  });

  bot.ev.on("creds.update", saveCreds);
}

startBot();`}
          </pre>
        </div>

        {/* FILES 2-4 (Handler, Config, Package.json) */}
        <p>
          Créez ensuite <code>handler.js</code> pour la gestion dynamique des commandes, 
          <code>config.js</code> pour la configuration du bot, et <code>package.json</code> avec les dépendances.
        </p>

        {/* EXECUTION */}
        <p>Exécutez le bot avec :</p>
        <pre className="bg-black text-green-400 p-4 rounded-lg">npm start</pre>

        {/* CTA */}
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg border-l-4 border-green-600 space-y-2">
          <p className="font-bold">📦 Télécharger le projet complet</p>
          <a href="https://www.mediafire.com/file/z8j218casbemoht/FREE-BASE-BOT-2026-FR.zip/file" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline">
            Télécharger le Bot WhatsApp 2026
          </a>
        </div>
      </div>
    ),
  },
];
