type Project = {
  name: string;
  status: "live" | "beta";
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    name: "NOXFREEPANELBOT",
    status: "live",
    description:
      "Bot Telegram qui facilite l'accès à un hébergement gratuit grâce à un système de coins et de parrainage. Les utilisateurs gagnent des coins en invitant leurs amis et en réclamant leur récompense quotidienne (+5 coins). Le bot suit les parrainages et affiche le top 10 des membres les plus actifs.",
    stack: ["Telegram Bot API", "Système de coins", "Parrainage", "Classement"],
    github: "https://github.com/NoxCoreDev/noxfreepanelbot/fork",
    demo: "https://t.me/noxfreepanelbot",
  },
  {
    name: "NOX-NX MININOXBOT",
    status: "live",
    description:
      "Bot WhatsApp multi-session avec codes de jumelage et tableau de bord web pour connecter et suivre les sessions. Simplifie la gestion des connexions WhatsApp depuis un seul endroit.",
    stack: ["Node.js", "JavaScript", "Baileys", "API Web", "HTML/CSS/JS"],
    github: "https://github.com/NoxCoreDev/Noxfreeminibot/fork",
    demo: "https://nox-nx-dfix.onrender.com",
  },
  {
    name: "SPIDER NX",
    status: "live",
    description:
      "Bot WhatsApp multi-appareils et site web permettant de lier un numéro par code d'appairage et de gérer les sessions.",
    stack: ["Node.js", "JavaScript", "Baileys", "Express", "Socket.IO"],
    github: "https://github.com/NoxCoreDev",
    demo: "https://spider-nx.vercel.app",
  },
  {
    name: "ANIMEFLIX",
    status: "beta",
    description:
      "Maquette front-end de catalogue d'animés avec recherche et rangées de contenus. Le dépôt ne contient ni lecteur vidéo ni backend.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "pnpm"],
    github: "https://github.com/NoxCoreDev",
    demo: "https://Animeflix.zone.id",
  },
];

export default function Projects() {
  return (
    <section id="projets" className="border-t border-line/60 bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          Projets
        </h2>
        <p className="mt-3 max-w-measure text-sm text-muted">
          Une sélection de bots, panels et apps que j'ai construits et déployés.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.name}
              className="flex flex-col justify-between rounded-lg border border-line bg-surface p-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {p.name}
                  </h3>
                  <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        p.status === "live" ? "bg-ok" : "bg-signal"
                      }`}
                    />
                    {p.status === "live" ? "en ligne" : "bêta"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-line px-2 py-1 font-mono text-[11px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex gap-4 text-sm">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent2 transition-colors hover:text-text"
                  >
                    GitHub
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent2 transition-colors hover:text-text"
                  >
                    Démo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
