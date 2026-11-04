import React from "react";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { usePreferences } from "../../context/PreferencesContext";

export default function PrivacyPolicy() {
  const { t } = usePreferences();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-3xl mx-auto px-6 py-16 leading-relaxed">
        <h1 className="text-3xl font-bold mb-8">{t("privacy.title")}</h1>

        <p className="mb-4">{t("privacy.intro")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">{t("privacy.dataTitle")}</h2>
        <p className="mb-4">{t("privacy.data")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">{t("privacy.cookiesTitle")}</h2>
        <p className="mb-4">{t("privacy.cookies")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">{t("privacy.rightsTitle")}</h2>
        <p className="mb-4">{t("privacy.rights")}</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">{t("privacy.contactTitle")}</h2>
        <p className="font-semibold mb-4">
          📧{" "}
          <a href="mailto:devnoxinc@gmail.com" className="text-primary hover:underline">
            devnoxinc@gmail.com
          </a>
        </p>

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
