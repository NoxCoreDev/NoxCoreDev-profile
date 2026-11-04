import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ArticleCards from "./ArticleCards";
import { articles, getLatestArticles } from "../data/articles";
import { usePreferences } from "../context/PreferencesContext";

export default function LatestArticles() {
  const { t } = usePreferences();
  const latestArticles = getLatestArticles(articles, 3);

  return (
    <section className="bg-slate-50 px-6 py-20 transition-colors dark:bg-slate-950 md:px-12" aria-labelledby="latest-articles-title">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">{t("blog.pageTitle")}</p>
            <h2 id="latest-articles-title" className="text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
              {t("blog.latestTitle")}
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{t("blog.latestDescription")}</p>
          </div>
          <Link to="/blog" className="inline-flex w-fit items-center gap-2 font-semibold text-primary hover:gap-3 transition-all">
            {t("blog.viewAll")} <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <ArticleCards posts={latestArticles} />
      </div>
    </section>
  );
}
