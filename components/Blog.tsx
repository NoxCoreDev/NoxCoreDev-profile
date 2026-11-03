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
    <section id="blog" className="border-t border-line/60 bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          Blog
        </h2>

        {posts.length === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed border-line p-10 text-center">
            <p className="font-mono text-sm text-muted">
              aucun article publié pour le moment
            </p>
            <p className="mt-2 text-sm text-muted">
              Les prochains articles sur l'automatisation, le DevOps et les bots
              apparaîtront ici dès leur publication.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {posts.map((p) => (
              <a
                key={p.url}
                href={p.url}
                className="rounded-lg border border-line bg-surface p-6 transition-colors hover:border-accent2"
              >
                <p className="font-mono text-xs text-muted">{p.date}</p>
                <h3 className="mt-2 font-display text-lg font-semibold">{p.title}</h3>
                {p.excerpt && (
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
