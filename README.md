# Agent Readiness

A Code Studio skill that evaluates and remediates a repository's readiness for autonomous AI agent development. Based on the [Factory AI Agent Readiness Model](https://docs.factory.ai/agent-readiness/overview).

## What It Does

Point it at any repo and it will:

1. **Scan** — detect stack, tooling, and infrastructure across 9 technical pillars
2. **Score** — evaluate against 5 readiness levels (80% gated progression)
3. **Propose** — show gaps, prioritized fixes, and what each fix unlocks
4. **Remediate** — generate missing files, configs, and documentation
5. **Verify** — confirm generated configs work
6. **Report** — write scores and evidence to `.codestudio/readiness-report.md`

## The 5 Levels

```
Level 1: Functional    → Code runs, basic tooling exists
Level 2: Documented    → Processes written down, automation in place
Level 3: Standardized  → Security, observability, integration tests
Level 4: Optimized     → Fast feedback, measurement, data-driven
Level 5: Autonomous    → Self-improving, deployment, orchestration
```

Pass 80% of Level N criteria → unlock Level N+1.

## The 9 Pillars

| Pillar | Why Agents Need It |
|--------|-------------------|
| Style & Validation | No wasted cycles on syntax/style errors |
| Build System | Know exactly what commands to run |
| Testing | Fast feedback on whether changes work |
| Documentation | Written instructions replace tribal knowledge |
| Development Environment | Reproducible = no "works on my machine" |
| Debugging & Observability | Runtime visibility into failures |
| Security | Guardrails prevent security issues |
| Task Discovery | Structured issues help agents find work |
| Product & Experimentation | Measure whether features are used |

## 50 Criteria, 74% Auto-Remediable

Each level has 10 criteria. The skill can automatically fix 74% of them by generating configs, templates, and documentation.

| Type | Count | What It Does |
|------|-------|-------------|
| Generate | 27 | Creates new files (AGENTS.md, CI, devcontainer, etc.) |
| Augment | 10 | Adds content to existing files (README sections, .gitignore patterns) |
| Guide | 10 | Provides instructions in the report |
| Manual | 3 | Requires human action (SaaS configuration) |

## Usage

Tell the agent:
- "check readiness" or "readiness report"
- "make this repo agent-ready"
- "prepare for autonomous development"

## Output

After running, you get:

```
.codestudio/
├── readiness-report.md      # Human-readable report with scores
└── readiness-scores.json    # Machine-readable scores for tracking
```

Plus any remediation files generated (AGENTS.md, CI workflow, devcontainer, etc.)

## File Structure

```
agent-readiness/
├── SKILL.md                                # Entry point (6-step process)
├── references/
│   ├── criteria-catalog.md                 # 50 criteria across 5 levels × 9 pillars
│   ├── detection-rules.md                  # How to check each criterion
│   └── remediation-index.md                # Maps criteria to fix templates
└── templates/
    ├── readiness-report.tmpl               # Report template
    ├── documentation/                      # AGENTS.md, README, CONTRIBUTING, ARCHITECTURE, RUNBOOK
    ├── environment/                        # Devcontainer, .env.example
    ├── build/                              # CI workflow, Dependabot
    ├── security/                           # CODEOWNERS, SECURITY.md, gitleaks, CodeQL
    └── tasks/                              # PR template, issue templates, auto-labeler
```

## Installation

```bash
# Clone into skills directory
git clone <repo-url> ~/.agents/skills/agent-readiness

# Or symlink
ln -s /path/to/agent-readiness ~/.agents/skills/agent-readiness
```

## License

MIT
