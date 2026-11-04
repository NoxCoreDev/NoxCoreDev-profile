import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { MessageCircle, Send } from "lucide-react";
import { usePreferences } from "../context/PreferencesContext";

const skillGroups = [
  {
    title: "skills.categories.languages",
    items: [
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
    ],
  },
  {
    title: "skills.categories.frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs", invertInDark: true },
      { name: "Tailwind CSS", icon: "tailwindcss" },
    ],
  },
  {
    title: "skills.categories.backend",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express", invertInDark: true },
      { name: "Socket.IO", icon: "socketio", invertInDark: true },
    ],
  },
  {
    title: "skills.categories.messaging",
    items: [
      { name: "Telegram Bot API", Icon: Send },
      { name: "WhatsApp (Baileys)", Icon: MessageCircle },
    ],
  },
  {
    title: "skills.categories.devops",
    items: [
      { name: "GitHub", icon: "github", invertInDark: true },
      { name: "Vercel", icon: "vercel", invertInDark: true },
      { name: "Linux", icon: "linux" },
    ],
  },
];

export default function Skills() {
  const { t } = usePreferences();

  useEffect(() => {
    ScrollReveal().reveal(".skill-category-card", {
      distance: "18px",
      duration: 650,
      easing: "ease-out",
      origin: "bottom",
      interval: 70,
      reset: false,
    });
  }, []);

  return (
    <section className="bg-white px-6 py-20 transition-colors dark:bg-slate-800 md:px-12" aria-labelledby="skills-title">
      <div className="mx-auto max-w-6xl">
        <h2 id="skills-title" className="mb-10 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-100 md:text-4xl">
          {t("skills.title")}
        </h2>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label={t("skills.title")}>
          {skillGroups.map((group) => (
            <section key={group.title} className="skill-category-card rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 sm:p-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-primary">{t(group.title)}</h3>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {group.items.map(({ name, icon, Icon, invertInDark }) => (
                  <li key={name} className="flex min-h-16 items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900">
                      {icon ? (
                        <img
                          src={`/icons/skills/${icon}-original.svg`}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          className={`h-6 w-6 object-contain ${invertInDark ? "dark:invert" : ""}`}
                        />
                      ) : (
                        <Icon className="h-5 w-5 text-primary" aria-hidden="true" focusable="false" />
                      )}
                    </span>
                    <span className="text-sm font-semibold leading-snug text-slate-800 dark:text-slate-100">{name === "Vercel" ? t("skills.deployment") : name}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
