import { workAreas, links } from "@/lib/data";

export default function Work() {
  return (
    <section id="work">
      <div className="kicker">// what I actually do</div>
      <h2>Four tables, always streaming</h2>
      <p className="section-sub">
        Kept intentionally high-level — the detailed row data is better shared
        over coffee.
      </p>
      <div className="card-grid">
        {workAreas.map((w) => (
          <article className="work-card" key={w.title}>
            <div className="emoji" aria-hidden>
              {w.emoji}
            </div>
            <h3>{w.title}</h3>
            <p>{w.blurb}</p>
            <span className="chip">{w.chip}</span>
          </article>
        ))}
      </div>
      <p className="vague-note">
        notice the vagueness? it&apos;s a feature. want the uncensored join?{" "}
        <a href={`mailto:${links.email}`}>ask me directly</a>.
      </p>
    </section>
  );
}
