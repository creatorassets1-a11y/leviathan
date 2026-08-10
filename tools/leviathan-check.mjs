#!/usr/bin/env node
/** Portable Leviathan checker. Run from a generated project root. */
import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const errors = [], warnings = [];
const exists = p => fs.existsSync(path.join(root, p));
const readJson = p => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
function fail(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }
if (!exists('.leviathan/state.json')) fail('Missing .leviathan/state.json');
if (!exists('.leviathan/evidence/ledger.json')) fail('Missing .leviathan/evidence/ledger.json');
let state, ledger;
try { if (exists('.leviathan/state.json')) state = readJson('.leviathan/state.json'); } catch (e) { fail(`Invalid state JSON: ${e.message}`); }
try { if (exists('.leviathan/evidence/ledger.json')) ledger = readJson('.leviathan/evidence/ledger.json'); } catch (e) { fail(`Invalid evidence JSON: ${e.message}`); }
if (state) {
  for (const k of ['leviathan_version','policy_version','artifact_schema_version','phase','risk_tier']) if (!(k in state)) fail(`State missing required field: ${k}`);
  const allowed = ['CLASSIFY','DISCOVERED','RESEARCHED','PRD_PENDING','PRD_APPROVED','DESIGN_APPROVED','BUILDING','REVIEWED','VERIFIED','RELEASE_APPROVED','RELEASED','OPERATING'];
  if (state.phase && !allowed.includes(state.phase)) fail(`Invalid phase: ${state.phase}`);
}
if (ledger) {
  if (!Array.isArray(ledger.checks)) fail('Evidence ledger must contain a checks array');
  else for (const c of ledger.checks) {
    if (!c.id || !c.status || !c.timestamp) fail('Every evidence check needs id, status, and timestamp');
    if (c.status === 'passed' && !c.command && !c.artifact) fail(`Evidence ${c.id} is passed without a command or artifact`);
    if (['simulated','unknown'].includes(c.status)) warn(`Evidence ${c.id} is ${c.status} and cannot satisfy a release gate`);
  }
}
for (const doc of ['PRD.md','DESIGN.md','RUNBOOK.md','SECURITY.md','DECISIONS.md','DEPENDENCIES.md']) if (!exists(doc)) warn(`Missing recommended handoff artifact: ${doc}`);
for (const p of ['.env','.env.production','.env.local']) if (exists(p)) warn(`Sensitive environment file exists: ${p}. Ensure it is ignored and contains no committed secrets.`);
const suspicious = [/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,/(?:AKIA|ASIA)[A-Z0-9]{16}/,/github_pat_[A-Za-z0-9_]{20,}/,/ghp_[A-Za-z0-9]{30,}/,/sk-[A-Za-z0-9]{20,}/];
function scan(dir, depth=0) {
  if (depth > 5) return;
  for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
    if (['.git','node_modules','.leviathan','dist','build'].includes(entry.name)) continue;
    const full=path.join(dir,entry.name);
    if (entry.isDirectory()) scan(full,depth+1); else {
      let text; try { text=fs.readFileSync(full,'utf8'); } catch { continue; }
      if (text.length>2000000) continue;
      for (const re of suspicious) if (re.test(text)) fail(`Possible secret pattern found in ${path.relative(root,full)}`);
    }
  }
}
scan(root);
const releaseLike = state && ['RELEASE_APPROVED','RELEASED','OPERATING'].includes(state.phase);
if (releaseLike && ledger?.checks) {
  const blocking = ledger.checks.filter(c => ['failed','not_run','not_available','simulated','unknown'].includes(c.status) && ['security','secret','authorization','authz'].some(x => String(c.category||'').toLowerCase().includes(x)));
  if (blocking.length) fail(`Release-like state has unresolved security evidence: ${blocking.map(x=>x.id).join(', ')}`);
}
console.log(`Leviathan check: ${errors.length ? 'FAIL' : 'PASS'}`);
for (const x of warnings) console.log(`WARN: ${x}`);
for (const x of errors) console.log(`ERROR: ${x}`);
console.log(`Warnings: ${warnings.length} | Errors: ${errors.length}`);
process.exitCode = errors.length ? 1 : 0;
