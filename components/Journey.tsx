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
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
        Mon parcours
      </h2>
      <div className="mt-10 border-l border-line pl-8">
        {steps.map((s, i) => (
          <div key={s.year} className={`relative ${i !== steps.length - 1 ? "pb-10" : ""}`}>
            <span className="absolute -left-[2.3rem] top-1 h-3 w-3 rounded-full bg-accent2" />
            <p className="font-mono text-sm text-accent2">{s.year}</p>
            <h3 className="mt-1 font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 max-w-measure text-sm leading-relaxed text-muted">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
