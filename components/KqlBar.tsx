"use client";

import { useState, type KeyboardEvent } from "react";
import { links } from "@/lib/data";

type OutLine = { text: string; cls?: string };

const HELP: OutLine[] = [
  { text: "available commands", cls: "dim" },
  { text: "  help          → this menu", cls: "sky" },
  { text: "  work          → what I do (vaguely, on purpose)" },
  { text: "  projects      → shipped & shipping" },
  { text: "  contact       → say hi" },
  { text: "  whoami        → identity query" },
  { text: "  coffee        → check the coffee metric" },
  { text: "  logs          → peek at the live tail" },
  { text: "  clear         → clean slate", cls: "dim" },
];

function runCommand(raw: string): { lines: OutLine[]; scrollTo?: string; mailto?: boolean } {
  const cmd = raw.trim().toLowerCase();

  switch (cmd) {
    case "help":
    case "?":
      return { lines: [...HELP, { text: "" }, { text: "query executed in 42ms ☁", cls: "dim" }] };
    case "work":
    case "about":
      return {
        lines: [
          { text: "joining tables: experience ⟕ skills ...", cls: "dim" },
          { text: "4 rows returned → navigating to //what I actually do", cls: "ok" },
        ],
        scrollTo: "work",
      };
    case "projects":
    case "repos":
      return {
        lines: [
          { text: "summarize projects by fun = desc ...", cls: "dim" },
          { text: "4 projects found → scrolling you there", cls: "ok" },
        ],
        scrollTo: "projects",
      };
    case "contact":
    case "email":
    case "hire":
      return {
        lines: [
          { text: "rendering contact card ...", cls: "dim" },
          { text: "1 mailbox found → scrolling you there", cls: "ok" },
        ],
        scrollTo: "contact",
      };
    case "whoami":
      return {
        lines: [
          { text: "singhpoo", cls: "ok" },
          { text: "senior software engineer · microsoft" },
          { text: "likes: kql, agents, dashboards · dislikes: flaky tests" },
          { text: "query executed in 8ms", cls: "dim" },
        ],
      };
    case "coffee":
    case "☕":
      return {
        lines: [
          { text: "coffee_metric | summarize level = percentile(caffeine, 90)", cls: "dim" },
          { text: "☕ level: healthy (3 cups) · alert rule: refill if < 1", cls: "ok" },
        ],
      };
    case "logs":
      return {
        lines: [
          { text: "tailing LogBar ... it's the bar at the bottom of your screen 👀", cls: "sky" },
        ],
      };
    case "sudo hire pooja":
      return {
        lines: [
          { text: "[sudo] access granted ✔", cls: "ok" },
          { text: "opening mail client ... great decision", cls: "ok" },
        ],
        mailto: true,
      };
    case "vercel":
      return {
        lines: [
          { text: "▲ everything I ship lives on Vercel — this site included", cls: "sky" },
          { text: "build time: seconds. fun level: 100%", cls: "dim" },
        ],
      };
    case "clear":
    case "cls":
      return { lines: [] };
    case "":
      return { lines: [{ text: "type something :) (try `help`)", cls: "dim" }] };
    default:
      return {
        lines: [
          { text: `KqlSyntaxError: '${raw.trim()}' is not a recognized command.`, cls: "err" },
          { text: "to be fair, I'm a website, not a real query engine. try `help`", cls: "dim" },
        ],
      };
  }
}

export default function KqlBar() {
  const [value, setValue] = useState("");
  const [out, setOut] = useState<OutLine[]>([]);

  const submit = (cmd: string) => {
    const result = runCommand(cmd);
    if (cmd.trim().toLowerCase() === "clear" || cmd.trim().toLowerCase() === "cls") {
      setOut([]);
    } else {
      setOut((prev) => [
        ...prev,
        { text: `> ${cmd.trim()}`, cls: "sky" },
        ...result.lines,
      ]);
    }
    if (result.scrollTo) {
      document
        .getElementById(result.scrollTo)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (result.mailto) {
      window.location.href = `mailto:${links.email}?subject=Let%27s%20build%20something%20fun`;
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit(value);
      setValue("");
    }
  };

  return (
    <div className="kql-wrap rise d3">
      <div className="kql-titlebar" aria-hidden>
        <span className="tl" style={{ background: "#ff5f57" }} />
        <span className="tl" style={{ background: "#febc2e" }} />
        <span className="tl" style={{ background: "#28c840" }} />
        <span className="file">pooja.monitor/logs — query editor (playground edition)</span>
      </div>
      <div className="kql-input-row">
        <span className="prompt">&gt;</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          placeholder="run a query on me — type help and press Enter"
          aria-label="KQL playground query bar"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      {out.length > 0 && (
        <div className="kql-out">
          {out.slice(-40).map((l, i) => (
            <div key={i} className={`line ${l.cls ?? ""}`}>
              {l.text}
            </div>
          ))}
        </div>
      )}
      <div className="kql-chips">
        {["help", "whoami", "work", "projects", "coffee", "sudo hire pooja"].map((c) => (
          <button key={c} onClick={() => submit(c)} type="button">
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
