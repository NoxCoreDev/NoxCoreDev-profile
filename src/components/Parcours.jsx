import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { usePreferences } from "../context/PreferencesContext";

export default function Parcours() {
  const { t } = usePreferences();

  useEffect(() => {
    ScrollReveal().reveal(".reveal", {
      distance: "50px",
      duration: 1000,
      easing: "ease-out",
      origin: "bottom",
      interval: 150,
      reset: false,
    });
  }, []);

  const parcours = [
    { year: "2024", key: "2024" },
    { year: "2025", key: "2025" },
    { year: "2026", key: "2026" },
    { year: t("timeline.now.year"), key: "now" },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-slate-100 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-slate-900 dark:text-slate-100 reveal">
          {t("timeline.title")}
        </h2>

        <div className="space-y-12">
          {parcours.map((step) => (
            <div key={step.key} className="flex flex-col md:flex-row items-start gap-6 reveal">
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg md:text-xl">
                {step.year}
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
                  {t(`timeline.${step.key}.title`)}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                  {t(`timeline.${step.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
