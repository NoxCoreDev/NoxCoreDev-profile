import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "scrollreveal";
import { usePreferences } from "../context/PreferencesContext";

export default function Hero() {
  const { t } = usePreferences();

  useEffect(() => {
    ScrollReveal().reveal(".reveal", {
      distance: "50px",
      duration: 1200,
      easing: "ease-out",
      origin: "bottom",
      interval: 150,
      reset: false,
    });
  }, []);

  return (
    <section className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-20 px-6 md:px-12 transition-colors duration-500">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 reveal">
          <div className="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full font-semibold text-sm shadow-sm">
            ● {t("hero.available")}
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            {t("hero.greeting")} <span className="text-primary">Othman</span>
            <br />
            {t("hero.alias")}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("hero.descriptionBefore")}
            <strong className="text-primary">{t("hero.specialty")}</strong>
            {t("hero.descriptionAfter")}
          </p>
        </div>

        <div className="flex justify-center reveal">
          <div className="flex w-full max-w-sm flex-col items-center gap-5">
            <img
              src="/profile.jpg"
              alt={t("hero.profileAlt")}
              className="h-64 w-64 rounded-2xl object-cover shadow-xl"
              width="256"
              height="256"
            />

            <div className="flex w-full flex-col gap-3">
              <a
                href="https://github.com/NoxCoreDev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.68-3.76-1.32-3.76-1.32-.51-1.3-1.24-1.64-1.24-1.64-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.77 2.11 3.38 1.6.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.12 2.95.71.78 1.14 1.77 1.14 2.99 0 4.29-2.62 5.24-5.11 5.51.4.35.75 1.03.75 2.08v3.09c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                </svg>
                <span>{t("hero.github")}</span>
              </a>

              <a
                href="https://xivencore.pages.dev/recruit.html"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-slate-700 dark:hover:bg-slate-900"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M19 8v6m3-3h-6" />
                </svg>
                <span>{t("hero.recruitment")}</span>
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-slate-700 dark:hover:bg-slate-900"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                <span>{t("hero.contact")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
