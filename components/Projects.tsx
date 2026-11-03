type Project = {
  name: string;
  badge: string;
  logo: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    name: "NOXFREEPANELBOT",
    badge: "Personal",
    logo: "https://cdn5.telesco.pe/file/qLhevYRnO0bFXKVQf8q3DZRrGAos1dCaa5E-qCmdBkCo323yikbAqOWf5vcu3BcpfvRCR4hpd2-ob1eYA8p8JvvsxVvctgHrN5a5bO1VLquNVvBBK-gS0f_m8L-Xw72Y81QznAn8vFlc8l0SF_Y94q8AVkHP1WuYN1vcEKTm_qyorbzs0azJscfIn7tX41n6EoJe1EHXIFGJJ9UMFTaM2QBknds56a3O_SCCpBxMJ59n0VO2wUr8lxTTGn7tBkdogCVcCtvNi2WVrJrLFxcpfjeq9bSDql3ZZCByuRGrjhsGe2JkAbGQS9F5deJ12YeM4kw8epSPQ0x7IcKnC2x-SA.jpg",
    description:
      "Bot Telegram qui facilite l'accès à un hébergement gratuit grâce à un système de coins et de parrainage. Les utilisateurs gagnent des coins en invitant leurs amis et en réclamant leur récompense quotidienne (+5 coins). Le bot suit les parrainages et affiche le top 10 des membres les plus actifs.",
    stack: ["Telegram Bot API", "Système de coins", "Parrainage", "Classement"],
    github: "https://github.com/NoxCoreDev/noxfreepanelbot/fork",
    demo: "https://t.me/noxfreepanelbot",
  },
  {
    name: "NOX-NX MININOXBOT",
    badge: "Personal",
    logo: "https://i.postimg.cc/JhC8sv51/IMG-20261005-180328-038.png",
    description:
      "Bot WhatsApp multi-session avec codes de jumelage et tableau de bord web pour connecter et suivre les sessions. Simplifie la gestion des connexions WhatsApp depuis un seul endroit.",
    stack: ["Node.js", "JavaScript", "Baileys", "API Web"],
    github: "https://github.com/NoxCoreDev/Noxfreeminibot/fork",
    demo: "https://nox-nx-dfix.onrender.com",
  },
  {
    name: "SPIDER NX",
    badge: "Personal",
    logo: "https://www.image2url.com/r2/default/images/1793577295874-16d11b2a-886b-4fdc-9413-65752ae54076.jpg",
    description:
      "Bot WhatsApp multi-appareils et site web permettant de lier un numéro par code d'appairage et de gérer les sessions.",
    stack: ["Node.js", "JavaScript", "Baileys", "Express", "Socket.IO"],
    github: "https://github.com/NoxCoreDev",
    demo: "https://spider-nx.vercel.app",
  },
  {
    name: "ANIMEFLIX",
    badge: "Personal",
    logo: "https://animeflix.zone.id/nox-hero.png",
    description:
      "Maquette front-end de catalogue d'animés avec recherche et rangées de contenus. Le dépôt ne contient ni lecteur vidéo ni backend.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4"],
    github: "https://github.com/NoxCoreDev",
    demo: "https://Animeflix.zone.id",
  },
];

export default function Projects() {
  return (
    <section id="projets" className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <h2 className="text-center font-display text-3xl font-bold tracking-tight md:text-4xl">
        Mes Projets
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-muted">
        Découvrez mon portfolio de projets développés en solo.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.name}
            className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm"
          >
            <div className="h-44 w-full overflow-hidden bg-surface2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.logo}
                alt={`Aperçu de ${p.name}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface2 px-3 py-1 text-xs font-medium text-accent2">
                {p.badge}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-text px-4 py-2 text-xs font-medium text-white"
                  >
                    Visite
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-line px-4 py-2 text-xs font-medium text-text transition-colors hover:border-accent"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
