# Multi-Tenancy & Privileged Operations Contract

For multi-tenant products, tenant isolation MUST exist at the data/authorization layer, not only in UI routing or client state.

Required evidence where applicable:
- cross-tenant read/write/delete denial tests
- tenant derived server-side from authenticated context
- no trust in client-supplied tenant/user/role fields
- database authorization policies or equivalent enforced controls
- background jobs carry explicit tenant context and authorization boundaries
- caches are tenant-aware and cannot leak keys across tenants

Administrative/support access MUST be:
- server-side authorized
- step-up authenticated for sensitive actions
- time-limited where impersonation is used
- fully audited
- clearly distinguishable from the user's own session
- prevented from silently performing irreversible actions when policy requires confirmation

Audit records must be append-oriented and inaccessible to the subjects being audited except through controlled, policy-approved reporting.
