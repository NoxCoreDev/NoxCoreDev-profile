import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, Clock3, Download } from "lucide-react";
import { useState } from "react";
import { Copy } from "lucide-react";
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

function renderInlineCode(text) {
  return String(text).split(/(`[^`]+`)/g).map((part, index) => {
    const isCode = part.startsWith("`") && part.endsWith("`");
    return isCode
      ? <code key={index} className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-900 dark:bg-slate-800 dark:text-slate-100">{part.slice(1, -1)}</code>
      : part;
  });
}

function ArticleCodeBlock({ block, language }) {
  const [copyState, setCopyState] = useState("");
  const copyCode = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(block.code);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono font-semibold text-slate-100">{block.label}</span>
          <span className="rounded bg-slate-800 px-2 py-0.5 text-xs uppercase tracking-wide text-slate-400">{block.language}</span>
        </div>
        <button
          type="button"
          onClick={copyCode}
          aria-label={`${language === "fr" ? "Copier le code" : "Copy code"} : ${block.label}`}
          className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-3 py-1.5 font-semibold text-slate-200 transition hover:border-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          {copyState === "copied" ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
          {copyState === "copied"
            ? (language === "fr" ? "Copié" : "Copied")
            : (language === "fr" ? "Copier" : "Copy")}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-100 sm:p-5"><code>{block.code}</code></pre>
      {copyState === "failed" && (
        <p role="status" className="border-t border-slate-800 px-4 py-2 text-xs text-amber-300">
          {language === "fr" ? "La copie automatique n’est pas disponible dans ce navigateur." : "Clipboard access is unavailable in this browser."}
        </p>
      )}
    </div>
  );
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
              key={article.slug}
              article={article}
              title={localized.title}
              description={localized.excerpt}
              recordView
            />
          </header>

          <figure className="mb-10 overflow-hidden rounded-2xl border border-slate-200 shadow-lg dark:border-slate-800">
            <img
              src={article.cover}
              alt={localized.title}
              className={`w-full ${article.coverAspect === "4:5" ? "aspect-[4/5] object-cover" : article.coverAspect === "portrait" ? "aspect-[9/10] object-cover" : "aspect-[16/9] object-cover"}`}
            />
          </figure>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-lg leading-8 text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:p-8">
            <p className="font-medium leading-8">{renderInlineCode(localized.intro)}</p>
          </div>

          {article.downloadUrl && (
            <div className="mt-6">
              <a
                href={article.downloadUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-bold text-white shadow transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Download size={18} aria-hidden="true" /> {localized.downloadLabel || (language === "fr" ? "Télécharger le ZIP" : "Download ZIP")}
              </a>
            </div>
          )}

          <div className="mt-10 space-y-10">
            {localized.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">{renderInlineCode(section.heading)}</h2>
                <div className="mt-4 space-y-5 text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">
                  {section.paragraphs.map((paragraph, index) => <p key={index}>{renderInlineCode(paragraph)}</p>)}
                </div>
                {section.callout && (
                  <aside className="mt-5 rounded-xl border-l-4 border-primary bg-primary/5 p-5 dark:bg-primary/10">
                    <h3 className="font-bold text-slate-900 dark:text-white">{renderInlineCode(section.callout.title)}</h3>
                    <p className="mt-2 leading-7 text-slate-700 dark:text-slate-300">{renderInlineCode(section.callout.body)}</p>
                  </aside>
                )}
                {section.codeBlocks?.map((block, index) => (
                  <ArticleCodeBlock key={`${block.label}-${index}`} block={block} language={language} />
                ))}
                {section.sources?.length > 0 && (
                  <aside className="mt-5 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <h3 className="font-bold text-slate-900 dark:text-white">{language === "fr" ? "Sources officielles" : "Official sources"}</h3>
                    <ul className="mt-3 space-y-2">
                      {section.sources.map((source) => (
                        <li key={source.href}>
                          <a
                            href={source.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-primary underline-offset-4 hover:underline"
                          >
                            {source.label[language] || source.label.fr}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}
                {section.bullets && (
                  <ul className="mt-5 space-y-3 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 leading-7 text-slate-700 dark:text-slate-300">
                        <Check size={18} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                        <span>{renderInlineCode(bullet)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.ending && <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">{renderInlineCode(section.ending)}</p>}
              </section>
            ))}
          </div>

          <aside className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 dark:bg-primary/10 sm:p-8">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{t("blog.takeaways")}</h2>
            <ul className="mt-4 space-y-3">
              {localized.takeaways.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-7 text-slate-700 dark:text-slate-200">
                  <ArrowUpRight size={18} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                  <span>{renderInlineCode(item)}</span>
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
