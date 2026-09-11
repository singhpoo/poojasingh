import { links } from "@/lib/data";

export default function Footer() {
  return (
    <footer id="contact">
      <div className="shell">
        <div className="kicker">// ping me</div>
        <h2>Got something fun to build? I respond fast.</h2>
        <div className="contact-row">
          <a className="btn primary" href={`mailto:${links.email}`}>
            {links.email}
          </a>
          <a className="btn ghost" href={links.linkedin} target="_blank" rel="noreferrer">
            linkedin/in/singhpoo ↗
          </a>
          <a className="btn ghost" href={links.github} target="_blank" rel="noreferrer">
            github/singhpoo ↗
          </a>
        </div>
        <div className="footer-meta">
          <span>pooja.monitor v1.0</span>
          <span className="sep">·</span>
          <span>built with next.js + typescript</span>
          <span className="sep">·</span>
          <span>▲ vercel-ready</span>
          <span className="sep">·</span>
          <span>no telemetry was harmed in the making of this site</span>
        </div>
      </div>
    </footer>
  );
}
