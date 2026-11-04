import React, { useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { articles } from "../data/articles";

export default function Blog() {
  const navigate = useNavigate();
  const refs = useRef([]);

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
            <p className="font-mono text-sm text-primary">bientôt disponible</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Les prochains articles sur l'automatisation, le DevOps et les bots
              apparaîtront ici dès leur publication.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {articles.map((article, i) => (
              <div
                key={article.id}
                ref={(el) => (refs.current[i] = el)}
                onClick={() => navigate(`/blog/${article.slug}`)}
                className="cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-3xl shadow hover:shadow-xl transition"
              >
                <img src={article.image} className="rounded-xl mb-4 w-full h-48 object-cover" alt={article.title} />
                <h2 className="text-2xl font-bold">{article.title}</h2>
                <p className="text-slate-500">{article.excerpt}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
