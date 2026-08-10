# Software Supply Chain

## Before adding a dependency

1. Confirm the exact package name in the official registry.
2. Check maintained status, release history, adoption, and known vulnerabilities.
3. Inspect install/build scripts when the package executes them.
4. Check transitive dependencies and license compatibility.
5. Prefer established packages over lookalike or suspiciously new packages.
6. Pin the resolved version and update the lockfile.
7. Record what the package does and why it is needed in `DEPENDENCIES.md`.

## Build integrity

Where supported: generate an SBOM, use dependency vulnerability scanning, verify lockfile integrity, record package manager/runtime versions, use provenance/signature verification offered by the ecosystem, scan repository history for leaked secrets, and review CI actions and third-party workflows.

## Updates

Dependency updates require the same security and compatibility checks as new dependencies. Automated update bots may propose changes but must not silently bypass release gates.

## Incident response

If a dependency is compromised: identify affected versions, isolate, pin/remove/replace, rotate exposed credentials if applicable, rebuild from clean inputs, scan artifacts, deploy, and document impact and remediation.
