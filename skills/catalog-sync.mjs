#!/usr/bin/env node

/**
 * Sync metadata from the skills.sh catalog.
 *
 * The script intentionally stores metadata by default rather than copying and
 * executing arbitrary third-party skill contents. Use --source <owner/repo>
 * or the skills.sh detail endpoint separately when a skill is actually needed.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = 'https://www.skills.sh/api/v1/skills';
const out = path.resolve('skills/catalog.json');
const args = new Set(process.argv.slice(2));
const all = args.has('--all');
const perPage = 500;

async function get(url) {
  const headers = { accept: 'application/json' };
  if (process.env.VERCEL_OIDC_TOKEN) {
    headers.authorization = `Bearer ${process.env.VERCEL_OIDC_TOKEN}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`skills.sh returned ${res.status} for ${url}`);
  }
  return res.json();
}

async function main() {
  const records = [];
  let page = 0;
  const maxPages = all ? Infinity : 1;

  while (page < maxPages) {
    const data = await get(`${BASE}?view=all-time&per_page=${perPage}&page=${page}`);
    records.push(...(data.data ?? []));
    if (!data.pagination?.hasMore) break;
    page += 1;
  }

  const payload = {
    schemaVersion: 1,
    source: 'skills.sh',
    generatedAt: new Date().toISOString(),
    complete: all,
    count: records.length,
    skills: records,
  };

  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Wrote ${records.length} skills to ${out}`);
  if (!all) console.log('Run with --all to paginate the complete catalog.');
}

main().catch((err) => {
  console.error(`skills catalog sync failed: ${err.message}`);
  process.exit(1);
});
