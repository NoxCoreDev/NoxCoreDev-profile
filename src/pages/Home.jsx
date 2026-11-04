import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import ScrollReveal from "scrollreveal";
import Parcours from "../components/Parcours";
import Skills from "../components/Skills";
import { projects, author } from "../data/projects";

export default function Home() {
  useEffect(() => {
    const sr = ScrollReveal({
      distance: "50px",
      duration: 800,
      easing: "ease-in-out",
      origin: "bottom",
      interval: 200,
    });
    sr.reveal("section");
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 transition-colors duration-500">
      <Hero />
      <Parcours />
      <Skills />

      <Projects projects={projects.slice(0, 4)} author={author} showAllLink={true} />

      <Footer />
    </div>
  );
}
