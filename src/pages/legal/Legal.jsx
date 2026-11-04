import React from "react";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

export default function Legal() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-3xl mx-auto px-6 py-16 leading-relaxed">
        <h1 className="text-3xl font-bold mb-8">Mentions légales</h1>

        <h2 className="text-xl font-semibold mt-8 mb-3">Éditeur du site</h2>
        <p className="mb-4">
          Site personnel édité par Othman, alias <strong>NoxCoreDev</strong>,
          développeur indépendant.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Contact</h2>
        <p className="mb-4">
          📧 devnoxinc@gmail.com
          <br />
          Telegram : @Noxmodai
          <br />
          WhatsApp : +224 623 75 29 38
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Hébergement</h2>
        <p className="mb-4">
          Ce site est destiné à être hébergé sur une plateforme de votre choix
          (Vercel, Netlify, etc.) une fois déployé.
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
