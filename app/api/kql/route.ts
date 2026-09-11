import { NextResponse } from "next/server";
import { Sandbox } from "@vercel/sandbox";

export const runtime = "nodejs";
export const maxDuration = 60;

export type KqlLine = { text: string; cls?: string };

type KqlResponse = {
  lines: KqlLine[];
  /** e.g. "real vercel sandbox · iad1 · exit 0 · 2.1s ⚡" */
  meta?: string;
};

// Playful responses — no sandbox needed.
const canned: Record<string, KqlLine[]> = {
  help: [
    { text: "available commands", cls: "dim" },
    { text: "  help          → this menu", cls: "sky" },
    { text: "  work          → what I do (vaguely, on purpose)" },
    { text: "  projects      → shipped & shipping" },
    { text: "  contact       → say hi" },
    { text: "  whoami        → identity query" },
    { text: "  uname · date · uptime · ls · df → REAL commands, run in a vercel sandbox ⚡" },
    { text: "  coffee        → check the coffee metric" },
    { text: "  clear         → clean slate", cls: "dim" },
  ],
  coffee: [
    { text: "coffee_metric | summarize level = percentile(caffeine, 90)", cls: "dim" },
    { text: "☕ level: healthy (3 cups) · alert rule: refill if < 1", cls: "ok" },
  ],
  logs: [
    { text: "tailing ... it's the bar at the bottom of your screen 👀", cls: "sky" },
  ],
  vercel: [
    { text: "▲ everything I ship lives on Vercel — this site included", cls: "sky" },
    { text: "build time: seconds. fun level: 100%", cls: "dim" },
  ],
  "sudo hire pooja": [
    { text: "[sudo] access granted ✔", cls: "ok" },
    { text: "opening mail client ... great decision", cls: "ok" },
  ],
};

// Real shell commands — executed inside an actual Vercel Sandbox.
const real: Record<string, { cmd: string; args?: string[] }> = {
  whoami: { cmd: "whoami" },
  uname: { cmd: "uname", args: ["-a"] },
  date: { cmd: "date" },
  uptime: { cmd: "uptime" },
  ls: { cmd: "ls", args: ["-la"] },
  df: { cmd: "df", args: ["-h"] },
};

const CANNED_FALLBACK: Record<string, KqlLine[]> = {
  whoami: [
    { text: "pooja (sandboxed alter ego: vercel)", cls: "ok" },
  ],
  uname: [{ text: "Linux pooja-monitor 6.1.x microVM #1 SMP pastel", cls: "ok" }],
  date: [{ text: new Date().toUTCString(), cls: "ok" }],
  uptime: [{ text: "up 8+ years, 0 fun incidents · load average: delightful", cls: "ok" }],
  ls: [{ text: "drwxr-xr-x  agents/  dashboards/  sidequests/  README.md", cls: "ok" }],
  df: [{ text: "Filesystem  Size  Used  Use%  Mounted on / — 99% fun, 1% sleep", cls: "ok" }],
};

function sandboxUnavailableMeta(): string {
  return "canned fallback · sandbox auth missing — deploy on vercel (oidc is automatic) or run `vercel link && vercel env pull`";
}

async function runInSandbox(
  spec: { cmd: string; args?: string[] }
): Promise<KqlResponse> {
  const sandbox = await Sandbox.create({
    name: "pooja-monitor-terminal",
    timeout: 60_000,
    resources: { vcpus: 1 },
    persistent: false,
  });
  try {
    const result = await sandbox.runCommand(spec.cmd, spec.args ?? []);
    const out = (await result.stdout()).trim();
    const err = (await result.stderr()).trim();
    const lines: KqlLine[] = [];
    if (out) lines.push({ text: out, cls: "ok" });
    if (err) lines.push({ text: err, cls: "amber" });
    if (!out && !err) lines.push({ text: "(no output — mysterious)", cls: "dim" });
    return {
      lines,
      meta: `real vercel sandbox · ${sandbox.region} · exit ${result.exitCode} · ${
        result.durationMs ? `${(result.durationMs / 1000).toFixed(1)}s` : "fast"
      } ⚡`,
    };
  } finally {
    await sandbox.stop().catch(() => {});
  }
}

export async function POST(request: Request): Promise<NextResponse<KqlResponse | { error: string }>> {
  let raw = "";
  try {
    const body = (await request.json()) as { command?: string };
    raw = (body.command ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (canned[raw]) {
    return NextResponse.json({ lines: canned[raw], meta: "canned wit · 12ms" });
  }

  if (real[raw]) {
    try {
      return NextResponse.json(await runInSandbox(real[raw]));
    } catch {
      return NextResponse.json({
        lines: CANNED_FALLBACK[raw] ?? [{ text: "(sandbox shrugged)", cls: "dim" }],
        meta: sandboxUnavailableMeta(),
      });
    }
  }

  return NextResponse.json(
    { error: `unknown command: ${raw}` },
    { status: 404 }
  );
}
