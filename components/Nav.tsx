import { links } from "@/lib/data";

export default function Nav() {
  return (
    <nav className="nav">
      <a className="nav-logo" href="#top" aria-label="pooja.monitor home">
        <span className="dot" aria-hidden />
        pooja<span className="tld">.monitor</span>
      </a>
      <div className="nav-links">
        <a href="#work">work</a>
        <a href="#projects">projects</a>
        <a href="#contact">contact</a>
        <a className="hl" href={links.github} target="_blank" rel="noreferrer">
          github ↗
        </a>
      </div>
    </nav>
  );
}
