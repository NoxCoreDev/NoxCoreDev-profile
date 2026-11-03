const channels = [
  { label: "Email", value: "devnoxinc@gmail.com", href: "mailto:devnoxinc@gmail.com" },
  { label: "Telegram", value: "@Noxmodai", href: "https://t.me/Noxmodai" },
  {
    label: "WhatsApp",
    value: "+224 623 75 29 38",
    href: "https://wa.me/224623752938",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
        Contact
      </h2>
      <p className="mt-3 max-w-measure text-sm text-muted">
        Un projet d'automatisation, de bot ou d'application à construire ? Écrivez-moi.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-line bg-surface p-6 transition-colors hover:border-accent2"
          >
            <p className="font-mono text-xs text-muted">{c.label}</p>
            <p className="mt-2 text-sm font-medium">{c.value}</p>
          </a>
        ))}
      </div>

      <footer className="mt-20 border-t border-line/60 pt-6 text-xs text-muted">
        © {new Date().getFullYear()} NoxCoreDev — Othman. Construit avec Next.js.
      </footer>
    </section>
  );
}
