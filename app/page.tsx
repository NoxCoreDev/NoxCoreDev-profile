import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-ink">
      <Nav />
      <Hero />
      <Journey />
      <Projects />
      <Services />
      <Blog />
      <Contact />
    </main>
  );
}
