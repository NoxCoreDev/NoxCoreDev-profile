import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { FaNodeJs, FaJsSquare, FaReact, FaGithub, FaLinux, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiExpress, SiSocketdotio, SiVercel } from "react-icons/si";

export default function Skills() {
  useEffect(() => {
    ScrollReveal().reveal(".reveal", {
      distance: "50px",
      duration: 1000,
      easing: "ease-out",
      origin: "bottom",
      interval: 100,
      reset: false,
    });
  }, []);

  const skills = [
    { name: "Node.js", icon: <FaNodeJs className="text-green-500 w-12 h-12" />, desc: "Bots, APIs et scripts d'automatisation" },
    { name: "JavaScript", icon: <FaJsSquare className="text-yellow-400 w-12 h-12" />, desc: "Logique métier et intégrations" },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600 w-12 h-12" />, desc: "Code typé, robuste et maintenable" },
    { name: "React", icon: <FaReact className="text-blue-400 w-12 h-12" />, desc: "Interfaces dynamiques et dashboards" },
    { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white w-12 h-12" />, desc: "Applications web en production" },
    { name: "Express", icon: <SiExpress className="text-slate-700 dark:text-slate-200 w-12 h-12" />, desc: "APIs et serveurs backend" },
    { name: "Socket.IO", icon: <SiSocketdotio className="text-slate-900 dark:text-white w-12 h-12" />, desc: "Communication temps réel" },
    { name: "Telegram Bot API", icon: <FaTelegram className="text-sky-500 w-12 h-12" />, desc: "Bots Telegram et automatisations" },
    { name: "WhatsApp (Baileys)", icon: <FaWhatsapp className="text-green-500 w-12 h-12" />, desc: "Bots WhatsApp multi-session" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500 w-12 h-12" />, desc: "Interfaces propres et responsives" },
    { name: "GitHub", icon: <FaGithub className="text-slate-900 dark:text-white w-12 h-12" />, desc: "Versioning et collaboration" },
    { name: "Déploiement & DevOps", icon: <SiVercel className="text-black dark:text-white w-12 h-12" />, desc: "Hébergement, CI/CD, mise en production" },
    { name: "Linux", icon: <FaLinux className="text-slate-600 dark:text-slate-400 w-12 h-12" />, desc: "Administration serveur et CLI" },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-slate-900 dark:text-slate-100 reveal">
          Compétences
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 text-center shadow-lg reveal hover:translate-y-[-5px] transition"
            >
              <div className="mb-4 flex justify-center">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">{skill.name}</h3>
              <p className="text-slate-600 dark:text-slate-300">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
