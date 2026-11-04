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

          <div className="flex flex-wrap gap-4 pt-3">
            <Link
              to="/projects"
              className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition"
            >
              🚀 {t("hero.projects")}
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition font-semibold"
            >
              📩 {t("hero.contact")}
            </Link>
          </div>
        </div>

        <div className="flex justify-center reveal">
          <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-all duration-500 hover:scale-105 p-10">
            <img src="/logo.svg" className="w-full h-full object-contain" alt="NoxCoreDev" />
          </div>
        </div>
      </div>
    </section>
  );
}
