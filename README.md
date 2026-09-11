# pooja.monitor 🟢

Pooja Singh's personal site — a personal observability dashboard, minus the incidents.

Built with **Next.js (App Router) + TypeScript**, styled with hand-rolled CSS, and ready to deploy on **Vercel**.

## What's fun about it

- **Fake resource header** — status: healthy, region: Seattle, uptime: 8+ yrs in production
- **A working KQL playground** — type `help` in the query bar. Navigation commands scroll the page, `coffee`/`whoami` are canned wit, and `uname` / `date` / `uptime` / `ls` / `df` are **real commands executed in a Vercel Sandbox** (see below). Easter eggs included — try `sudo hire pooja`.
- **Live log tail** pinned to the bottom of the page (fully fake, fully charming)
- **404 page** with its own trace ID

## The terminal (Vercel Sandbox)

The query bar is backed by `POST /api/kql` (`app/api/kql/route.ts`):

- `whoami`, `uname`, `date`, `uptime`, `ls`, `df` spin up a real [Vercel Sandbox](https://vercel.com/docs/sandbox) microVM, run the command, and return stdout + a meta line like `▸ real vercel sandbox · iad1 · exit 0 · 2.1s ⚡`.
- **Auth on Vercel:** automatic via OIDC — nothing to configure.
- **Auth locally:** run `vercel link` and `vercel env pull`, or set `VERCEL_TOKEN` (see `.env.example`).
- **No auth?** Real commands gracefully fall back to canned answers instead of breaking.
- Everything else (`help`, `coffee`, `sudo hire pooja`) is canned and free.

Sandbox settings (name, 60s timeout, 1 vCPU, non-persistent) live in the route if you want to tune cost.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy to Vercel

1. Push this repo to GitHub (already done if you're reading this there).
2. Go to [vercel.com/new](https://vercel.com/new) and **import** this repo.
3. Framework preset auto-detects **Next.js** — click **Deploy**. No env vars needed.

## Editing content

All site content lives in one place: [`lib/data.ts`](lib/data.ts)

- `projects` — the project cards. When a "deploying" project gets its Vercel URL, add `liveUrl` and flip `status` to `"live"`.
- `workAreas` — the four work-area cards (kept deliberately vague on purpose).
- `rotatingRoles`, `logLines`, `nextUpChips` — the fun bits.
- `links` — email / GitHub / LinkedIn.

Easter-egg commands live in `components/KqlBar.tsx` if you want to add more.

## Structure

```
app/            layout, page, 404, favicon (SVG heartbeat)
app/api/kql/    query-bar endpoint — canned wit + real Vercel Sandbox commands
components/     Nav, Hero, StatusHeader, KqlBar, Work, Projects, NextUp, Footer, LogBar
lib/data.ts     all content, typed
```
