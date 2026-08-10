#!/usr/bin/env node
/**
 * Leviathan portable security-floor scanner.
 * Static evidence helper: it does not prove security. It detects high-risk patterns
 * that require review and writes machine-readable findings when --json is used.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
// tools/ holds this scanner's own source (and sibling checkers). Their code intentionally
// contains the detection patterns as literal strings, so scanning it self-triggers every rule
// with no security value; exclude it rather than report on the scanner's own implementation.
const ignore = new Set(['.git', 'node_modules', '.next', 'dist', 'build', 'coverage', '.leviathan/evidence', 'tools']);
const textExt = new Set(['.js','.jsx','.ts','.tsx','.mjs','.cjs','.vue','.svelte','.html','.css','.sql','.md','.json','.yaml','.yml']);
const findings = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
    const rel = path.relative(root, path.join(dir, entry.name));
    if (ignore.has(rel) || [...ignore].some(x => rel.startsWith(x + path.sep))) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (textExt.has(path.extname(entry.name).toLowerCase())) scan(full, rel);
  }
}

function add(id, severity, file, message, line) { findings.push({id,severity,file,message,line}); }
// Markdown documentation legitimately discusses these anti-patterns in prose and inline code
// spans (e.g. "never use `isAdmin: true`"). Only scan fenced code blocks in .md files so real
// pasted code/secrets are still caught without flagging every mention of the pattern in prose.
function scannableLines(file, text) {
  const lines = text.split(/\r?\n/);
  if (path.extname(file).toLowerCase() !== '.md') return lines.map((line, i) => ({ line, n: i + 1 }));
  const out = [];
  let inFence = false;
  lines.forEach((line, i) => {
    if (/^\s*```/.test(line)) { inFence = !inFence; return; }
    if (inFence) out.push({ line, n: i + 1 });
  });
  return out;
}
function scan(file, rel) {
  let text;
  try { text = fs.readFileSync(file, 'utf8'); } catch { return; }
  scannableLines(file, text).forEach(({ line, n }) => {
    if (/localStorage\s*\.\s*setItem\s*\(\s*['\"](?:token|access|refresh|jwt|session)/i.test(line) || /sessionStorage\s*\.\s*setItem\s*\(/i.test(line))
      add('SESSION-LOCALSTORAGE','high',rel,'Potential browser token/session storage; review and prove it is not a long-lived sensitive credential.',n);
    if (/dangerouslySetInnerHTML|innerHTML\s*=|insertAdjacentHTML/i.test(line))
      add('XSS-RAW-HTML','high',rel,'Raw HTML sink detected; require trusted/sanitized input and context-appropriate controls.',n);
    if (/isAdmin\s*[:=]\s*(true|req\.body|localStorage|sessionStorage)/i.test(line))
      add('AUTHZ-CLIENT-ADMIN','critical',rel,'Potential client/request-controlled admin authorization; privileged actions must be server-authorized.',n);
    if (/SUPABASE_SERVICE_ROLE|service_role|SECRET_KEY|PRIVATE_KEY/i.test(line) && /process\.env|env\./.test(line) === false)
      add('SECRET-SOURCE','high',rel,'Potential hard-coded privileged secret or key identifier; inspect and scan history.',n);
    if (/Access-Control-Allow-Origin\s*[:=]\s*['\"]\*['\"]|origin:\s*['\"]\*['\"]/i.test(line))
      add('CORS-WILDCARD','medium',rel,'Wildcard CORS detected; verify whether credentials or sensitive endpoints are exposed.',n);
    if (/eval\s*\(|new Function\s*\(/.test(line))
      add('DYNAMIC-CODE','high',rel,'Dynamic code execution detected; require explicit security review.',n);
    if (/webhook/i.test(line) && /signature|verify|hmac|constructEvent/i.test(text) === false)
      add('WEBHOOK-VERIFY','high',rel,'Webhook-related code found without an obvious verification primitive in the file; inspect integration.',n);
  });
}

walk(root);
const summary = { generatedAt:new Date().toISOString(), scanner:'leviathan-security-floor', findings, counts: findings.reduce((a,f)=>(a[f.severity]=(a[f.severity]||0)+1,a),{}) };
fs.mkdirSync(path.join(root,'.leviathan/evidence/checks'), {recursive:true});
fs.writeFileSync(path.join(root,'.leviathan/evidence/checks/security-floor.json'), JSON.stringify(summary,null,2));
console.log(JSON.stringify(summary,null,2));
process.exitCode = findings.some(f => f.severity === 'critical') ? 2 : 0;
