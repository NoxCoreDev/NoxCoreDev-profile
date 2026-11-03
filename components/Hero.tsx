export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-4xl px-6 pb-20 pt-16 text-center md:pb-28 md:pt-24">
      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface2 px-4 py-2 text-sm text-accent">
        <span className="h-2 w-2 rounded-full bg-ok" />
        Disponible pour de nouveaux projets
      </span>

      <h1 className="mt-7 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
        Salut, je suis <span className="bg-brand-gradient bg-clip-text text-transparent">Othman</span>.
      </h1>

      <p className="mt-5 font-mono text-sm uppercase tracking-[0.2em] text-muted">
        NoxCoreDev
      </p>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        Développeur passionné, Automatisation, DevOps, Web, App &amp; AI Developer.
      </p>
      <p className="mx-auto mt-2 max-w-2xl text-lg font-semibold leading-relaxed text-text">
        Autodidacte, toujours en train d&apos;apprendre.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#contact"
          className="rounded-full bg-brand-gradient px-7 py-3 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
        >
          Me contacter
        </a>
        <a
          href="#projets"
          className="rounded-full border border-line px-7 py-3 text-sm font-medium text-text transition-colors hover:border-accent"
        >
          Voir les projets
        </a>
      </div>

      <div className="mx-auto mt-14 flex h-40 w-40 items-center justify-center rounded-full bg-brand-gradient text-4xl font-bold text-white shadow-lg md:h-48 md:w-48">
        NC
      </div>
    </section>
  );
}
