import { nextUpChips } from "@/lib/data";

export default function NextUp() {
  return (
    <section>
      <div className="kicker purple">// on the roadmap</div>
      <div className="nextup">
        <p>
          The honest query result: <em>we&apos;ll do more of all this.</em> More
          agents, more evals, more ways to make Azure collect, visualize, and
          test itself. If it&apos;s observability × AI × fun, it&apos;s on the
          board.
        </p>
        <div className="chip-cloud">
          {nextUpChips.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
