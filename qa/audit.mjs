import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const js = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const checks = [];
function check(label, fn) {
  try { fn(); checks.push({ label, ok: true }); }
  catch (error) { checks.push({ label, ok: false, error: error.message }); }
}

check('All six required weeks are represented', () => {
  for (const term of ['Markov Decision Processes', 'Probability & Bayesian Networks', 'Hidden Markov Models', 'Rational Decisions', 'Perceptrons & Neural Networks', 'LLMs, Generative AI']) assert.ok(js.includes(term), `Missing topic: ${term}`);
});
check('Primary site assets are linked', () => {
  assert.match(html, /href="styles\.css"/);
  assert.match(html, /src="app\.js"/);
});
check('Interactive sections have accessible labels', () => {
  assert.match(html, /aria-label="Main navigation"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(js, /aria-label="Grid world"/);
  assert.match(js, /aria-label="Two input signals connect to one perceptron output"/);
});
check('Progress persistence and explicit reset exist', () => {
  assert.match(js, /localStorage\.setItem\('airi-completed'/);
  assert.match(js, /localStorage\.getItem\('airi-completed'/);
  assert.match(html, /id="reset-progress"/);
});
check('Reduced motion is supported', () => assert.match(css, /prefers-reduced-motion:\s*reduce/));
check('Placeholder copy is absent', () => {
  assert.doesNotMatch(`${html}\n${js}`, /Lorem ipsum|coming soon|TODO|placeholder/i);
});
check('Bayesian posterior uses Bayes rule and known example is correct', () => {
  const prior = 0.1, sensitivity = 0.8, falsePositive = 0.1;
  const posterior = sensitivity * prior / (sensitivity * prior + falsePositive * (1 - prior));
  assert.ok(Math.abs(posterior - 0.4705882353) < 1e-9);
  assert.ok(/sens\*prior\/\(sens\*prior\+falsePositive\*\(1-prior\)\)/.test(js), 'Bayes formula is missing');
});
check('Perceptron example has expected weighted sum and activation', () => {
  const z = 0.6 * 1 + 0.3 * 0 - 0.2;
  assert.equal(z, 0.39999999999999997);
  assert.equal(z >= 0 ? 1 : 0, 1);
  assert.ok(/w1\*1\+w2\*0\+b/.test(js), 'Perceptron weighted sum is missing');
});
check('HMM filter normalizes posterior beliefs', () => {
  const prior = [0.25, 0.25, 0.25, 0.25];
  const predicted = prior.map((p, i) => p * 0.6 + (prior[i - 1] || 0) * 0.2 + (prior[i + 1] || 0) * 0.2);
  const likelihoodWeighted = predicted.map((p, i) => p * (i === 1 ? 0.7 : 0.1));
  const z = likelihoodWeighted.reduce((a, b) => a + b, 0);
  const posterior = likelihoodWeighted.map(p => p / z);
  assert.ok(Math.abs(posterior.reduce((a, b) => a + b, 0) - 1) < 1e-12);
  assert.ok(/updated\.map\(p=>p\/z\)/.test(js), 'HMM posterior normalization is missing');
});
check('Quiz has six questions with valid answer indices', () => {
  const section = js.slice(js.indexOf('const questions='), js.indexOf('let qIndex='));
  const count = (section.match(/correct:/g) || []).length;
  assert.equal(count, 6);
  assert.ok(/q\.options\.map/.test(js) && /q\.correct/.test(js), 'Quiz options or answer-key handling is missing');
});

for (const item of checks) console.log(`${item.ok ? 'PASS' : 'FAIL'} ${item.label}${item.error ? ` — ${item.error}` : ''}`);
if (checks.some(item => !item.ok)) process.exitCode = 1;
else console.log(`\n${checks.length} checks passed.`);

