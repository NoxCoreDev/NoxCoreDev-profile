import {
  GitHubIcon,
  YouTubeIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  XIcon,
} from "./icons";

const channels = [
  { label: "Email", value: "devnoxinc@gmail.com", href: "mailto:devnoxinc@gmail.com" },
  { label: "Telegram", value: "@Noxmodai", href: "https://t.me/Noxmodai" },
  {
    label: "WhatsApp",
    value: "+224 623 75 29 38",
    href: "https://wa.me/224623752938",
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com/NoxCoreDev", Icon: GitHubIcon },
  {
    label: "YouTube",
    href: "https://youtube.com/@noxcoredev?si=YGqUJHTXHkSHr8lm",
    Icon: YouTubeIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/noxprimeeeinc?vrfl=NmM3ZWFsd2t3cXdm",
    Icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1VZrh6qJQD",
    Icon: FacebookIcon,
  },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/NoxCoreDev", Icon: LinkedInIcon },
  { label: "X", href: "https://www.x.com/NoxPrimeeeinc", Icon: XIcon },
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

      <div className="mt-8 flex flex-wrap gap-3">
        {socials.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-accent2 hover:text-text"
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        ))}
      </div>

      <footer className="mt-20 border-t border-line/60 pt-6 text-xs text-muted">
        © {new Date().getFullYear()} NoxCoreDev — Othman. Construit avec Next.js.
      </footer>
    </section>
  );
}
