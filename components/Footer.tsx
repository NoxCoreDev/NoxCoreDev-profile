import { socials } from "./Contact";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-sm text-white">
            N
          </span>
          NoxCoreDev
        </div>
        <p className="mt-3 max-w-sm text-sm text-muted">
          Développeur passionné, Automatisation, DevOps, Web, App &amp; AI Developer.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Icon className="h-[16px] w-[16px]" />
            </a>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-text">Navigation</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li><a href="#top" className="hover:text-accent">Accueil</a></li>
              <li><a href="#projets" className="hover:text-accent">Projets</a></li>
              <li><a href="#services" className="hover:text-accent">Services</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-text">Ressources</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li><a href="#blog" className="hover:text-accent">Blog</a></li>
              <li>
                <a href="https://github.com/NoxCoreDev" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  GitHub
                </a>
              </li>
              <li><a href="#contact" className="hover:text-accent">Contact</a></li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} NoxCoreDev — Othman. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
