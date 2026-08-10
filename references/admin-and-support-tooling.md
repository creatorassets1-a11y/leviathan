# Admin and Internal Support Tooling Contract

Admin and support tooling is a privileged production system. It must be treated as a security, privacy, payments, and reliability surface rather than a convenience dashboard.

## 1. When required

Apply this reference to products with any of:

- multiple users or roles;
- payments, subscriptions, refunds, credits, or entitlements;
- user-generated content or moderation;
- support requests, bans, appeals, exports, or deletion requests;
- production operations requiring privileged actions.

## 2. Minimum capabilities

Where applicable, provide:

- user/account lookup with data minimization;
- account status management with reason and duration;
- subscription/entitlement view and narrowly scoped adjustments;
- support-ticket/contact-request inbox;
- privacy export/deletion request triggers;
- recent security/account events;
- moderation/report/appeal workflow;
- payment/refund/credit support within explicit limits;
- searchable audit history.

Every capability must have an owner, permission boundary, audit semantics, and recovery path.

## 3. Authorization and least privilege

All admin decisions MUST be made server-side using trusted session and current permission state. Client-side role flags, hidden buttons, route guards, or client JWT claims are never sufficient.

Use explicit roles/permissions such as support, moderator, billing support, privacy operator, engineer, and super-admin only where the product needs them. Grant the minimum actions required by each role.

Privileged accounts require strong MFA, preferably phishing-resistant authentication. Admin sessions should have stricter idle/absolute lifetimes and step-up authentication for sensitive operations.

Every privileged endpoint must have direct negative tests proving lower-privilege users cannot invoke it.

## 4. Impersonation

If “view as user” is necessary:

- default to read-only;
- require explicit privileged authorization and, for sensitive actions, step-up authentication;
- make the session time-limited;
- display a persistent impersonation indicator;
- prevent irreversible financial/destructive actions by default;
- require an explicit exit path;
- record actor, target, start/end, purpose, actions, and outcome in the audit trail.

Never silently convert impersonation into unrestricted account takeover.

## 5. Audit trail

Every security-sensitive admin action must create an append-only or otherwise tamper-resistant audit event containing:

- actor identity and role;
- target user/tenant/resource;
- action and relevant object identifiers;
- reason or ticket/case reference where appropriate;
- timestamp;
- request/correlation ID;
- result/outcome;
- before/after summary when safe and necessary.

Do not copy passwords, tokens, raw card data, or unnecessary PII into audit logs. Ordinary users must not be able to erase audit records; administrators should not have casual destructive access to them.

## 6. Support workflow

A support inbox should provide:

- status and assignee;
- history and timestamps;
- internal notes separated from customer-visible messages;
- canned responses where useful;
- escalation to higher privilege;
- links to relevant, minimized account/billing/security context;
- privacy/legal/security request routing;
- request identifiers and evidence retention.

Support staff must not see data unrelated to the request merely because it is available in the database.

## 7. Moderation and enforcement

For products with UGC, map policy rules to server-side actions:

`warning -> soft limit -> temporary suspension -> permanent ban`

Actions must be attributable, reasoned, logged, bounded by role permissions, and appealable. Include expiry/review where appropriate.

Bulk moderation requires stronger confirmation, dry-run/preview where feasible, rate limits, and detailed audit evidence. Automated moderation must have a documented false-positive recovery path.

## 8. Billing and financial support

Support may view payment state and tokenized payment metadata as necessary, but must never access raw card data or bypass the PSP.

Refunds, credits, grace periods, plan changes, and entitlement adjustments require:

- explicit permission;
- defined amount/action limits;
- confirmation for irreversible or financial actions;
- idempotent implementation;
- audit evidence;
- reconciliation with the payment provider.

Never allow a support dashboard to directly manufacture a local “paid” state that overrides canonical provider state.

## 9. Privacy operations

Admin tooling may trigger or review data-subject workflows only after appropriate identity verification. Export and deletion operations must preserve tenant boundaries, be idempotent, and expose only the minimum data needed to the operator.

Record consent state and privacy requests without creating an unnecessary shadow copy of personal data.

## 10. Operational controls

Provide, where justified:

- immediate admin-access revocation;
- privileged-action rate limiting and anomaly detection;
- IP/network restrictions for high-risk surfaces;
- separate staging/demo administration;
- access reviews on a defined cadence;
- alerts for mass actions, privilege changes, unusual impersonation, repeated failed privileged operations, and bulk exports.

Do not rely on IP allowlisting as the sole authorization boundary.

## 11. Evidence requirements

For every production admin surface, execute:

- `ADMIN-001` non-admin direct endpoint denial;
- `ADMIN-002` role-boundary matrix for every privileged operation;
- `ADMIN-003` sensitive action audit event verification;
- `ADMIN-004` destructive-operation confirmation/reversibility test;
- `ADMIN-005` impersonation time-limit/read-only restrictions where applicable;
- `ADMIN-006` support-to-engineering escalation boundary;
- `ADMIN-007` billing action authorization/idempotency/reconciliation;
- `ADMIN-008` privacy export/deletion authorization and audit;
- `ADMIN-009` moderation/enforcement/appeal workflow;
- `ADMIN-010` admin access revocation and session invalidation.

Evidence must contain the exact action, principal, expected result, observed result, timestamp, environment, and artifact.

## 12. Release blockers

Unless a time-limited owner-approved exception exists, block release when:

- privileged actions depend only on client-side checks;
- support roles have unnecessary broad production access;
- sensitive admin actions are not audited;
- impersonation can perform unrestricted irreversible actions silently;
- refunds/credits can bypass provider state or reconciliation;
- privacy operations can cross user/tenant boundaries;
- users can erase or modify privileged audit history;
- admin credentials cannot be revoked promptly.
