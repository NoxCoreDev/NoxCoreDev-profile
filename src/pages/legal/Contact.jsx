import React, { useState } from "react";
import Footer from "../../components/Footer";
import { usePreferences } from "../../context/PreferencesContext";

export default function ContactPage() {
  const { t } = usePreferences();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const mailtoLink = `mailto:devnoxinc@gmail.com?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(
      `${t("contact.emailBodyName")}: ${form.name}\n${t("contact.email")}: ${form.email}\n\n${t("contact.emailBodyMessage")}:\n${form.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-6 text-center">{t("contact.title")}</h1>

        <p className="mb-10 text-center text-slate-600 dark:text-slate-300">
          {t("contact.intro")}
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white dark:bg-slate-800 shadow-lg rounded-xl p-8 space-y-5 border border-slate-200 dark:border-slate-700"
        >
          <div>
            <label htmlFor="contact-name" className="block mb-1 font-medium">{t("contact.name")}</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border border-slate-300 dark:border-slate-600 bg-transparent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={t("contact.namePlaceholder")}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block mb-1 font-medium">{t("contact.email")}</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-slate-300 dark:border-slate-600 bg-transparent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={t("contact.emailPlaceholder")}
            />
          </div>

          <div>
            <label htmlFor="contact-subject" className="block mb-1 font-medium">{t("contact.subject")}</label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              required
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-slate-300 dark:border-slate-600 bg-transparent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={t("contact.subjectPlaceholder")}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block mb-1 font-medium">{t("contact.message")}</label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows="5"
              value={form.message}
              onChange={handleChange}
              className="w-full border border-slate-300 dark:border-slate-600 bg-transparent rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={t("contact.messagePlaceholder")}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {t("contact.send")}
          </button>
        </form>

        <p className="text-center mt-8 font-semibold">📧 devnoxinc@gmail.com</p>
        <p className="text-center mt-1 text-slate-500"></p>
      </div>

      <Footer />
    </>
  );
}
