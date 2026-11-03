// Ajoutez vos articles ici au fur et à mesure qu'ils sont publiés.
// Exemple :
// { title: "Automatiser un bot WhatsApp avec Baileys", date: "2026-11-01", url: "/blog/baileys-automation" }
export type Post = {
  title: string;
  date: string;
  url: string;
  excerpt?: string;
};

const posts: Post[] = [];

export default function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <h2 className="text-center font-display text-3xl font-bold tracking-tight md:text-4xl">
        Blog
      </h2>

      {posts.length === 0 ? (
        <div className="mx-auto mt-12 max-w-md rounded-2xl border border-dashed border-line bg-surface p-10 text-center">
          <p className="font-mono text-sm text-accent">bientôt disponible</p>
          <p className="mt-2 text-sm text-muted">
            Les prochains articles sur l&apos;automatisation, le DevOps et les bots
            apparaîtront ici dès leur publication.
          </p>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <a
              key={p.url}
              href={p.url}
              className="rounded-2xl border border-line bg-surface p-6 shadow-sm transition-colors hover:border-accent"
            >
              <p className="font-mono text-xs text-muted">{p.date}</p>
              <h3 className="mt-2 font-display text-lg font-bold">{p.title}</h3>
              {p.excerpt && (
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.excerpt}</p>
              )}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
