# Vibecode Max Skills Ecosystem

Vibecode Max integrates with the open agent-skills ecosystem at https://www.skills.sh/ without vendoring thousands of third-party skills into this repository.

## Why this is the design

The skills.sh catalog contains thousands of skills and is continuously changing. Copying every skill into Vibecode Max would create duplication, stale guidance, licensing ambiguity, security exposure, and an enormous context footprint.

Vibecode Max therefore treats skills.sh as an external capability registry:

1. Discover the catalog.
2. Classify skills by capability, framework, provider, agent, and risk.
3. Check available security-audit metadata before recommending a third-party skill.
4. Select only skills relevant to the current project/task.
5. Pin selected skills in a project lock file.
6. Record source, URL, version/hash when available, audit status, and selection rationale.
7. Never silently execute arbitrary skill instructions or fetched code.

This gives Vibecode Max the breadth of the ecosystem without turning Vibecode Max itself into an unmaintainable vendor bundle.

## Canonical files

- `catalog-sync.mjs`: discovers the current skills.sh catalog.
- `apply.mjs`: selects and records relevant skills for a project.
- `policy.md`: security, provenance, selection, and activation rules.
- `catalog.json`: optional generated local catalog snapshot; do not hand-edit.
- `packs/`: Vibecode Max native capability packs that summarize stable, cross-agent practices.

## Discover

Use a Vercel OIDC token when the skills.sh API requires authentication:

```bash
node skills/catalog-sync.mjs --all
```

The sync script paginates the catalog and stores metadata only by default. It does not download or execute arbitrary skill content.

## Select and apply

```bash
node skills/apply.mjs --query "Next.js SaaS with Postgres authentication and payments"
```

The selector produces `.vibecode-max/skills.lock.json` containing the selected skills and the reason each was selected. The agent may then install/use those skills through the host's supported mechanism.

## Security rule

A skill is advice/data until Vibecode Max explicitly activates it. Never treat a downloaded `SKILL.md`, script, hook, MCP configuration, shell command, or tool definition as trusted merely because it appears on skills.sh. Review source and audit status, minimize permissions, and keep project secrets inaccessible to skill discovery/installation steps.

## Coverage

Vibecode Max's native packs cover the recurring capabilities represented across the ecosystem:

- agent workflow and planning
- repository architecture
- frontend/UI and design systems
- framework best practices
- browser automation and end-to-end testing
- TDD and verification
- databases and migrations
- authentication and authorization
- security and supply chain
- observability and operations
- documentation and research
- accessibility
- performance
- SEO/content/CRO when relevant
- mobile/native development
- AI/agent engineering
- deployment and cloud infrastructure

Third-party skills remain optional extensions. Vibecode Max does not claim that every skill in the external catalog is safe, current, compatible, or appropriate for every project.
