export default function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-16 md:grid-cols-[1.1fr_0.9fr] md:pb-28 md:pt-24">
      <div className="flex flex-col justify-center">
        <p className="font-mono text-sm text-ok">● systèmes en ligne</p>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
          Des bots qui gèrent leurs utilisateurs. Des déploiements qui se lancent seuls.
        </h1>
        <p className="mt-6 max-w-measure text-base leading-relaxed text-muted md:text-lg">
          Je suis Othman, alias NoxCoreDev — développeur autodidacte spécialisé en
          automatisation et DevOps. Je construis des bots, des pipelines de déploiement
          et des applications web qui continuent de tourner sans supervision.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#projets"
            className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent2"
          >
            Voir les projets
          </a>
          <a
            href="#contact"
            className="rounded-md border border-line px-5 py-3 text-sm font-medium text-text transition-colors hover:border-accent2"
          >
            Me contacter
          </a>
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-full overflow-hidden rounded-lg border border-line bg-surface shadow-[0_0_0_1px_rgba(108,99,255,0.08)]">
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="ml-3 font-mono text-xs text-muted">deploy.sh</span>
          </div>
          <div className="space-y-2 px-5 py-6 font-mono text-[13px] leading-relaxed text-muted">
            <p className="type-line text-text">$ noxcore deploy --service whatsapp-bot</p>
            <p className="text-ok">✓ session initialisée</p>
            <p className="text-ok">✓ webhook connecté</p>
            <p>→ surveillance des parrainages…</p>
            <p>→ classement mis à jour (top 10)</p>
            <p className="text-ok">✓ déploiement terminé en 4.2s</p>
            <p className="text-text">
              $ <span className="blink">▌</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
