import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects">
      <div className="kicker sky">// shipped &amp; shipping</div>
      <h2>Side quests, now deploying</h2>
      <p className="section-sub">
        Everything here gets a home on Vercel — two are already live, two are
        mid-deploy. Watch the pills.
      </p>
      <div className="proj-grid">
        {projects.map((p) => (
          <article className="proj-card" key={p.name}>
            <div className="proj-head">
              <span className="name">
                <span aria-hidden>{p.emoji}</span> {p.name}
              </span>
              <span className={`status-pill ${p.status}`}>
                {p.status === "live" ? "● live" : "◌ deploying"}
              </span>
            </div>
            <div className="tagline">{p.tagline}</div>
            <p className="desc">{p.description}</p>
            <div className="tag-row">
              {p.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="proj-links">
              {p.liveUrl ? (
                <a href={p.liveUrl} target="_blank" rel="noreferrer">
                  live ↗
                </a>
              ) : (
                <span className="soon">live demo coming to vercel soon</span>
              )}
              {p.repoUrl && (
                <a className="gh" href={p.repoUrl} target="_blank" rel="noreferrer">
                  github ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
