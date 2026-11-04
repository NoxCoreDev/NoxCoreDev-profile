import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import {
  FaNodeJs,
  FaJsSquare,
  FaReact,
  FaGithub,
  FaLinux,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiSocketdotio,
  SiVercel,
} from "react-icons/si";
import { usePreferences } from "../context/PreferencesContext";

export default function Skills() {
  const { t } = usePreferences();

  useEffect(() => {
    ScrollReveal().reveal(".skill-chip", {
      distance: "20px",
      duration: 700,
      easing: "ease-out",
      origin: "bottom",
      interval: 50,
      reset: false,
    });
  }, []);

  const skills = [
    { name: "Node.js", Icon: FaNodeJs, color: "text-green-500" },
    { name: "JavaScript", Icon: FaJsSquare, color: "text-yellow-400" },
    { name: "TypeScript", Icon: SiTypescript, color: "text-blue-600" },
    { name: "React", Icon: FaReact, color: "text-blue-400" },
    { name: "Next.js", Icon: SiNextdotjs, color: "text-slate-900 dark:text-white" },
    { name: "Express", Icon: SiExpress, color: "text-slate-700 dark:text-slate-200" },
    { name: "Socket.IO", Icon: SiSocketdotio, color: "text-slate-900 dark:text-white" },
    { name: "Telegram Bot API", Icon: FaTelegram, color: "text-sky-500" },
    { name: "WhatsApp (Baileys)", Icon: FaWhatsapp, color: "text-green-500" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: "text-cyan-500" },
    { name: "GitHub", Icon: FaGithub, color: "text-slate-900 dark:text-white" },
    { name: t("skills.deployment"), Icon: SiVercel, color: "text-slate-900 dark:text-white" },
    { name: "Linux", Icon: FaLinux, color: "text-slate-600 dark:text-slate-300" },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-white dark:bg-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-slate-900 dark:text-slate-100 reveal">
          {t("skills.title")}
        </h2>

        <ul className="flex flex-wrap justify-center gap-3 md:gap-4" aria-label={t("skills.title")}>
          {skills.map(({ name, Icon, color }) => (
            <li
              key={name}
              className="skill-chip inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/70 px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Icon className={`h-5 w-5 shrink-0 ${color}`} aria-hidden="true" focusable="false" />
              <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
