import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import ArticleSocialActions from "./ArticleSocialActions";
import { usePreferences } from "../context/PreferencesContext";
import { getArticleReadingMinutes } from "../data/articles";

function formatDate(value, language) {
  return new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default function ArticleCards({ posts }) {
  const { language, t } = usePreferences();

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((article) => {
        const localized = article[language] || article.fr;
        const minutes = getArticleReadingMinutes(localized);

        return (
          <article
            key={article.id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
          >
            <Link
              to={`/blog/${article.slug}`}
              aria-label={`${t("blog.readPost")}: ${localized.title}`}
              className="relative block aspect-[16/9] overflow-hidden bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <img
                src={article.cover}
                alt={localized.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute left-4 top-4 rounded-md bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow">
                {localized.category}
              </span>
            </Link>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                <time dateTime={article.publishedAt} className="inline-flex items-center gap-1.5">
                  <CalendarDays size={14} aria-hidden="true" />
                  {formatDate(article.publishedAt, language)}
                </time>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 size={14} aria-hidden="true" />
                  {minutes} {t("blog.minutesRead")}
                </span>
              </div>

              <h2 className="text-xl font-bold leading-snug text-slate-900 dark:text-white">
                <Link to={`/blog/${article.slug}`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                  {localized.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {localized.excerpt}
              </p>

              <div className="mt-4 flex flex-wrap gap-2" aria-label={t("blog.tagsLabel")}>
                {localized.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to={`/blog/${article.slug}`}
                className="mt-5 inline-flex w-fit items-center gap-2 font-semibold text-primary hover:gap-3 transition-all"
              >
                {t("blog.readPost")} <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <ArticleSocialActions
                article={article}
                title={localized.title}
                description={localized.excerpt}
                compact
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
