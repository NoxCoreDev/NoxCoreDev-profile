import React from "react";

export default function Footer() {
  const socials = [
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg", url: "https://github.com/NoxCoreDev" },
    { name: "LinkedIn", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg", url: "https://www.linkedin.com/in/NoxCoreDev" },
    { name: "X", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/x.svg", url: "https://www.x.com/NoxPrimeeeinc" },
    { name: "Facebook", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg", url: "https://www.facebook.com/share/1VZrh6qJQD" },
    { name: "Instagram", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg", url: "https://www.instagram.com/noxprimeeeinc?vrfl=NmM3ZWFsd2t3cXdm" },
    { name: "YouTube", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg", url: "https://youtube.com/@noxcoredev?si=YGqUJHTXHkSHr8lm" },
    { name: "Telegram", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/telegram.svg", url: "https://t.me/Noxmodai" },
    { name: "WhatsApp", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/whatsapp.svg", url: "https://wa.me/224623752938" },
  ];

  const quickLinks = [
    { name: "Politique de confidentialité", url: "/privacy-policy" },
    { name: "Conditions d'utilisation", url: "/terms" },
    { name: "Mentions légales", url: "/legal" },
    { name: "Contact", url: "/contact" },
  ];

  return (
    <footer className="bg-white dark:bg-slate-900 border-t mt-16 py-12 text-slate-700 dark:text-slate-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">NoxCoreDev</h2>
            <p className="text-sm leading-relaxed max-w-xs">
              Développeur passionné, Automatisation, DevOps, Web, App &amp; AI Developer.
              Autodidacte, toujours en train d'apprendre.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 uppercase text-xs tracking-wider">
              Navigation
            </h3>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a key={link.name} href={link.url} className="text-sm hover:text-primary transition-colors w-fit">
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 uppercase text-xs tracking-wider">
              Me retrouver
            </h3>
            <div className="flex flex-wrap gap-4">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="hover:scale-110 transition-transform duration-200"
                >
                  <img src={s.icon} alt={s.name} className="w-5 h-5 dark:invert opacity-80 hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} <strong>NoxCoreDev — Othman</strong>. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
