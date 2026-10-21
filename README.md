# AIRI: The AI Learning Lab

A browser-based learning project for AI Fundamentals, covering course weeks 5–10 through six interactive labs, a final challenge, and the AIRI robot guide.

## Run locally

This is a dependency-free static site. With Node.js installed, run the included local server from the repository root:

```bash
node qa/serve.mjs
```

Then open [http://localhost:8000](http://localhost:8000). Python users can also run `python -m http.server 8000` or run `npx serve .`.

## QA self-check agent

The repository includes a local QA agent checklist in [`qa/AGENT.md`](qa/AGENT.md) and an executable audit in [`qa/audit.mjs`](qa/audit.mjs). GitHub Actions runs the audit and JavaScript syntax checks on pushes and pull requests. Run it locally with:

```bash
node qa/audit.mjs
```

The audit checks required course topics, key interactive controls, accessibility hooks, placeholder text, and core simulation calculations. Before submitting, open the site in a browser at desktop and mobile widths and follow each lab, the progress reset, and the final challenge. The local script does not claim to replace visual browser review.

## Publish with GitHub Pages

In the repository, open **Settings → Pages** and set the source to **GitHub Actions**. Then run the **Publish static site to GitHub Pages** workflow from the Actions tab. Publishing is manual so a code push does not unexpectedly publish the site. The workflow builds no bundle; it publishes the repository root directly.

## Project structure

- `index.html` — accessible single-page experience and learning zones
- `styles.css` — responsive laboratory visual system and AIRI illustration
- `app.js` — lab simulations, progress persistence, and final quiz
- `qa/` — QA agent instructions and repeatable local audit
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow

