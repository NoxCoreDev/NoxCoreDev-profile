import React from "react";
import Footer from "../components/Footer";
import ArticleCards from "../components/ArticleCards";
import { articles, getLatestArticles } from "../data/articles";
import { usePreferences } from "../context/PreferencesContext";

export default function Blog() {
  const { t } = usePreferences();
  const posts = getLatestArticles(articles, articles.length);

  return (
    <div className="min-h-screen bg-slate-50 transition-colors dark:bg-slate-950">
      <main className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
        <header className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">NoxCoreDev</p>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white md:text-6xl">{t("blog.pageTitle")}</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{t("blog.pageIntro")}</p>
        </header>

        {posts.length > 0 ? (
          <ArticleCards posts={posts} />
        ) : (
          <div className="max-w-md rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
            <p className="font-mono text-sm text-primary">{t("blog.emptyTitle")}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t("blog.emptyDescription")}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
