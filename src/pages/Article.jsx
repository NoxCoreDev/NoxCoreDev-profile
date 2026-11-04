import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, Clock3 } from "lucide-react";
import Footer from "../components/Footer";
import ArticleSocialActions from "../components/ArticleSocialActions";
import { blogAuthor, articles, getArticleReadingMinutes } from "../data/articles";
import { usePreferences } from "../context/PreferencesContext";

function formatDate(value, language) {
  return new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default function Article() {
  const { slug } = useParams();
  const { language, t } = usePreferences();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
        <div className="flex-1 max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">{t("article.notFound")}</h1>
          <p className="text-slate-500 mb-6">{t("article.notFoundDescription")}</p>
          <Link to="/blog" className="text-primary hover:underline font-semibold">{t("article.backToBlog")}</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const localized = article[language] || article.fr;
  const readingMinutes = getArticleReadingMinutes(localized);

  return (
    <div className="min-h-screen bg-slate-50 transition-colors dark:bg-slate-950">
      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8 md:py-16">
        <Link to="/blog" className="mb-8 inline-flex items-center gap-2 font-medium text-slate-600 hover:text-primary dark:text-slate-300">
          <ArrowLeft size={17} aria-hidden="true" /> {t("blog.backToList")}
        </Link>

        <article>
          <header className="mb-8">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary dark:bg-primary/20">
              {localized.category}
            </span>
            <h1 className="mt-5 text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl md:text-5xl">
              {localized.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl">{localized.excerpt}</p>

            <div className="mt-7 flex flex-col gap-5 border-y border-slate-200 py-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <img src={blogAuthor.avatar} alt={blogAuthor.brand} className="h-12 w-12 rounded-full border border-slate-200 bg-slate-950 object-cover dark:border-slate-700" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{blogAuthor.name} <span className="font-medium text-slate-500 dark:text-slate-400">· {blogAuthor.brand}</span></p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{blogAuthor.bio[language]}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                <time dateTime={article.publishedAt} className="inline-flex items-center gap-2">
                  <CalendarDays size={16} aria-hidden="true" /> {formatDate(article.publishedAt, language)}
                </time>
                <span className="inline-flex items-center gap-2">
                  <Clock3 size={16} aria-hidden="true" /> {readingMinutes} {t("blog.minutesRead")}
                </span>
              </div>
            </div>
            <ArticleSocialActions
              article={article}
              title={localized.title}
              description={localized.excerpt}
              recordView
            />
          </header>

          <figure className="mb-10 overflow-hidden rounded-2xl border border-slate-200 shadow-lg dark:border-slate-800">
            <img src={article.cover} alt={localized.title} className="aspect-[16/9] w-full object-cover" />
          </figure>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-lg leading-8 text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:p-8">
            <p className="font-medium leading-8">{localized.intro}</p>
          </div>

          <div className="mt-10 space-y-10">
            {localized.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">{section.heading}</h2>
                <div className="mt-4 space-y-5 text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">
                  {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>
                {section.bullets && (
                  <ul className="mt-5 space-y-3 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 leading-7 text-slate-700 dark:text-slate-300">
                        <Check size={18} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.ending && <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">{section.ending}</p>}
              </section>
            ))}
          </div>

          <aside className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 dark:bg-primary/10 sm:p-8">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{t("blog.takeaways")}</h2>
            <ul className="mt-4 space-y-3">
              {localized.takeaways.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-7 text-slate-700 dark:text-slate-200">
                  <ArrowUpRight size={18} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="mt-10 border-t border-slate-200 pt-6 dark:border-slate-800">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t("blog.tagsLabel")}</h2>
            <ul className="flex flex-wrap gap-2">
              {localized.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200">{tag}</li>
              ))}
            </ul>
          </div>

          <div className="mt-12 flex items-center gap-4 rounded-2xl bg-slate-900 p-6 text-white dark:bg-slate-800 sm:p-8">
            <img src={blogAuthor.avatar} alt="" className="h-14 w-14 rounded-full border border-white/20 bg-slate-950 object-cover" />
            <div>
              <p className="text-sm text-slate-300">{t("blog.authorLabel")}</p>
              <p className="mt-1 font-bold">{blogAuthor.name} · {blogAuthor.brand}</p>
              <p className="mt-1 text-sm text-slate-300">{blogAuthor.bio[language]}</p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
