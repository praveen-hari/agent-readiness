# Remediation Index

Maps each criterion to the action that fixes it. Some criteria are **auto-remediable** (the agent generates a file), some are **guide-only** (the agent explains what to do), and some are **manual** (requires human/admin action).

## Remediation Types

- **generate**: Agent creates a file from a template
- **guide**: Agent writes instructions in the readiness report (e.g., "enable branch protection in GitHub settings")
- **augment**: Agent adds content to an existing file (e.g., adds a section to README)
- **manual**: Requires human action outside the repo (e.g., configure a SaaS service)

---

## Level 1 — Functional

| ID | Criterion | Type | Action | Template / Notes |
|----|-----------|------|--------|-----------------|
| L1-SV-01 | Linter configured | generate | Create linter config for detected stack | `templates/style/eslintrc.tmpl`, `templates/style/ruff.tmpl`, etc. |
| L1-SV-02 | Type checker configured | generate | Create type checker config | `templates/style/tsconfig.tmpl`, `templates/style/mypy.tmpl` |
| L1-SV-03 | Code formatter configured | generate | Create formatter config | `templates/style/prettierrc.tmpl`, `templates/style/rustfmt.tmpl` |
| L1-BS-01 | Build command exists | augment | Add build script to package.json / Makefile | Stack-dependent; add `"build"` script or Makefile target |
| L1-BS-02 | Dependencies pinned | guide | Run package manager to generate lock file | "Run `npm install` / `poetry lock` / `cargo generate-lockfile` to create lock file" |
| L1-TS-01 | Unit tests exist | generate | Create example test file | `templates/testing/example-test.tmpl` — creates one test per detected framework |
| L1-TS-02 | Test command runnable | augment | Add test script to package.json / Makefile | Add `"test"` script or Makefile target |
| L1-DC-01 | README exists | generate | Create README.md | `templates/documentation/readme.tmpl` |
| L1-DC-02 | Setup instructions in README | augment | Add setup section to README | Append `## Getting Started` section with detected setup commands |
| L1-BS-03 | Source control initialized | guide | Initialize git | "Run `git init` to initialize source control" |

## Level 2 — Documented

| ID | Criterion | Type | Action | Template / Notes |
|----|-----------|------|--------|-----------------|
| L2-DC-01 | AGENTS.md exists | generate | Create AGENTS.md | `templates/documentation/agents-md.tmpl` — populated from detected stack, commands, architecture |
| L2-DC-02 | Contributing guide | generate | Create CONTRIBUTING.md | `templates/documentation/contributing.tmpl` |
| L2-SV-01 | Pre-commit hooks | generate | Create pre-commit config | `templates/style/pre-commit-config.tmpl` OR `templates/style/husky.tmpl` |
| L2-DE-01 | Devcontainer | generate | Create devcontainer.json | `templates/environment/devcontainer.tmpl` |
| L2-DE-02 | Environment template | generate | Create .env.example | `templates/environment/env-example.tmpl` |
| L2-SC-01 | Branch protection documented | augment | Add branch protection section to AGENTS.md | Append merge policy section |
| L2-SC-02 | Secrets not in source | augment | Update .gitignore | Add secret patterns to .gitignore |
| L2-TD-01 | PR template | generate | Create PR template | `templates/tasks/pull-request-template.tmpl` |
| L2-TD-02 | Issue templates | generate | Create issue templates | `templates/tasks/bug-report.tmpl`, `templates/tasks/feature-request.tmpl` |
| L2-BS-01 | CI pipeline exists | generate | Create GitHub Actions workflow | `templates/build/ci-workflow.tmpl` |

## Level 3 — Standardized

| ID | Criterion | Type | Action | Template / Notes |
|----|-----------|------|--------|-----------------|
| L3-TS-01 | Integration/E2E tests exist | guide | Recommend E2E framework | "Install Playwright/Cypress and create first E2E test" |
| L3-TS-02 | Coverage tracking configured | augment | Add coverage config to test command | Add `--coverage` flag or coverage config |
| L3-SC-01 | CODEOWNERS exists | generate | Create CODEOWNERS | `templates/security/codeowners.tmpl` |
| L3-SC-02 | Secret scanning configured | generate | Create gitleaks config | `templates/security/gitleaks.tmpl` + CI step |
| L3-SC-03 | Dependency vulnerability scanning | generate | Create Dependabot config | `templates/security/dependabot.tmpl` |
| L3-DO-01 | Structured logging | guide | Recommend logging library | Stack-specific recommendation with install command |
| L3-DO-02 | Error tracking configured | guide | Recommend Sentry/similar | "Install `@sentry/node` and configure DSN" |
| L3-BS-01 | CI runs tests | augment | Add test step to CI | Modify existing CI workflow to include test step |
| L3-BS-02 | CI runs linting | augment | Add lint step to CI | Modify existing CI workflow to include lint step |
| L3-DC-01 | Architecture documented | generate | Create ARCHITECTURE.md skeleton | `templates/documentation/architecture.tmpl` |

## Level 4 — Optimized

| ID | Criterion | Type | Action | Template / Notes |
|----|-----------|------|--------|-----------------|
| L4-BS-01 | CI completes in <10 min | guide | Recommend CI optimization | "Parallelize jobs, cache dependencies, use matrix strategy" |
| L4-BS-02 | Dependency updates automated | generate | Create Dependabot/Renovate config | `templates/build/dependabot.tmpl` or `templates/build/renovate.tmpl` |
| L4-TS-01 | Coverage threshold enforced | augment | Add coverage threshold to config | Add threshold to jest/pytest/coverage config |
| L4-TS-02 | Test parallelization | guide | Recommend parallel test config | Stack-specific recommendation |
| L4-DO-01 | Health check endpoint | guide | Recommend health check pattern | Stack-specific code snippet |
| L4-DO-02 | Metrics collection | guide | Recommend metrics library | "Install `prom-client` / `prometheus_client`" |
| L4-PE-01 | Feature flags | manual | Recommend feature flag service | "Evaluate LaunchDarkly, Flagsmith, or Unleash" |
| L4-SC-01 | Security policy documented | generate | Create SECURITY.md | `templates/security/security-md.tmpl` |
| L4-TD-01 | Changelog maintained | generate | Create CHANGELOG.md + config | `templates/tasks/changelog.tmpl` |
| L4-DE-01 | Docker Compose | generate | Create docker-compose.yml skeleton | `templates/environment/docker-compose.tmpl` |

## Level 5 — Autonomous

| ID | Criterion | Type | Action | Template / Notes |
|----|-----------|------|--------|-----------------|
| L5-BS-01 | Automated deployment | guide | Recommend CD pipeline | "Add deploy step to CI workflow triggered on merge to main" |
| L5-BS-02 | Rollback mechanism | augment | Add rollback section to AGENTS.md | Append rollback instructions |
| L5-TS-01 | Mutation testing | guide | Recommend mutation testing tool | "Install Stryker / mutmut / cargo-mutants" |
| L5-DO-01 | Distributed tracing | guide | Recommend tracing setup | "Install OpenTelemetry SDK and configure exporter" |
| L5-DO-02 | Alerting configured | manual | Recommend alerting service | "Configure PagerDuty/OpsGenie for critical alerts" |
| L5-PE-01 | Analytics instrumentation | manual | Recommend analytics platform | "Evaluate PostHog, Amplitude, or Segment" |
| L5-SC-01 | Automated security scanning in CI | generate | Add CodeQL/Semgrep to CI | `templates/security/codeql-workflow.tmpl` |
| L5-TD-01 | Automated issue triage | generate | Add labeler workflow | `templates/tasks/auto-labeler.tmpl` |
| L5-DC-01 | Runbook exists | generate | Create RUNBOOK.md skeleton | `templates/documentation/runbook.tmpl` |
| L5-DE-01 | One-command setup | augment | Add setup target to Makefile | Add `make setup` or `scripts/setup.sh` |

---

## Auto-Remediation Summary

| Type | Count | Percentage |
|------|-------|-----------|
| **generate** | 27 | 54% |
| **augment** | 10 | 20% |
| **guide** | 10 | 20% |
| **manual** | 3 | 6% |

**74% of all criteria** can be auto-remediated by the agent (generate + augment).
