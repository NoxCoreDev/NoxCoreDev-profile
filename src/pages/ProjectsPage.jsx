import React from "react";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import { projects, author } from "../data/projects";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Projects projects={projects} author={author} />
      <Footer />
    </div>
  );
}
