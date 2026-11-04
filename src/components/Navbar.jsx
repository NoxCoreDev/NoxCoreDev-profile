import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { usePreferences } from "../context/PreferencesContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, theme, toggleTheme, t } = usePreferences();

  const links = [
    { path: "/", label: t("nav.home") },
    { path: "/projects", label: t("nav.projects") },
    { path: "/blog", label: t("nav.blog") },
  ];

  const navLinkClass = ({ isActive }) =>
    `hover:text-primary transition ${
      isActive ? "text-primary font-semibold" : "text-slate-700 dark:text-slate-200"
    }`;

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur border-b border-slate-200 dark:border-slate-700 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center gap-3">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3 shrink-0">
          <img src="/logo-icon.svg" alt="" className="w-10 h-10" />
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              NoxCoreDev
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
              {t("nav.tagline")}
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((link) => (
            <NavLink key={link.path} to={link.path} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:opacity-90 transition"
          >
            {t("nav.contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 p-0.5" role="group" aria-label={t("controls.language")}>
            {["fr", "en"].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                aria-pressed={language === code}
                className={`px-2 py-1 rounded-md text-xs font-semibold transition ${
                  language === code
                    ? "bg-primary text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t("controls.switchToLight") : t("controls.switchToDark")}
            title={theme === "dark" ? t("controls.switchToLight") : t("controls.switchToDark")}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? t("controls.closeMenu") : t("controls.openMenu")}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <NavLink key={link.path} to={link.path} onClick={closeMenu} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={closeMenu}
            className="px-4 py-2 bg-primary text-white rounded-md font-medium text-center"
          >
            {t("nav.contact")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
