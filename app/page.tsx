import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Projects from "@/components/Projects";
import NextUp from "@/components/NextUp";
import Footer from "@/components/Footer";
import LogBar from "@/components/LogBar";

export default function Home() {
  return (
    <>
      <div className="fx" aria-hidden>
        <div className="fx-grid" />
        <div className="fx-glow green" />
        <div className="fx-glow sky" />
        <div className="fx-glow purple" />
      </div>
      <Nav />
      <main className="shell">
        <Hero />
        <Work />
        <Projects />
        <NextUp />
      </main>
      <Footer />
      <LogBar />
    </>
  );
}
