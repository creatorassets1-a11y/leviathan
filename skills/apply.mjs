#!/usr/bin/env node

/**
 * Select relevant skills from a local skills.sh catalog snapshot.
 * This creates a project lock file; it does not execute or install third-party skills.
 */

import fs from 'node:fs/promises';

const args = process.argv.slice(2);
const qIndex = args.indexOf('--query');
const query = qIndex >= 0 ? args[qIndex + 1] : '';
const limitIndex = args.indexOf('--limit');
const limit = limitIndex >= 0 ? Number(args[limitIndex + 1]) : 20;

if (!query) {
  console.error('Usage: node skills/apply.mjs --query "project/task description" [--limit 20]');
  process.exit(2);
}

const catalog = JSON.parse(await fs.readFile('skills/catalog.json', 'utf8'));
const terms = query.toLowerCase().split(/[^a-z0-9+.#-]+/).filter((x) => x.length > 2);

function score(skill) {
  const haystack = `${skill.name ?? ''} ${skill.slug ?? ''} ${skill.source ?? ''}`.toLowerCase();
  let value = 0;
  for (const term of terms) if (haystack.includes(term)) value += 3;
  if (skill.sourceType === 'github') value += 1;
  return value;
}

const selected = catalog.skills
  .map((skill) => ({ skill, score: score(skill) }))
  .filter((x) => x.score > 0)
  .sort((a, b) => b.score - a.score || (b.skill.installs ?? 0) - (a.skill.installs ?? 0))
  .slice(0, limit)
  .map(({ skill, score }) => ({
    id: skill.id,
    name: skill.name,
    source: skill.source,
    installUrl: skill.installUrl,
    url: skill.url,
    installs: skill.installs,
    score,
    reason: `Matched the project/task query: ${query}`,
    status: 'selected_for_review',
    activation: 'manual_after_review',
  }));

await fs.mkdir('.vibecode-max', { recursive: true });
const lock = {
  schemaVersion: 1,
  source: 'skills.sh',
  generatedAt: new Date().toISOString(),
  query,
  policy: 'skills/policy.md',
  selected,
};
await fs.writeFile('.vibecode-max/skills.lock.json', `${JSON.stringify(lock, null, 2)}\n`);
console.log(`Selected ${selected.length} skills for review.`);
for (const skill of selected) console.log(`- ${skill.id}`);
