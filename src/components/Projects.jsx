import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePreferences } from "../context/PreferencesContext";

export default function Projects({ projects, author, showAllLink = false }) {
  const { t } = usePreferences();

  useEffect(() => {
    const sr = ScrollReveal({
      distance: "50px",
      duration: 1000,
      easing: "ease-in-out",
      origin: "bottom",
      interval: 150,
      reset: false,
    });
    sr.reveal(".project-card");
  }, []);

  return (
    <section
      id="projects"
      className="py-16 max-w-6xl mx-auto px-6 transition-colors duration-500
                 bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100"
    >
      <h2 className="text-3xl font-semibold mb-12 text-center">{t("projects.title")}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => {
          const descriptionKey = `projects.${project.id}.description`;
          const translatedDescription = t(descriptionKey);
          const description = translatedDescription === descriptionKey ? project.desc : translatedDescription;
          const translatedTags = t(`projects.${project.id}.tags`);
          const tags = translatedTags.startsWith("projects.") ? project.tags : translatedTags.split("|");

          return (
            <article
              key={project.id}
              className="project-card rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden
                         bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              {project.image && (
                <a href={project.link} target="_blank" rel="noreferrer" className="block h-40 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={project.image}
                    alt={`${t("projects.previewAlt")} ${project.title}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </a>
              )}

              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                  <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-primary">
                    {project.title}
                  </a>
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag, index) => (
                    <span key={`${tag}-${index}`} className="px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-sm px-4 py-2 rounded border border-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                    {t("projects.view")}
                  </a>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="text-sm px-4 py-2 rounded flex items-center gap-2 border border-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                      <Github size={16} aria-hidden="true" /> {t("projects.openSource")}
                    </a>
                  )}
                  <a href={`mailto:${author.email}`} className="text-sm px-4 py-2 rounded bg-primary text-white hover:opacity-90 transition">
                    {t("projects.contact")}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {showAllLink && (
        <div className="mt-12 flex justify-center">
          <Link
            to="/projects"
            className="flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium hover:scale-105 transition-transform shadow-lg"
          >
            {t("projects.viewAll")} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      )}
    </section>
  );
}
