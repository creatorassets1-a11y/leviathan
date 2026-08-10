# Agent-Ready Frontend Contract

Interfaces should remain understandable to humans and reliably discoverable by automation.

Where appropriate:
- use semantic HTML and correct native controls before custom abstractions
- provide stable, meaningful identifiers for critical controls and test targets
- avoid generated/random IDs that make durable automation brittle
- expose explicit accessible names and roles
- preserve deterministic loading/error/status semantics
- make important application state available through the DOM/accessibility tree rather than only canvas or decorative visuals
- use structured metadata/schema only when it accurately represents the underlying content
- keep component contracts and interaction semantics documented

Agent/test selectors MUST be stable enough for automated verification but should not force production markup to expose secrets or implementation internals. Prefer role/name/label semantics over brittle CSS selectors.
