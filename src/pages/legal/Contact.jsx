import React, { useState } from "react";
import Footer from "../../components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:devnoxinc@gmail.com?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(
      `Nom : ${form.name}\nEmail : ${form.email}\n\nMessage :\n${form.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact</h1>

        <p className="mb-10 text-center text-slate-600 dark:text-slate-300">
          Un projet d'automatisation, de bot ou d'application en tête ? Écrivez-moi,
          j'y répondrai rapidement.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white dark:bg-slate-800 shadow-lg rounded-xl p-8 space-y-5 border border-slate-200 dark:border-slate-700"
        >
          <div>
            <label className="block mb-1 font-medium">Nom complet</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border border-slate-300 dark:border-slate-600 bg-transparent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Votre nom"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Adresse email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-slate-300 dark:border-slate-600 bg-transparent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Sujet</label>
            <input
              type="text"
              name="subject"
              required
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-slate-300 dark:border-slate-600 bg-transparent rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Sujet du message"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              required
              rows="5"
              value={form.message}
              onChange={handleChange}
              className="w-full border border-slate-300 dark:border-slate-600 bg-transparent rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Votre message..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Envoyer le message
          </button>
        </form>

        <p className="text-center mt-8 font-semibold">📧 devnoxinc@gmail.com</p>
        <p className="text-center mt-1 text-slate-500">Telegram @Noxmodai · WhatsApp +224 623 75 29 38</p>
      </div>

      <Footer />
    </>
  );
}
