# Onboarding, First-Run & Activation

## Purpose
Every product should intentionally move a new user from arrival to first meaningful value. Onboarding is a product system, not a decorative tour.

## Requirements
- Define activation as an observable user outcome, not merely signup completion.
- Document the shortest safe path to first value, required setup, optional setup, and recovery paths.
- Use progressive disclosure: request information only when it becomes necessary.
- Provide useful empty states, examples, contextual help, skip/defer controls, and resumable setup.
- Never block the core product behind unnecessary onboarding steps.
- Respect permissions, privacy/consent, age/market constraints, entitlements, and accessibility during onboarding.
- Do not use deceptive countdowns, forced subscriptions, hidden defaults, or manipulative consent.

## Measurement
Define events for onboarding started, step completed/skipped, first value, activation, abandonment, and recovery. Event names and properties must follow the analytics contract and privacy policy. Avoid sensitive payloads.

## Reliability
Onboarding must survive refresh, duplicate submissions, partial completion, offline/intermittent network conditions, and changed entitlements. Server-side state is authoritative. Never mark a paid or privileged setup complete solely from client state.

## Evidence
- fresh-account first-run test;
- activation path executed end-to-end;
- skip/resume/recovery tested;
- keyboard/screen-reader and mobile checks;
- event sequence verified against the analytics schema;
- no unnecessary personal data collected;
- degraded dependency behavior tested.

## Release gate
R2+ products with a material activation journey must define the activation outcome, first-run path, failure/recovery behavior, and evidence. If onboarding is intentionally omitted, record why.