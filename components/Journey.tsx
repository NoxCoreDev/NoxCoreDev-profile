const steps = [
  {
    year: "2024",
    title: "The Beginning — NOX PRIMEEE",
    text: "Démarrage en solo, passionné par le développement de services intelligents (bots) sur WhatsApp et Telegram.",
  },
  {
    year: "2025",
    title: "The Pro Turn — NoxCoreDev",
    text: "Environ un an plus tard, entrée sérieuse dans la tech : développement de sites et d'applications sous mon vrai nom, fondation de PRIMEEE CORE.",
  },
  {
    year: "2026",
    title: "Going Deeper, Solo",
    text: "Sans formation formelle, apprentissage en continu, approfondissement de chaque sujet et intégration de l'IA dans mon flux de travail quotidien.",
  },
  {
    year: "Aujourd'hui",
    title: "Still Learning, Every Day",
    text: "J'approfondis ma connaissance de la tech jour après jour, en construisant des sites, des apps et des outils — l'apprentissage n'est jamais fini.",
  },
];

export default function Journey() {
  return (
    <section className="border-t border-line bg-surface2/60">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight md:text-4xl">
          Mon Parcours
        </h2>

        <div className="mt-14 border-l-2 border-line pl-8">
          {steps.map((s, i) => (
            <div key={s.year} className={`relative ${i !== steps.length - 1 ? "pb-12" : ""}`}>
              <span className="absolute -left-[2.56rem] top-1 h-4 w-4 rounded-full bg-brand-gradient ring-4 ring-surface2" />
              <p className="font-mono text-sm font-semibold uppercase tracking-wide text-accent">
                {s.year}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
