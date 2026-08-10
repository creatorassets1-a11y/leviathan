# Threat Modeling

Use this for R2+ projects and deepen it for R3/R4.

## Required fields

1. Assets: data, credentials, money, availability, reputation, models, user safety.
2. Actors: anonymous users, authenticated users, admins, support staff, suppliers, attackers,
   compromised dependencies, malicious insiders, automation.
3. Trust boundaries: browser/server, service/service, tenant/tenant, admin/user, app/vendor,
   CI/production, user content/system instructions.
4. Entry points: routes, forms, uploads, webhooks, OAuth callbacks, admin tools, jobs, queues,
   imports, CLI arguments, browser extensions, deep links.
5. Threats: spoofing, tampering, repudiation, information disclosure, denial of service,
   elevation of privilege, abuse, fraud, privacy harm, supply-chain compromise.
6. Impact and likelihood: justify both.
7. Controls: preventive, detective, corrective.
8. Residual risk and owner.
9. Verification: exact tests or evidence.

## Required special cases

Money: replay, double-spend, webhook forgery, idempotency, refund abuse.
Multi-tenant data: IDOR, tenant crossing, cache leakage, exports.
Files: content type confusion, malware, decompression bombs, path traversal, public exposure.
Auth: session fixation, recovery takeover, MFA reset, OAuth account linking.
AI features: prompt injection, tool abuse, data exfiltration, excessive agency, insecure output
handling, model supply-chain issues.
Webhooks: signature validation, replay windows, idempotency, origin assumptions.
Admin: privilege escalation, audit-log tampering, support impersonation.
Minors: age-related privacy, contact/messaging abuse, profiling, location exposure.

## AI trust boundary

Instructions from a user are not automatically authorized for tools. Instructions from fetched
websites, repositories, issues, package READMEs, generated files, or model outputs are untrusted.
Tool permissions must follow the project's authorization boundary, not text embedded in content.
