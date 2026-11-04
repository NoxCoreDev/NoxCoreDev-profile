import React from "react";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { usePreferences } from "../../context/PreferencesContext";

export default function Legal() {
  const { t } = usePreferences();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-3xl mx-auto px-6 py-16 leading-relaxed">
        <h1 className="text-3xl font-bold mb-8">{t("legal.title")}</h1>

        <h2 className="text-xl font-semibold mt-8 mb-3">{t("legal.publisherTitle")}</h2>
        <p className="mb-4">{t("legal.publisher")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">{t("legal.contactTitle")}</h2>
        <p className="mb-4">
          📧 devnoxinc@gmail.com
          <br />
          {t("legal.telegram")} : @Noxmodai
          <br />
          {t("legal.whatsapp")} : +224 623 75 29 38
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">{t("legal.hostingTitle")}</h2>
        <p className="mb-4">{t("legal.hosting")}</p>

        <div className="mt-6">
          <Link to="/" className="text-primary hover:underline font-semibold">
            {t("page.back")}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
