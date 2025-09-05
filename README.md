
# QData Learning Suite (Vite + React + TypeScript)

An interactive, self-contained training suite to teach QData's **Two-Speed × Three Product Lines** model.

> All examples are **fabricated for training**. Replace `/src/data/*.json` with real content anytime.

## Modules

- **Market Explorer** — timeline + reality-check quiz (success vs failure drivers)
- **Two-Speed Simulator** — branching decisions with 4 meters (Time-to-Value, Scalability, Risk, Trust)
- **MECE Sandbox** — classify problems into Operational AI / Data & Analytics / AI-Enabled Platforms
- **Journey Map** — G0→G3 stage-gates with mini-quiz and economics note
- **Stakeholder Lens** — adapt messaging for Executive / Technical / Client / Investor
- **Scenario Playground** — pick Product Line, Speed, Stage; get evolution & economics

## Quick Start

```bash
# Node 18+ recommended
npm install
npm run dev
# open http://localhost:5173
```

## Build

```bash
npm run build
npm run preview
```

## Repo Structure

```
src/
  pages/                # each module page
  data/                 # seed JSON data (fabricated)
  utils.ts              # shared types & helpers
```

## Notes

- No backend required; runs fully in-browser.
- Replace JSON in `/src/data/` to customize scenarios/cases.
- Styling is minimal, dark theme; feel free to add Tailwind or shadcn/ui.
- License: MIT


---

## Zero-Local Setup: GitHub Pages Auto-Deploy

This repo is pre-configured to **build and deploy automatically** to GitHub Pages on every push to `main` using GitHub Actions.

**Steps:**
1. Create a repository on GitHub named `qdata-learning-suite`.
2. Upload all files (including the `.github/workflows/deploy.yml`).
3. Go to **Settings → Pages** and set:
   - **Source**: `Deploy from a branch`
   - **Branch**: `gh-pages` / `/ (root)`

After the first push to `main`, the workflow will:
- install deps,
- build with Vite,
- publish `dist/` to `gh-pages` branch.

Your site will be live at: `https://<your-username>.github.io/qdata-learning-suite/`
