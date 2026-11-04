import React from "react";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-3xl mx-auto px-6 py-16 leading-relaxed">
        <h1 className="text-3xl font-bold mb-8">Politique de confidentialité</h1>

        <p className="mb-4">
          Cette politique décrit comment <strong>NoxCoreDev</strong> (Othman)
          traite les informations lorsque vous visitez ce site personnel.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Données collectées</h2>
        <p className="mb-4">
          Ce site ne collecte aucune donnée personnelle automatiquement. Les
          seules informations transmises le sont volontairement, lorsque vous
          utilisez le formulaire de contact (nom, email, message), envoyées
          directement par email.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Cookies</h2>
        <p className="mb-4">
          Ce site n'utilise pas de cookies de suivi ni d'outils publicitaires.
          Une préférence de thème (clair/sombre) peut être stockée localement
          dans votre navigateur.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Vos droits</h2>
        <p className="mb-4">
          Vous pouvez à tout moment demander la suppression d'un message que
          vous m'avez envoyé en me contactant directement.
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
