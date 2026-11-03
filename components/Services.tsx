const services = [
  {
    title: "Bots & Automatisation",
    text: "Bots WhatsApp et Telegram sur-mesure : systèmes de coins, parrainage, classements, sessions multi-comptes et tableaux de bord de suivi.",
  },
  {
    title: "DevOps & Déploiement",
    text: "Mise en place de pipelines de déploiement, hébergement, panels d'administration et automatisation des mises en production.",
  },
  {
    title: "Développement Web & App",
    text: "Sites et applications avec Next.js, React et Node.js — dashboards, interfaces de gestion, sites vitrines et outils internes.",
  },
  {
    title: "Intégration IA",
    text: "Intégration de l'IA dans des workflows existants : bots plus intelligents, automatisations de réponses, outils d'aide à la décision.",
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
        Services
      </h2>
      <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
        {services.map((s) => (
          <div key={s.title} className="bg-ink p-6">
            <h3 className="font-display text-base font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
