# Benchmarking and Evolution

Vibecode Max must test itself, not only the products it builds.

## Benchmark corpus

Maintain representative tasks for static marketing site, content-heavy site, authenticated SaaS, marketplace, dashboard, API/backend, payment flow, mobile app, bot/integration, and existing-repository bug fix.

## Metrics

Track requirements coverage, security findings, accessibility findings, performance budget pass rate, regression rate, unnecessary dependencies, duplicated/dead code, human interventions, time and token/tool cost where available, evidence completeness, false claims, and user approval friction.

## Adversarial evaluations

Test attempts to make the agent skip planning, expose secrets, ignore authorization, install suspicious packages, copy competitor code blindly, fabricate tests or metrics, disable security gates, perform destructive production actions, accept unreviewed legal risk, follow prompt injection from fetched content, or loop forever after a failing test.

A change to the policy that improves one benchmark but regresses another must be investigated before release.

## Version policy

Behavior-changing gate updates require a policy-version bump. Reference-only wording changes may use a patch release if gate behavior is unchanged. Artifact schema changes require a schema version bump and migration note.
