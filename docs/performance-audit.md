# Portfolio performance audit

Scan date: 2026-09-03. Updated after server-section / OG / favicon pass. Next.js 16 App Router. Goal: faster loads without flattening the look.

## Highest impact remaining

1. Scope or replace `framer-motion` on projects routes (CSS fades / View Transitions).

---

## Open performance issues

### Bundle weight
- `framer-motion` still on `/projects` (`ProjectsExplorer`).
- Chat lucide icons load with the FAB chunk (better than root, not zero).
- `Icons.tsx` remains a large SVG barrel.

### Motion
Homepage float layer (~10 particles via root `ThemeBackground`). Orbit rings on the hero photo still animate unless reduced-motion. Projects route still uses framer enter animations.

### Chat and APIs
FAB is dynamic. `/api/chat` uses a short fallback chain with per-model timeouts. Streaming still open.

### Theme / CLS
Pre-paint script covers wrong-theme flash. Typewriter reserves width. Heavy `backdrop-blur` on nav/cards still costs GPU on phones.

### SEO leftover
Project detail keywords can stay long (page-specific).

`proxy.ts` early-exits unless `Accept: text/markdown`. Cheap, but it still runs on matched navigations.

---

## Solutions still open (keep the look)

### Chat
Streaming responses. Optional local SVGs instead of lucide for the FAB chrome.

### Motion
Prefer CSS fades on projects over framer unless you need gesture physics.

### Images
Optional self-host 2–3 LCP screenshots as WebP.

### Chat API
True streaming (SSE or UI message stream) so the first token feels fast even when a fallback model runs.

---

## Feature ideas

1. Case-study metrics tied to specific projects (the “3× revenue / 70% ops” claims need sources).
2. Streaming chat instead of one JSON blob after multi-model wait.
3. One primary booking CTA (e.g. Cal.com) beside contact.
4. `loading.tsx` for `/projects` and `/projects/[id]`.
5. Screenshot lightbox on detail pages.
6. CV download labeled with an updated month/year.

---

## Content still worth trimming

- Rewrite the Elsie blurb to a concrete outcome.
- Drop subjective skill percentage bars; keep logos and categories.
- Dedupe social/contact clusters (Hero, Contact, Footer, Chat) into one shared link module.
- Archive or delete the large TypeScript migration docs under `docs/` now that the upgrade shipped.
- Pick one canonical skills location (`SKILLS.md` vs `.agents/skills/`).

---

## Suggested order of work

| Priority | Change | Status |
|----------|--------|--------|
| P0 | Lazy chat + compress logo | Done |
| P0 | Single ThemeBackground + reduced-motion | Done |
| P0 | Theme flash script | Done |
| P0 | Chat API shorter chain + timeouts | Done |
| P1 | Shared Reveal / fewer observers | Done |
| P1 | SEO leftovers (keywords, ItemList, twitter card, icons) | Done |
| P1 | Server sections / client islands | Done |
| P1 | Fix remote screenshot sizes | Done (`w1080`) |
| P1 | Wide first screenshots | Done |
| P2 | Drop or scope framer | Open |
| P2 | Branded OG 1200×630 | Done |
| P2 | Cut duplicate hire-me + dead assets + fake SearchAction | Done |
| P2 | Logo WebP + personal 512 | Done |
| P2 | Rounded favicon | Done |
