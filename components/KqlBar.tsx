"use client";

import { useState, type KeyboardEvent } from "react";
import { links } from "@/lib/data";
import type { KqlLine } from "@/app/api/kql/route";

// Commands that navigate the page — no server round trip.
const NAV: Record<string, string> = {
  work: "work",
  about: "work",
  projects: "projects",
  repos: "projects",
  contact: "contact",
  email: "contact",
  hire: "contact",
};

const HELP: KqlLine[] = [
  { text: "available commands", cls: "dim" },
  { text: "  help          → this menu", cls: "sky" },
  { text: "  work          → what I do (vaguely, on purpose)" },
  { text: "  projects      → shipped & shipping" },
  { text: "  contact       → say hi" },
  { text: "  whoami        → identity query" },
  { text: "  uname · date · uptime · ls · df → REAL commands, run in a vercel sandbox ⚡" },
  { text: "  coffee        → check the coffee metric" },
  { text: "  clear         → clean slate", cls: "dim" },
];

const PENDING: KqlLine = { text: "▸ executing ...", cls: "dim" };

export default function KqlBar() {
  const [value, setValue] = useState("");
  const [out, setOut] = useState<KqlLine[]>([]);
  const [pending, setPending] = useState(false);

  const push = (lines: KqlLine[]) => setOut((prev) => [...prev, ...lines]);

  // Replace the transient "executing..." line with the real result.
  const settle = (lines: KqlLine[]) =>
    setOut((prev) => {
      const idx = prev.lastIndexOf(PENDING);
      if (idx === -1) return [...prev, ...lines];
      return [...prev.slice(0, idx), ...lines, ...prev.slice(idx + 1)];
    });

  const submit = async (raw: string) => {
    const cmd = raw.trim();
    const lower = cmd.toLowerCase();
    if (!cmd) {
      push([{ text: "type something :) (try `help`)", cls: "dim" }]);
      return;
    }
    push([{ text: `> ${cmd}`, cls: "sky" }]);

    if (lower === "clear" || lower === "cls") {
      setOut([]);
      return;
    }

    if (NAV[lower]) {
      push([
        { text: "joining tables ...", cls: "dim" },
        { text: "rows found → scrolling you there", cls: "ok" },
      ]);
      document
        .getElementById(NAV[lower])
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setPending(true);
    push([PENDING]);
    try {
      const res = await fetch("/api/kql", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ command: cmd }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { lines?: KqlLine[]; meta?: string };
      const lines = data.lines ?? [];
      settle(lines.length ? lines : [{ text: "(nothing came back)", cls: "dim" }]);
      if (data.meta) push([{ text: `▸ ${data.meta}`, cls: "dim" }]);
      if (lower === "sudo hire pooja") {
        window.location.href = `mailto:${links.email}?subject=Let%27s%20build%20something%20fun`;
      }
    } catch {
      settle([
        {
          text: "KqlSyntaxError: the query engine took a coffee break. try again?",
          cls: "err",
        },
      ]);
    } finally {
      setPending(false);
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !pending) {
      submit(value);
      setValue("");
    }
  };

  const chips = [
    "help",
    "whoami",
    "uname",
    "work",
    "projects",
    "coffee",
    "sudo hire pooja",
  ];

  return (
    <div className="kql-wrap rise d3">
      <div className="kql-titlebar" aria-hidden>
        <span className="tl" style={{ background: "#f0a8a8" }} />
        <span className="tl" style={{ background: "#f5d9a8" }} />
        <span className="tl" style={{ background: "#a5e8c5" }} />
        <span className="file">
          pooja.monitor/logs — query editor (sandbox-backed playground)
        </span>
      </div>
      <div className="kql-input-row">
        <span className="prompt">&gt;</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          placeholder="try help — or uname for a real command in a vercel sandbox"
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
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => !pending && submit(c)}
            disabled={pending}
            type="button"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
