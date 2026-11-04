import React, { useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { usePreferences } from "../context/PreferencesContext";
import { articles } from "../data/articles";

export default function Blog() {
  const refs = useRef([]);
  const { language, t } = usePreferences();

  useEffect(() => {
    ScrollReveal().reveal(refs.current, {
      origin: "bottom",
      distance: "30px",
      duration: 800,
      interval: 100,
      opacity: 0,
    });
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-5xl mx-auto p-6 space-y-10 py-16">
        <h1 className="text-5xl md:text-6xl font-black text-center bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          BLOG
        </h1>

        {articles.length === 0 ? (
          <div className="max-w-md mx-auto rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
            <p className="font-mono text-sm text-primary">{t("blog.emptyTitle")}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t("blog.emptyDescription")}</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {articles.map((article, index) => {
              const localized = article[language] || article.fr;
              return (
                <Link
                  key={article.id}
                  ref={(element) => (refs.current[index] = element)}
                  to={`/blog/${article.slug}`}
                  className="block bg-white dark:bg-slate-900 p-6 rounded-3xl shadow hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary transition"
                >
                  {article.image && (
                    <img src={article.image} className="rounded-xl mb-4 w-full h-48 object-cover" alt={localized.title} />
                  )}
                  <p className="text-sm font-semibold text-primary mb-2">{localized.category}</p>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{localized.title}</h2>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">{localized.excerpt}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
