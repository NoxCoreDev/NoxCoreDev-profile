import React from "react";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-3xl mx-auto px-6 py-16 leading-relaxed">
        <h1 className="text-3xl font-bold mb-8">Conditions d'utilisation</h1>

        <p className="mb-4">
          En consultant ce site, vous acceptez les conditions suivantes.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Contenu du site</h2>
        <p className="mb-4">
          Ce site présente le profil, le parcours et les projets personnels
          d'Othman (NoxCoreDev). Les informations sont fournies à titre
          indicatif et peuvent évoluer sans préavis.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Projets présentés</h2>
        <p className="mb-4">
          Les projets listés sont développés et maintenus de façon
          indépendante. Leur disponibilité n'est pas garantie en continu.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Propriété intellectuelle</h2>
        <p className="mb-4">
          Le contenu de ce site peut être réutilisé librement sous licence
          MIT pour la base de code ; le contenu éditorial (textes, projets,
          identité) reste propre à NoxCoreDev.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Contact</h2>
        <p className="font-semibold mb-4">
          📧{" "}
          <a href="mailto:devnoxinc@gmail.com" className="text-primary hover:underline">
            devnoxinc@gmail.com
          </a>
        </p>

        <div className="mt-6">
          <Link to="/" className="text-primary hover:underline font-semibold">
            ← Retour
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
