import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Navbar from "./components/Navbar";
import Article from "./pages/Article";
import ProjectsPage from "./pages/ProjectsPage";

import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import Terms from "./pages/legal/Terms";
import Legal from "./pages/legal/Legal";
import ContactPage from "./pages/legal/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 transition-colors duration-500">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog/:slug" element={<Article />} />
      </Routes>
    </div>
  );
}
