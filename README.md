# pooja.monitor 🟢

Pooja Singh's personal site — a personal observability dashboard, minus the incidents.

Built with **Next.js (App Router) + TypeScript**, styled with hand-rolled CSS, and ready to deploy on **Vercel**.

## What's fun about it

- **Fake resource header** — status: healthy, region: Seattle, uptime: 8+ yrs in production
- **A working KQL playground** — type `help` in the query bar (it's not real KQL, but it does navigate the site, and it has easter eggs — try `sudo hire pooja` or `coffee`)
- **Live log tail** pinned to the bottom of the page (fully fake, fully charming)
- **404 page** with its own trace ID

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
components/     Nav, Hero, StatusHeader, KqlBar, Work, Projects, NextUp, Footer, LogBar
lib/data.ts     all content, typed
```
