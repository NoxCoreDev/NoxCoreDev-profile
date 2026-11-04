import React from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { articles } from "../data/articles";

export default function Article() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
        <div className="flex-1 max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Article introuvable</h1>
          <p className="text-slate-500 mb-6">
            Cet article n'existe pas encore ou a été déplacé.
          </p>
          <Link to="/blog" className="text-primary hover:underline font-semibold">
            ← Retour au blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-sm text-primary font-semibold">{article.category}</p>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 mb-6">{article.title}</h1>
        {article.image && (
          <img src={article.image} alt={article.title} className="rounded-xl mb-8 w-full object-cover" />
        )}
        <div className="prose dark:prose-invert max-w-none">{article.content}</div>

        <Link to="/blog" className="inline-block mt-10 text-primary hover:underline font-semibold">
          ← Retour au blog
        </Link>
      </article>
      <Footer />
    </div>
  );
}
