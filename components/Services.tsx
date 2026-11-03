const services = [
  {
    title: "Bots & Automatisation",
    text: "Bots WhatsApp et Telegram sur-mesure : systèmes de coins, parrainage, classements, sessions multi-comptes et tableaux de bord de suivi.",
    icon: "🤖",
  },
  {
    title: "DevOps & Déploiement",
    text: "Mise en place de pipelines de déploiement, hébergement, panels d'administration et automatisation des mises en production.",
    icon: "⚙️",
  },
  {
    title: "Développement Web & App",
    text: "Sites et applications avec Next.js, React et Node.js — dashboards, interfaces de gestion, sites vitrines et outils internes.",
    icon: "💻",
  },
  {
    title: "Intégration IA",
    text: "Intégration de l'IA dans des workflows existants : bots plus intelligents, automatisations de réponses, outils d'aide à la décision.",
    icon: "✨",
  },
];

export default function Services() {
  return (
    <section id="services" className="border-t border-line bg-surface2/60">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight md:text-4xl">
          Services
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-line bg-surface p-7 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-lg">
                {s.icon}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
