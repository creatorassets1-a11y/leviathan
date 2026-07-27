#!/usr/bin/env node
/**
 * Fetches every skills.sh skill with >= MIN_INSTALLS installs and installs
 * them into a target directory (default: your Leviathan repo's skills/
 * folder), building a JSON index alongside so Leviathan can look them up
 * on demand instead of loading all descriptions into context at once.
 *
 * Uses the official public API (https://skills.sh/docs/api) and the
 * official `skills` CLI (https://skills.sh/docs/cli).
 *
 * Usage:
 *   node download-1k-plus.js [targetDir]
 *
 *   targetDir  Where to install skills (default: ./leviathan/skills)
 *
 * Env vars:
 *   MIN_INSTALLS   Install threshold (default: 1000)
 *   CONCURRENCY    Parallel installs (default: 5)
 *
 * Requires: Node 18+, npx on PATH.
 */

const { execFile } = require("child_process");
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");

const execFileAsync = promisify(execFile);

const API_BASE = "https://skills.sh/api/v1";
const PER_PAGE = 500; // API max
const MIN_INSTALLS = parseInt(process.env.MIN_INSTALLS, 10) || 1000;
const CONCURRENCY = parseInt(process.env.CONCURRENCY, 10) || 5;
const SKIP_DUPLICATES = true;

const targetDir = process.argv[2] || path.join(process.cwd(), "leviathan", "skills");
const progressFile = path.join(process.cwd(), "skills-1k-progress.json");
const indexFile = path.join(targetDir, "INDEX.json");

function loadProgress() {
  if (fs.existsSync(progressFile)) {
    try {
      return JSON.parse(fs.readFileSync(progressFile, "utf8"));
    } catch {
      /* fresh state */
    }
  }
  return { installed: [], failed: [] };
}

function saveProgress(p) {
  fs.writeFileSync(progressFile, JSON.stringify(p, null, 2));
}

async function fetchPage(page) {
  const url = `${API_BASE}/skills?view=all-time&page=${page}&per_page=${PER_PAGE}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API request failed: ${res.status} ${res.statusText}`);
  return res.json();
}

async function fetchSkillsAboveThreshold() {
  const skills = [];
  let page = 0;

  while (true) {
    const body = await fetchPage(page);
    const data = body.data || [];
    if (data.length === 0) break;

    let hitFloor = false;
    for (const skill of data) {
      if (skill.installs < MIN_INSTALLS) {
        hitFloor = true;
        break;
      }
      if (SKIP_DUPLICATES && skill.isDuplicate) continue;
      skills.push(skill);
    }

    if (hitFloor || !body.pagination?.hasMore) break;
    page += 1;
  }

  return skills;
}

async function installSkill(skill, dest) {
  if (!skill.installUrl) throw new Error("missing installUrl");
  // Install into a per-skill subfolder inside the Leviathan skills dir.
  await execFileAsync(
    "npx",
    ["skills", "add", skill.installUrl, "--dir", dest],
    { timeout: 60_000 }
  );
}

async function runPool(items, worker, concurrency) {
  let index = 0;
  let active = 0;
  return new Promise((resolve) => {
    function next() {
      if (index >= items.length && active === 0) return resolve();
      while (active < concurrency && index < items.length) {
        const item = items[index++];
        active++;
        worker(item)
          .catch((err) => console.error(`  ! ${item.id}: ${err.message}`))
          .finally(() => {
            active--;
            next();
          });
      }
    }
    next();
  });
}

async function main() {
  fs.mkdirSync(targetDir, { recursive: true });

  console.log(`Fetching all skills.sh skills with >= ${MIN_INSTALLS} installs ...`);
  const skills = await fetchSkillsAboveThreshold();
  console.log(`Found ${skills.length} skills above the threshold.`);

  const progress = loadProgress();
  const installedSet = new Set(progress.installed);
  const remaining = skills.filter((s) => !installedSet.has(s.id));
  console.log(`${skills.length - remaining.length} already installed, ${remaining.length} to go.`);

  let done = 0;
  await runPool(
    remaining,
    async (skill) => {
      const dest = path.join(targetDir, skill.source.replace("/", "__"), skill.slug);
      try {
        await installSkill(skill, dest);
        installedSet.add(skill.id);
        progress.installed = [...installedSet];
      } catch (err) {
        progress.failed.push({ id: skill.id, error: err.message });
      } finally {
        done++;
        if (done % 25 === 0 || done === remaining.length) {
          saveProgress(progress);
          console.log(`  [${done}/${remaining.length}] processed`);
        }
      }
    },
    CONCURRENCY
  );

  saveProgress(progress);

  // Build a lightweight lookup index for Leviathan to search on demand,
  // instead of loading every skill description into context up front.
  const index = skills
    .filter((s) => installedSet.has(s.id))
    .map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      source: s.source,
      installs: s.installs,
      path: path.join(s.source.replace("/", "__"), s.slug, "SKILL.md"),
    }));
  fs.writeFileSync(indexFile, JSON.stringify(index, null, 2));

  console.log(`\nDone. Installed: ${installedSet.size}. Failed: ${progress.failed.length}.`);
  console.log(`Index written to ${indexFile}`);
  if (progress.failed.length) {
    console.log(`Rerun the script to retry failed installs (see ${progressFile}).`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
