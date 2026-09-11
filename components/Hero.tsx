import StatusHeader from "./StatusHeader";
import RotatingRole from "./RotatingRole";
import KqlBar from "./KqlBar";
import { rotatingRoles, links } from "@/lib/data";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <StatusHeader />
      <h1 className="rise d1">
        Hi, I&apos;m Pooja.
        <br />
        <span className="gradient">
          I make Azure observable — and I teach agents to do the clicking.
        </span>
      </h1>
      <RotatingRole roles={rotatingRoles} />
      <p className="bio rise d2">
        Senior engineer with <strong>8+ years across Microsoft &amp; Visa</strong>,
        currently deep in Azure Monitor — <strong>data collection rules</strong>,{" "}
        <strong>workbooks</strong>, <strong>log analytics</strong> — and building{" "}
        <strong>end-to-end testing agents</strong> that can exercise any Azure UI.
        The fine print of my day job stays mostly on the inside; the fun side
        projects live below.
      </p>
      <div className="cta-row rise d2">
        <a className="btn primary" href="#projects">
          See the projects ↓
        </a>
        <a className="btn ghost" href={`mailto:${links.email}`}>
          Say hi 👋
        </a>
      </div>
      <p className="hero-hint rise d4">
        psst — there&apos;s a query bar below. Type <kbd>help</kbd> and press Enter.
        Yes, it works. No, it&apos;s not real KQL.
      </p>
      <KqlBar />
    </header>
  );
}
