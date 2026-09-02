---
name: agent-readiness
description: 'Evaluate and remediate agent readiness for any repository. Scores repos across 5 levels and 9 technical pillars based on the Factory AI Agent Readiness Model. Use when: "check readiness", "agent readiness", "readiness report", "make repo agent-ready", "prepare for autonomous development", or onboarding a repo for AI agent work.'
argument-hint: 'Optional: path to the repo root to evaluate'
---

# Agent Readiness

Evaluate a repository's readiness for autonomous AI agent development, then remediate gaps to reach higher levels. Based on the [Factory AI Agent Readiness Model](https://docs.factory.ai/agent-readiness/overview).

## When to Use

- Before delegating work to an AI agent on a new repo
- Onboarding a codebase for autonomous development
- The user says "check readiness", "readiness report", "make this repo agent-ready"
- Periodically after major infrastructure changes
- When setting up CI/CD, testing, or documentation for agent workflows

## What It Does

```
SCAN → SCORE → PROPOSE → REMEDIATE → VERIFY → REPORT
```

1. **SCAN** — Detect stack, tooling, infrastructure signals across 9 pillars
2. **SCORE** — Evaluate against 5 readiness levels (80% gated progression)
3. **PROPOSE** — Show gaps, prioritized fixes, and what each fix unlocks
4. **REMEDIATE** — Generate missing files, configs, and documentation
5. **VERIFY** — Run generated configs to confirm they work
6. **REPORT** — Write readiness report with scores, evidence, and next steps

## The 5 Readiness Levels

| Level | Name | Description | Unlocks |
|-------|------|-------------|---------|
| **1** | **Functional** | Code runs, basic tooling exists | Agent can build and test locally |
| **2** | **Documented** | Processes are written down, some automation | Agent knows HOW to work in this repo |
| **3** | **Standardized** | Security, observability, and integration testing enforced | Agent can work safely at scale |
| **4** | **Optimized** | Fast feedback loops, measured improvement | Agent works efficiently with tight iteration |
| **5** | **Autonomous** | Self-improving systems, sophisticated orchestration | Agent operates with minimal human oversight |

**Gated progression**: Pass 80% of Level N criteria → unlock Level N+1.

## The 9 Technical Pillars

| Pillar | Why Agents Need It |
|--------|-------------------|
| **Style & Validation** | Agents avoid wasting cycles on syntax, style, and type errors |
| **Build System** | Agents know exactly what commands to run — no guessing |
| **Testing** | Fast feedback loops let agents verify their changes work |
| **Documentation** | Written instructions replace tribal knowledge agents can't access |
| **Development Environment** | Reproducible environments eliminate "works on my machine" |
| **Debugging & Observability** | Runtime visibility turns "it failed" into "it failed because X" |
| **Security** | Guardrails prevent agents from introducing security issues |
| **Task Discovery** | Structured issues help agents find and scope work |
| **Product & Experimentation** | Agents can measure whether features are actually used |

---

## Step 1 — SCAN

Read the criteria catalog:
```
read_file: ./references/criteria-catalog.md
```

Read the detection rules:
```
read_file: ./references/detection-rules.md
```

Then scan the repository systematically:

### 1a. Language & Stack Detection
- List root directory for manifest files (package.json, requirements.txt, Cargo.toml, go.mod, *.csproj, pom.xml, Gemfile, composer.json, mix.exs)
- Detect primary language and framework
- Detect monorepo structure (workspaces, multiple build configs)

### 1b. Pillar-by-Pillar Signal Detection

For each of the 9 pillars, check for specific signals. The criteria catalog defines exactly what to look for and how to score it.

**Style & Validation**: Scan for linter configs, type checker configs, formatter configs, pre-commit hooks
**Build System**: Scan for build commands in package.json/Makefile/etc., dependency lock files, documented build steps
**Testing**: Scan for test files, test configs, coverage configs, E2E test configs
**Documentation**: Check for README.md, AGENTS.md, CONTRIBUTING.md, architecture docs
**Development Environment**: Check for .devcontainer/, docker-compose.yml, .env.example, setup scripts
**Debugging & Observability**: Scan for logging libraries, tracing configs, metrics instrumentation
**Security**: Check for CODEOWNERS, branch protection signals, secret scanning configs, .gitignore for secrets
**Task Discovery**: Check for issue templates, PR templates, labeling configs
**Product & Experimentation**: Scan for analytics libraries, feature flag configs

### 1c. Record Findings

For each criterion in the catalog, record:
- `status`: pass / fail / partial / not-applicable
- `evidence`: file path or signal that proves the status
- `scope`: repo-level or per-application

Store as structured data for scoring.

## Step 2 — SCORE

Apply the Factory AI scoring model:

### 2a. Per-Criterion Scoring
Each criterion is `pass` (1) or `fail` (0). `partial` counts as 0.5. `not-applicable` is excluded from the denominator.

### 2b. Per-Level Scoring
For each level, calculate: `passed_criteria / total_criteria`

### 2c. Level Progression
```
Level 1: Always unlocked
Level 2: Unlocked if Level 1 score ≥ 80%
Level 3: Unlocked if Level 2 score ≥ 80%
Level 4: Unlocked if Level 3 score ≥ 80%
Level 5: Unlocked if Level 4 score ≥ 80%
```

The repo's **readiness level** is the highest unlocked level where the score ≥ 80%.

### 2d. Overall Score
Calculate a composite: `(L1_pct * 0.10) + (L2_pct * 0.20) + (L3_pct * 0.25) + (L4_pct * 0.25) + (L5_pct * 0.20)`

## Step 3 — PROPOSE

Present findings to the user. **Nothing is changed until approved.**

### Show:

1. **Current Level** — e.g., "Level 2: Documented (72% → Level 3)"
2. **Pillar Scores** — table showing each pillar's pass rate
3. **Failing Criteria** — grouped by level, sorted by difficulty (Basic → Advanced)
4. **Remediation Plan** — for each failing criterion:
   - What file/config to generate
   - Effort estimate (Basic / Intermediate / Advanced)
   - What level it helps unlock
5. **Quick Wins** — the 3 easiest fixes that move the score the most
6. **What Passes Already** — celebrate what's already in place

### Ask:
```
Remediate all? [y / pick specific / skip level / explain <criterion>]
```

## Step 4 — REMEDIATE

For each approved fix, read the corresponding remediation template and generate the file.

### Read remediation templates from:
```
./templates/
```

### Template Selection

Each criterion has a matching remediation template (or set of templates) that is **stack-aware** — the template adapts to the detected language/framework.

Templates are organized by pillar:
```
./templates/
├── style/          # Linter, formatter, type checker, pre-commit configs
├── build/          # Build docs, dependency pinning, CI workflows
├── testing/        # Test configs, coverage configs, E2E setup
├── documentation/  # AGENTS.md, README sections, CONTRIBUTING.md
├── environment/    # Devcontainer, docker-compose, .env templates
├── observability/  # Logging configs, tracing setup
├── security/       # CODEOWNERS, secret scanning, branch protection docs
├── tasks/          # Issue templates, PR templates
└── product/        # Analytics setup guides
```

### Remediation Rules

1. **Never overwrite existing files** — if a config already exists, skip or merge
2. **Stack-aware generation** — use detected stack to pick the right template variant
3. **Minimal viable config** — generate the simplest config that passes the criterion
4. **Explain what was generated** — leave comments in generated files explaining purpose
5. **One commit per pillar** — group related changes for clean git history

## Step 5 — VERIFY

After remediation, verify the fixes work:

1. **Config validation** — run generated linter/formatter to confirm no errors
2. **Build check** — if build config was generated, run it
3. **Re-scan** — run the criteria checks again on the modified repo
4. **Score delta** — show before/after comparison

## Step 6 — REPORT

Write the readiness report to `.codestudio/readiness-report.md`:

```markdown
# Agent Readiness Report — {{PROJECT_NAME}}
Generated: {{DATE}}

## Level: {{LEVEL}} — {{LEVEL_NAME}}
Score: {{OVERALL_SCORE}}%

## Pillar Scores
| Pillar | Score | Status |
|--------|-------|--------|
| Style & Validation | 4/5 | ✅ |
| Build System | 3/4 | ⚠️ |
| ... | ... | ... |

## Criteria Detail
### Level 1 — Functional ({{L1_SCORE}}%)
| Criterion | Status | Evidence |
|-----------|--------|----------|
| Linter configured | ✅ | .eslintrc.json |
| ... | ... | ... |

## Remediation Applied
- [x] Generated .pre-commit-config.yaml
- [x] Generated AGENTS.md
- [ ] Branch protection (requires GitHub admin)

## Next Steps
1. ...
2. ...
3. ...
```

Also write `.codestudio/readiness-scores.json` for programmatic access:
```json
{
  "level": 2,
  "levelName": "Documented",
  "overall": 68,
  "levels": { "L1": 90, "L2": 72, "L3": 45, "L4": 20, "L5": 10 },
  "pillars": { ... },
  "criteria": [ ... ],
  "timestamp": "2026-09-02T10:00:00Z"
}
```

## Re-running

This skill is safe to re-run:
- **Scores update** to reflect current state
- **Already-passing criteria** are preserved
- **Previously generated files** are not overwritten
- **Report appends** a new entry to track progression over time

## Reference Documents

- **Criteria catalog**: `./references/criteria-catalog.md` — all criteria across 5 levels × 9 pillars
- **Detection rules**: `./references/detection-rules.md` — how to check each criterion
- **Remediation index**: `./references/remediation-index.md` — maps criteria to templates
