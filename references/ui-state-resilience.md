# UI State & Resilience Contract

## Purpose
Every async user journey must define and implement its full state machine, not only the happy path.

## Required states
For every read and mutation, identify applicable:
- initial/loading
- streaming/progressive
- success
- empty
- validation error
- server error
- timeout
- offline/reconnect
- unauthorized/session expired
- forbidden/permission denied
- rate limited
- partial success/degraded
- duplicate/in-flight
- optimistic update + rollback
- retry/exhausted retry

## Evidence
The design artifact MUST map each state to a concrete UI, recovery action, and test. A generic spinner, blank screen, raw exception, or disabled control without explanation is not evidence of completion.

## Mutation safety
Every non-idempotent UI mutation MUST prevent accidental double submission and define server-side idempotency or concurrency behavior where duplicate requests are possible.

## Error contract
User-facing errors must contain: what happened, safe reason when useful, next action, and a support/correlation reference when escalation is needed. Never expose stack traces, SQL errors, internal hostnames, tokens, or provider secrets.

## First run
Products with accounts or meaningful workflows MUST define onboarding, first-value path, realistic empty-state guidance, progressive disclosure, and recovery/help surfaces.
