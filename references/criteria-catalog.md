# Criteria Catalog

Every criterion has: ID, pillar, level, difficulty, scope, description, and what passes.

## Scoring Rules

- **Pass**: Criterion is fully satisfied (score = 1)
- **Partial**: Criterion is partially satisfied (score = 0.5)
- **Fail**: Criterion is not satisfied (score = 0)
- **N/A**: Not applicable to this stack (excluded from denominator)
- **Level gate**: Pass 80% of Level N → unlock Level N+1

---

## Level 1 — Functional

> Code runs, basic tooling exists. Agent can build and test locally.

| ID | Pillar | Criterion | Difficulty | Scope | Passes When |
|----|--------|-----------|------------|-------|-------------|
| L1-SV-01 | Style & Validation | **Linter configured** | Basic | App | Linter config file exists AND linter is in dependencies (e.g., `.eslintrc.*`, `ruff.toml`, `.golangci.yml`, `clippy` in Cargo) |
| L1-SV-02 | Style & Validation | **Type checker configured** | Basic | App | Type checking is available (e.g., `tsconfig.json`, `mypy` in deps, Go/Rust have built-in type checking → auto-pass) |
| L1-SV-03 | Style & Validation | **Code formatter configured** | Basic | App | Formatter config exists (e.g., `.prettierrc.*`, `biome.json`, `rustfmt.toml`, `gofmt` → auto-pass, `dotnet format` available) |
| L1-BS-01 | Build System | **Build command exists** | Basic | App | A build/compile command is defined (e.g., `scripts.build` in package.json, `Makefile` with build target, `cargo build`, `dotnet build`, `go build`) |
| L1-BS-02 | Build System | **Dependencies pinned** | Basic | Repo | Lock file exists (e.g., `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `Pipfile.lock`, `poetry.lock`, `Cargo.lock`, `go.sum`) |
| L1-TS-01 | Testing | **Unit tests exist** | Basic | App | At least one test file exists matching framework conventions (e.g., `*.test.*`, `*.spec.*`, `*_test.go`, `test_*.py`, `*_test.rs`) |
| L1-TS-02 | Testing | **Test command runnable** | Basic | App | A test command exists and is documented (e.g., `scripts.test` in package.json, `pytest` runnable, `cargo test`, `go test`) |
| L1-DC-01 | Documentation | **README exists** | Basic | Repo | `README.md` (or `.rst`, `.txt`) exists at repo root with >10 lines of content |
| L1-DC-02 | Documentation | **Setup instructions in README** | Intermediate | Repo | README contains section about installation, setup, or getting started (scan for headings like `## Setup`, `## Installation`, `## Getting Started`, `## Quick Start`) |
| L1-BS-03 | Build System | **Source control initialized** | Basic | Repo | `.git` directory exists |

**Level 1 total: 10 criteria. Need 8 (80%) to unlock Level 2.**

---

## Level 2 — Documented

> Processes are written down, automation in place. Agent knows HOW to work in this repo.

| ID | Pillar | Criterion | Difficulty | Scope | Passes When |
|----|--------|-----------|------------|-------|-------------|
| L2-DC-01 | Documentation | **AGENTS.md exists** | Basic | Repo | `AGENTS.md` file exists at repo root with agent-specific instructions (setup, test, lint, deploy commands) |
| L2-DC-02 | Documentation | **Contributing guide exists** | Intermediate | Repo | `CONTRIBUTING.md` exists OR README has a "Contributing" section |
| L2-SV-01 | Style & Validation | **Pre-commit hooks configured** | Intermediate | Repo | `.husky/` OR `.pre-commit-config.yaml` OR `lefthook.yml` OR `lint-staged` in package.json exists |
| L2-DE-01 | Development Environment | **Devcontainer defined** | Intermediate | Repo | `.devcontainer/devcontainer.json` exists |
| L2-DE-02 | Development Environment | **Environment template** | Basic | Repo | `.env.example` OR `.env.template` OR `.env.sample` exists (if `.env` is in `.gitignore`) |
| L2-SC-01 | Security | **Branch protection documented** | Intermediate | Repo | AGENTS.md or CONTRIBUTING.md mentions branch protection, required reviews, or merge policy |
| L2-SC-02 | Security | **Secrets not in source** | Basic | Repo | `.gitignore` includes common secret patterns (`.env`, `*.pem`, `*.key`) AND no `.env` file is tracked in git |
| L2-TD-01 | Task Discovery | **PR template exists** | Basic | Repo | `.github/pull_request_template.md` OR `.github/PULL_REQUEST_TEMPLATE/` exists |
| L2-TD-02 | Task Discovery | **Issue templates exist** | Intermediate | Repo | `.github/ISSUE_TEMPLATE/` directory exists with at least one template |
| L2-BS-01 | Build System | **CI pipeline exists** | Intermediate | Repo | `.github/workflows/*.yml` OR `.gitlab-ci.yml` OR `Jenkinsfile` OR `.circleci/config.yml` exists |

**Level 2 total: 10 criteria. Need 8 (80%) to unlock Level 3.**

---

## Level 3 — Standardized

> Security, observability, integration testing enforced. Agent can work safely at scale.

| ID | Pillar | Criterion | Difficulty | Scope | Passes When |
|----|--------|-----------|------------|-------|-------------|
| L3-TS-01 | Testing | **Integration/E2E tests exist** | Intermediate | App | E2E or integration test files exist (e.g., `playwright.config.*`, `cypress.config.*`, `*.e2e.*`, `*_integration_test.*`, test directory named `integration/` or `e2e/`) |
| L3-TS-02 | Testing | **Coverage tracking configured** | Intermediate | App | Coverage tool is configured (e.g., `jest --coverage` in scripts, `pytest-cov` in deps, `coverlet` in .NET, `coverage` in go test flags, coverage reporter in CI config) |
| L3-SC-01 | Security | **CODEOWNERS file exists** | Basic | Repo | `.github/CODEOWNERS` OR `CODEOWNERS` at root exists |
| L3-SC-02 | Security | **Secret scanning configured** | Intermediate | Repo | `gitleaks.toml` OR `.gitleaks.toml` OR `trufflehog` in CI OR `detect-secrets` config exists OR GitHub secret scanning enabled (check for `.github/workflows` referencing secret scanning) |
| L3-SC-03 | Security | **Dependency vulnerability scanning** | Intermediate | App | `npm audit` / `safety` / `cargo audit` / `govulncheck` in CI or pre-commit, OR Dependabot/Renovate config exists (`.github/dependabot.yml`, `renovate.json`) |
| L3-DO-01 | Debugging & Observability | **Structured logging in use** | Intermediate | App | Logging library detected in dependencies (e.g., `winston`, `pino`, `bunyan`, `loguru`, `structlog`, `zerolog`, `slog`, `serilog`, `NLog`) |
| L3-DO-02 | Debugging & Observability | **Error tracking configured** | Advanced | App | Error tracking service in deps (e.g., `@sentry/node`, `sentry-sdk`, `bugsnag`, `rollbar`, `datadog`) OR error tracking config file exists |
| L3-BS-01 | Build System | **CI runs tests** | Intermediate | Repo | CI config contains test execution step (scan workflow YAML for test commands matching detected framework) |
| L3-BS-02 | Build System | **CI runs linting** | Intermediate | Repo | CI config contains lint step (scan workflow YAML for lint commands) |
| L3-DC-01 | Documentation | **Architecture documented** | Advanced | Repo | `ARCHITECTURE.md` OR `docs/architecture.*` exists, OR README has architecture/design section |

**Level 3 total: 10 criteria. Need 8 (80%) to unlock Level 4.**

---

## Level 4 — Optimized

> Fast feedback loops, data-driven improvement. Agent works efficiently.

| ID | Pillar | Criterion | Difficulty | Scope | Passes When |
|----|--------|-----------|------------|-------|-------------|
| L4-BS-01 | Build System | **CI completes in <10 min** | Intermediate | Repo | CI workflow has timeout or historical data suggesting <10 min, OR pipeline is parallelized (multiple jobs) |
| L4-BS-02 | Build System | **Dependency updates automated** | Intermediate | Repo | Dependabot (`.github/dependabot.yml`) OR Renovate (`renovate.json`) configured |
| L4-TS-01 | Testing | **Coverage threshold enforced** | Intermediate | App | Coverage threshold in config (e.g., `coverageThreshold` in jest config, `--cov-fail-under` in pytest, coverage gate in CI) |
| L4-TS-02 | Testing | **Test parallelization** | Advanced | App | Tests run in parallel (e.g., `--parallel`, `--workers`, `jest` default parallel, CI matrix strategy) |
| L4-DO-01 | Debugging & Observability | **Health check endpoint** | Intermediate | App | Health check route exists (scan for `/health`, `/healthz`, `/ready`, `/ping` in source) — N/A for libraries |
| L4-DO-02 | Debugging & Observability | **Metrics collection** | Advanced | App | Metrics library in deps (e.g., `prom-client`, `prometheus_client`, `opentelemetry`, `datadog-metrics`) — N/A for libraries |
| L4-PE-01 | Product & Experimentation | **Feature flags infrastructure** | Advanced | App | Feature flag library in deps (e.g., `launchdarkly`, `flagsmith`, `unleash`, `growthbook`, `flipper`) — N/A for libraries |
| L4-SC-01 | Security | **Security policy documented** | Intermediate | Repo | `SECURITY.md` exists with vulnerability reporting instructions |
| L4-TD-01 | Task Discovery | **Changelog maintained** | Intermediate | Repo | `CHANGELOG.md` exists OR conventional commits with auto-changelog in CI |
| L4-DE-01 | Development Environment | **Docker Compose for local services** | Intermediate | App | `docker-compose.yml` OR `compose.yml` exists — N/A if no external service dependencies |

**Level 4 total: 10 criteria. Need 8 (80%) to unlock Level 5.**

---

## Level 5 — Autonomous

> Self-improving systems, sophisticated orchestration. Minimal human oversight.

| ID | Pillar | Criterion | Difficulty | Scope | Passes When |
|----|--------|-----------|------------|-------|-------------|
| L5-BS-01 | Build System | **Automated deployment pipeline** | Advanced | Repo | CD pipeline exists (deploy step in CI, or separate deploy workflow triggered on merge to main) |
| L5-BS-02 | Build System | **Rollback mechanism documented** | Advanced | Repo | Rollback instructions in AGENTS.md, runbook, or deploy script |
| L5-TS-01 | Testing | **Mutation testing configured** | Advanced | App | Mutation testing tool in deps or CI (e.g., `stryker`, `mutmut`, `cargo-mutants`, `go-mutesting`) |
| L5-DO-01 | Debugging & Observability | **Distributed tracing** | Advanced | App | Tracing library configured (e.g., `opentelemetry`, `dd-trace`, `jaeger-client`, `zipkin`) |
| L5-DO-02 | Debugging & Observability | **Alerting configured** | Advanced | Repo | Alert configs exist (e.g., PagerDuty, OpsGenie, alert rules in monitoring config) |
| L5-PE-01 | Product & Experimentation | **Analytics instrumentation** | Advanced | App | Analytics library in deps (e.g., `segment`, `mixpanel`, `amplitude`, `posthog`) |
| L5-SC-01 | Security | **Automated security scanning in CI** | Advanced | Repo | SAST tool in CI (e.g., `semgrep`, `snyk`, `codeql`, `sonar`) |
| L5-TD-01 | Task Discovery | **Automated issue triage** | Advanced | Repo | Bot or automation for issue labeling (e.g., GitHub Actions for labeling, Stale bot config) |
| L5-DC-01 | Documentation | **Runbook exists** | Advanced | Repo | `RUNBOOK.md` OR `docs/runbook.*` OR `docs/operations.*` exists with operational procedures |
| L5-DE-01 | Development Environment | **One-command setup** | Intermediate | Repo | Setup script exists (`Makefile` with `setup`/`init` target, or `scripts/setup.*`, or `make dev`, or documented single command that bootstraps everything) |

**Level 5 total: 10 criteria. Achieving 80% means fully autonomous-ready.**

---

## Summary

| Level | Criteria | Need to Pass | Theme |
|-------|----------|-------------|-------|
| L1 | 10 | 8 (80%) | Code runs, basic tooling |
| L2 | 10 | 8 (80%) | Documentation, process |
| L3 | 10 | 8 (80%) | Security, observability |
| L4 | 10 | 8 (80%) | Fast feedback, measurement |
| L5 | 10 | 8 (80%) | Self-improving, deployment |
| **Total** | **50** | — | — |
