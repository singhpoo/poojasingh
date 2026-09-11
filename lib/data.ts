export type ProjectStatus = "live" | "deploying";

export type Project = {
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  status: ProjectStatus;
};

export const projects: Project[] = [
  {
    name: "Audentic",
    emoji: "🎙️",
    tagline: "Voice AI, one API away",
    description:
      "A real-time Voice AI platform that wraps speech recognition, LLMs, and TTS into a single end-to-end model. Comes with an MCP server and tools that create themselves from plain-English prompts.",
    tags: ["Voice AI", "LLM", "MCP", "Platform"],
    liveUrl: "https://audentic.io",
    status: "live",
  },
  {
    name: "Detextit.3D",
    emoji: "🧊",
    tagline: "Prompt → editable 3D scene",
    description:
      "A Blender plugin that turns natural-language prompts into fully editable 3D scenes, with automated asset indexing for rapid prototyping. Describe it, render it, tweak it.",
    tags: ["LLM", "3D", "Blender", "Plugin"],
    liveUrl: "https://detextit-home.vercel.app",
    status: "live",
  },
  {
    name: "CBT Agents",
    emoji: "🧠",
    tagline: "Agents graded against locked rubrics",
    description:
      "A CBT agent vs. baseline showdown: three locked-rubric task sets, machine-verified debugging, step-level evals — plus 42 recorded runs and a side-by-side dashboard to watch it think.",
    tags: ["Agents", "Evals", "Benchmarks"],
    repoUrl: "https://github.com/singhpoo/CBTAgents",
    status: "deploying",
  },
  {
    name: "Browser Testing Agent",
    emoji: "🧪",
    tagline: "E2E tests that write, heal & replay themselves",
    description:
      "Author browser flows once in plain English, cache them as Playwright, then replay in parallel while overseer agents keep watch. The UI tests itself so you don't have to.",
    tags: ["Playwright", "E2E", "Agents", "TypeScript"],
    repoUrl: "https://github.com/singhpoo/zcode-browser-testing-agent",
    status: "deploying",
  },
];

export type WorkArea = {
  title: string;
  emoji: string;
  blurb: string;
  chip: string;
};

// Deliberately high-level — the details are better over coffee.
export const workAreas: WorkArea[] = [
  {
    title: "Data Collection Rules",
    emoji: "📥",
    blurb:
      "Azure Monitor's plumbing: getting the right telemetry from point A to point B — collected, transformed, delivered. I also build the UX that makes writing these rules feel less like archaeology.",
    chip: "stream: healthy ✅",
  },
  {
    title: "Workbooks",
    emoji: "📊",
    blurb:
      "Interactive dashboards living inside the Azure Portal. And the fun part — teaching AI agents to sketch them for you, conversationally, mid-chat.",
    chip: "charts drawn: ∞",
  },
  {
    title: "Log Analytics",
    emoji: "🔍",
    blurb:
      "Logs, metrics, traces — and enough KQL to be dangerous. Making observability data readable for humans first, and for AI agents a very close second.",
    chip: "kql: 👑",
  },
  {
    title: "E2E Testing Agents",
    emoji: "🤖",
    blurb:
      "An agent that end-to-end tests any Azure UI — navigation, clicks, assertions — so the humans can do literally anything else. It never gets bored, never gets flaky fingers.",
    chip: "human clicks: -100%",
  },
];

export const rotatingRoles = [
  "azure monitor · data collection rules",
  "workbooks & dashboards",
  "log analytics · kql",
  "e2e testing agents",
  "voice ai",
  "agent evals",
  "making azure test itself",
];

export const logLines = [
  "[info]  workbook.rendered — 12 charts, 0 incidents",
  "[info]  dcr.applied — telemetry flowing ☑",
  "[debug] agent.thought — \"should I test this?\" → yes",
  "[trace] e2e.suite.passed — 47/47, zero human clicks",
  "[kql]   requests | where happy == true → 100% match",
  "[info]  agent.healed — flaky test fixed itself (proud?)",
  "[info]  log.analytics — ingesting vibes at 12k events/sec",
  "[trace] copilot.drafted — dashboard from a sentence",
  "[warn]  css.gradients — technically unnecessary, keeping them",
  "[info]  eval.run.complete — hallucination rate: nope",
];

export const nextUpChips = [
  "more agents 🤖",
  "more evals 📏",
  "more voice ai 🎙️",
  "more 3d 🧊",
  "more dashboards 📊",
  "way more tests ✅",
];

export const links = {
  email: "pooja2094@gmail.com",
  github: "https://github.com/singhpoo",
  linkedin: "https://linkedin.com/in/singhpoo",
};
