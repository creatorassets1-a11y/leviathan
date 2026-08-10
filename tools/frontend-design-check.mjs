#!/usr/bin/env node
/**
 * VIBECODE MAX frontend design static check.
 * This is a detector, not proof of design quality or accessibility.
 * It emits findings so agents cannot silently convert unknowns into passes.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [];
const ignored = /(^|\\|\/)(node_modules|\.git|dist|build|coverage|\.next|\.nuxt)(\\|\/|$)/;
const exts = new Set(['.js','.jsx','.ts','.tsx','.css','.scss','.html','.vue','.svelte']);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (ignored.test(p)) continue;
    if (entry.isDirectory()) walk(p);
    else if (exts.has(path.extname(p).toLowerCase())) files.push(p);
  }
}
walk(root);

const findings = [];
const patterns = [
  ['dangerous-html-sink', /dangerouslySetInnerHTML|\.innerHTML\s*=|v-html\s*=|{@html\s+/g, 'Review raw HTML insertion and sanitization.'],
  ['unsafe-eval', /\beval\s*\(|new\s+Function\s*\(/g, 'Review dynamic code execution.'],
  ['generic-font-default', /font-family\s*:\s*(Inter|Roboto|Arial|system-ui|ui-sans-serif)/gi, 'Primary typography appears to use a common/default family; verify the locked design rationale.'],
  ['gradient-text', /background(?:-image)?\s*:[^;]*(?:linear|radial)-gradient[^;]*[\s\S]{0,160}(?:background-clip\s*:\s*text|-webkit-background-clip\s*:\s*text)/gi, 'Review gradient text for decorative default usage.'],
  ['emoji-icon', /[\u{1F300}-\u{1FAFF}]/gu, 'Review emoji used as interface iconography; verify accessibility and visual consistency.'],
  ['placeholder-copy', /(?:TODO|FIXME|Lorem ipsum|Coming soon|Get started|Learn more)/gi, 'Review generic or unfinished UI copy in production-facing code.'],
  ['arbitrary-color', /(?:#[0-9a-f]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\))/gi, 'Review one-off color values; use semantic design tokens where appropriate.'],
];

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const [rule, re, message] of patterns) {
    const matches = text.match(re);
    if (matches?.length) findings.push({ rule, file: path.relative(root, file), count: matches.length, message });
  }
}

const design = fs.existsSync(path.join(root, 'DESIGN.md')) || fs.existsSync(path.join(root, 'design.md'));
const result = {
  tool: 'vibecode-max/frontend-design-check',
  version: 1,
  status: findings.length ? 'findings' : 'no_static_findings',
  designArtifactPresent: design,
  limitations: [
    'Static findings are not proof of defects.',
    'No finding does not prove accessibility, usability, originality, or performance.',
    'Rendered review and real-device/manual accessibility testing remain required.',
  ],
  findings,
};

const outDir = path.join(root, '.vibecode-max', 'evidence', 'checks');
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, 'frontend-design.json');
fs.writeFileSync(out, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
process.exitCode = 0;
