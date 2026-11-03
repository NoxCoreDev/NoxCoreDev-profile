import { GitHubIcon, YouTubeIcon, InstagramIcon, FacebookIcon, LinkedInIcon, XIcon } from "./icons";

const channels = [
  { label: "Email", value: "devnoxinc@gmail.com", href: "mailto:devnoxinc@gmail.com" },
  { label: "Telegram", value: "@Noxmodai", href: "https://t.me/Noxmodai" },
  { label: "WhatsApp", value: "+224 623 75 29 38", href: "https://wa.me/224623752938" },
];

export const socials = [
  { label: "X", href: "https://www.x.com/NoxPrimeeeinc", Icon: XIcon },
  { label: "YouTube", href: "https://youtube.com/@noxcoredev?si=YGqUJHTXHkSHr8lm", Icon: YouTubeIcon },
  { label: "Instagram", href: "https://www.instagram.com/noxprimeeeinc?vrfl=NmM3ZWFsd2t3cXdm", Icon: InstagramIcon },
  { label: "GitHub", href: "https://github.com/NoxCoreDev", Icon: GitHubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/NoxCoreDev", Icon: LinkedInIcon },
  { label: "Facebook", href: "https://www.facebook.com/share/1VZrh6qJQD", Icon: FacebookIcon },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-surface2/60">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          Contact Me
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Un projet d&apos;automatisation, de bot ou d&apos;application en tête ? Écrivez-moi,
          j&apos;adorerais en discuter.
        </p>

        <div className="mx-auto mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-line bg-surface p-5 shadow-sm transition-colors hover:border-accent"
            >
              <p className="font-mono text-xs text-muted">{c.label}</p>
              <p className="mt-2 break-words text-sm font-semibold">{c.value}</p>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
