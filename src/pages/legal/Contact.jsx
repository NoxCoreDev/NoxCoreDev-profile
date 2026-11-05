import React, { useState } from "react";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import Footer from "../../components/Footer";
import { usePreferences } from "../../context/PreferencesContext";
import { Link } from "react-router-dom";

const requestTypes = ["collaboration", "project", "support", "partnership", "other"];
const fieldClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

const platforms = [
  { id: "email", labelKey: "contact.platformEmail", Icon: Mail },
  { id: "whatsapp", labelKey: "contact.platformWhatsApp", Icon: SiWhatsapp },
  { id: "telegram", labelKey: "contact.platformTelegram", Icon: SiTelegram },
];

export default function ContactPage() {
  const { t } = usePreferences();
  const [form, setForm] = useState({
    name: "",
    email: "",
    requestType: "collaboration",
    platform: "email",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestLabel = t(`contact.type.${form.requestType}`);
    const subject = `${t("contact.subjectPrefix")} ${requestLabel} — ${form.name}`;
    const draft = [
      t("contact.draftGreeting"),
      "",
      `${t("contact.draftLead")} ${requestLabel.toLowerCase()}.`,
      "",
      form.message,
      "",
      `${t("contact.draftEmail")}: ${form.email}`,
      "",
      t("contact.draftSignoff"),
      form.name,
    ].join("\n");

    const encodedDraft = encodeURIComponent(draft);
    const encodedSubject = encodeURIComponent(subject);
    const destinations = {
      email: `mailto:devnoxinc@gmail.com?subject=${encodedSubject}&body=${encodedDraft}`,
      whatsapp: `https://wa.me/224623752938?text=${encodedDraft}`,
      telegram: `https://t.me/Noxmodai?text=${encodedDraft}`,
    };

    window.location.href = destinations[form.platform];
  };

  return (
    <>
      <main className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-gradient-to-b from-indigo-50/80 via-white to-white dark:from-indigo-950/30 dark:via-slate-900 dark:to-slate-900" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-28 right-[-5rem] -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <Link
            to="/"
            className="mb-7 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {t("contact.backHome")}
          </Link>
          <header className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-sm dark:bg-slate-800/80">
              {t("contact.eyebrow")}
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              {t("contact.title")}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
              {t("contact.intro")}
            </p>
          </header>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-800 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <fieldset>
                <legend className="sr-only">{t("contact.platformLabel")}</legend>
                <div className="flex items-center justify-center gap-3">
                  {platforms.map(({ id, labelKey, Icon }) => (
                    <label
                      key={id}
                      title={t(labelKey)}
                      className={`cursor-pointer rounded-2xl border p-4 transition focus-within:ring-4 focus-within:ring-primary/20 ${
                        form.platform === id
                          ? "border-primary bg-indigo-50 text-primary ring-2 ring-primary/10 dark:bg-indigo-950/40"
                          : "border-slate-200 bg-white text-slate-500 hover:border-primary/50 hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="platform"
                        value={id}
                        checked={form.platform === id}
                        onChange={handleChange}
                        aria-label={t(labelKey)}
                        className="sr-only"
                      />
                      <Icon size={26} aria-hidden="true" />
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">{t("contact.name")}</label>
                  <input
                    id="contact-name"
                    autoComplete="name"
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className={fieldClassName}
                    placeholder={t("contact.namePlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">{t("contact.email")}</label>
                  <input
                    id="contact-email"
                    autoComplete="email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className={fieldClassName}
                    placeholder={t("contact.emailPlaceholder")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-request-type" className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">{t("contact.requestType")}</label>
                <select
                  id="contact-request-type"
                  name="requestType"
                  required
                  value={form.requestType}
                  onChange={handleChange}
                  className={fieldClassName}
                >
                  {requestTypes.map((type) => (
                    <option key={type} value={type}>{t(`contact.type.${type}`)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">{t("contact.message")}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  className={`${fieldClassName} resize-y`}
                  placeholder={t("contact.messagePlaceholder")}
                />
              </div>

              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">{t("contact.prefillNote")}</p>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-primary/25"
              >
                {t("contact.send")}
                <ArrowUpRight size={18} aria-hidden="true" />
              </button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
