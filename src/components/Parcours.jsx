import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";

export default function Parcours() {
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
    {
      year: "2024",
      title: "The Beginning — NOX PRIMEEE",
      desc: "Démarrage en solo, passionné par le développement de services intelligents (bots) sur WhatsApp et Telegram.",
    },
    {
      year: "2025",
      title: "The Pro Turn — NoxCoreDev",
      desc: "Environ un an plus tard, entrée sérieuse dans la tech : développement de sites et d'applications sous mon vrai nom, fondation de PRIMEEE CORE.",
    },
    {
      year: "2026",
      title: "Going Deeper, Solo",
      desc: "Sans formation formelle, apprentissage en continu, approfondissement de chaque sujet et intégration de l'IA dans mon flux de travail quotidien.",
    },
    {
      year: "Auj.",
      title: "Still Learning, Every Day",
      desc: "J'approfondis ma connaissance de la tech jour après jour, en construisant des sites, des apps et des outils — l'apprentissage n'est jamais fini.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-slate-100 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-slate-900 dark:text-slate-100 reveal">
          Mon Parcours
        </h2>

        <div className="space-y-12">
          {parcours.map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row items-start gap-6 reveal">
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg md:text-xl">
                {step.year}
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
                  {step.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
