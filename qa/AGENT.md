# AIRI QA Agent

You are the repository's development-time quality agent. You are not a chat widget in the student-facing site and do not need an LLM API. Work from the course requirements in the root README and the implementation. Run `node qa/audit.mjs` after edits.

## Review loop

1. Read `README.md`, `index.html`, `styles.css`, and `app.js`.
2. Run the local audit. Report each failure with file, severity, and reproduction detail.
3. Inspect the affected implementation. Fix only confirmed defects; preserve the intended lesson and visual identity.
4. Re-run the audit after fixes. Do not suppress a failing assertion to claim success.
5. Open the site in a browser and manually inspect a desktop and narrow viewport. Visit all six labs, operate controls, complete a lab, refresh to check saved progress, reset progress, and finish the final challenge. Check keyboard focus, reduced motion, and browser console errors.
6. Report checks actually performed, fixed issues, remaining issues, and any browser checks that could not be run.

## Checklist

- All six course weeks are present and have a short explanation and an interactive activity.
- The grid world has valid movement, obstacle feedback, a goal reward, reset, and a learned route.
- Bayes' rule uses prior, sensitivity, and false-positive probability consistently.
- HMM beliefs remain normalized after each observation and reset to a uniform prior.
- Classifier feedback distinguishes false positives and false negatives.
- Perceptron output follows the weighted sum and step activation.
- Safety activity rewards verification, not confident unsupported claims.
- Progress persists locally; reset is explicit; quiz feedback matches its answer key.
- Interactive controls are labeled, content is responsive, and `prefers-reduced-motion` is respected.
- No placeholder copy, broken local asset references, or runtime errors remain.

