import React from "react";
import { Link } from "react-router-dom";
import { usePreferences } from "../context/PreferencesContext";

export default function Footer() {
  const { t } = usePreferences();
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
    { name: t("footer.privacy"), url: "/privacy-policy" },
    { name: t("footer.terms"), url: "/terms" },
    { name: t("footer.legal"), url: "/legal" },
    { name: t("footer.contact"), url: "/contact" },
  ];

  return (
    <footer className="bg-white dark:bg-slate-900 border-t mt-16 py-12 text-slate-700 dark:text-slate-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">NoxCoreDev</h2>
            <p className="text-sm leading-relaxed max-w-xs">{t("footer.description")}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 uppercase text-xs tracking-wider">
              {t("footer.navigation")}
            </h3>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link key={link.url} to={link.url} className="text-sm hover:text-primary transition-colors w-fit">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 uppercase text-xs tracking-wider">
              {t("footer.findMe")}
            </h3>
            <div className="flex flex-wrap gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="hover:scale-110 transition-transform duration-200"
                >
                  <img src={social.icon} alt="" className="w-5 h-5 dark:invert opacity-80 hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} <strong>NoxCoreDev — Othman</strong>. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
