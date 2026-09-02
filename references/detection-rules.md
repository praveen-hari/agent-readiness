# Detection Rules

How to check each criterion. The agent uses these rules during the SCAN step.

## Stack Detection

Before checking criteria, detect the primary stack:

| Signal | Stack | Base Image (for devcontainer) |
|--------|-------|-------------------------------|
| `package.json` | Node.js | `node:20` / `mcr.microsoft.com/devcontainers/javascript-node` |
| `package.json` + `next.config.*` | Next.js | `node:20` |
| `package.json` + `vite.config.*` | Vite/React | `node:20` |
| `package.json` + `angular.json` | Angular | `node:20` |
| `tsconfig.json` | TypeScript (modifier) | — |
| `requirements.txt` or `pyproject.toml` | Python | `python:3.12` / `mcr.microsoft.com/devcontainers/python` |
| `Cargo.toml` | Rust | `rust:1.80` / `mcr.microsoft.com/devcontainers/rust` |
| `go.mod` | Go | `golang:1.22` / `mcr.microsoft.com/devcontainers/go` |
| `*.csproj` or `*.sln` | .NET | `mcr.microsoft.com/dotnet/sdk:8.0` |
| `pom.xml` or `build.gradle` | Java/Kotlin | `eclipse-temurin:21` / `mcr.microsoft.com/devcontainers/java` |
| `Gemfile` | Ruby | `ruby:3.3` / `mcr.microsoft.com/devcontainers/ruby` |
| `composer.json` | PHP | `php:8.3` |
| `mix.exs` | Elixir | `elixir:1.17` |

Record: `STACK`, `LANGUAGE`, `FRAMEWORK`, `BASE_IMAGE`.

## Monorepo Detection

Check for workspace configurations:
- `package.json` with `workspaces` field → npm/yarn workspaces
- `pnpm-workspace.yaml` → pnpm workspaces
- `nx.json` → Nx monorepo
- `turbo.json` → Turborepo
- Multiple `go.mod` files → Go multi-module
- Multiple `*.csproj` files → .NET multi-project

If monorepo: discover each sub-application and evaluate app-scoped criteria per-app.

---

## Per-Criterion Detection

### Level 1 — Functional

**L1-SV-01: Linter configured**
```
Check for files:
  Node.js:  .eslintrc.* | eslint.config.* | biome.json | "eslint" in package.json devDeps
  Python:   ruff.toml | [tool.ruff] in pyproject.toml | .flake8 | .pylintrc
  Rust:     clippy is built-in → auto-pass
  Go:       .golangci.yml | golangci-lint in Makefile
  .NET:     .editorconfig with dotnet rules | dotnet format available
  Java:     checkstyle.xml | spotless in build.gradle | .editorconfig
  Ruby:     .rubocop.yml
  PHP:      phpcs.xml | phpstan.neon
```

**L1-SV-02: Type checker configured**
```
  Node.js:  tsconfig.json (TypeScript) | jsconfig.json (JS with types) | "typescript" in deps
  Python:   mypy.ini | [tool.mypy] in pyproject.toml | pyrightconfig.json | "mypy" or "pyright" in deps
  Rust:     built-in → auto-pass
  Go:       built-in → auto-pass
  .NET:     built-in → auto-pass
  Java:     built-in → auto-pass
  Ruby:     sorbet/tapioca in Gemfile | .rbi files
  PHP:      phpstan.neon | psalm.xml
```

**L1-SV-03: Code formatter configured**
```
  Node.js:  .prettierrc.* | biome.json | dprint.json
  Python:   [tool.black] in pyproject.toml | ruff format configured | .style.yapf
  Rust:     rustfmt.toml OR built-in → auto-pass
  Go:       gofmt built-in → auto-pass
  .NET:     dotnet format available → auto-pass
  Java:     google-java-format in CI | spotless | .editorconfig
  Ruby:     .rubocop.yml (doubles as formatter)
```

**L1-BS-01: Build command exists**
```
  Node.js:  "build" in package.json scripts
  Python:   build system in pyproject.toml | setup.py | Makefile with build target
  Rust:     Cargo.toml exists → cargo build → auto-pass
  Go:       go.mod exists → go build → auto-pass
  .NET:     *.csproj exists → dotnet build → auto-pass
  Java:     pom.xml → mvn compile | build.gradle → gradle build
```

**L1-BS-02: Dependencies pinned**
```
  Check for lock files:
  package-lock.json | yarn.lock | pnpm-lock.yaml | Pipfile.lock | poetry.lock |
  uv.lock | Cargo.lock | go.sum | packages.lock.json (NuGet)
```

**L1-TS-01: Unit tests exist**
```
  Search for test files:
  *.test.ts | *.test.js | *.spec.ts | *.spec.js |
  test_*.py | *_test.py | conftest.py |
  *_test.go |
  *_test.rs | #[cfg(test)] in .rs files |
  *Test.java | *Spec.java |
  *_spec.rb | *_test.rb |
  At least 1 file must exist.
```

**L1-TS-02: Test command runnable**
```
  Node.js:  "test" in package.json scripts
  Python:   pytest importable | unittest discoverable | "test" in Makefile
  Rust:     cargo test → auto-pass
  Go:       go test → auto-pass
  .NET:     dotnet test → auto-pass
  Java:     mvn test | gradle test
```

**L1-DC-01: README exists**
```
  README.md | README.rst | README.txt at repo root
  Must have >10 lines (not just a title)
```

**L1-DC-02: Setup instructions in README**
```
  Scan README for headings containing: setup | install | getting started | quick start |
  prerequisites | requirements | how to run | development
  OR code blocks with install/setup commands (npm install, pip install, etc.)
```

**L1-BS-03: Source control initialized**
```
  .git directory exists
```

---

### Level 2 — Documented

**L2-DC-01: AGENTS.md exists**
```
  AGENTS.md at repo root
  Should contain: setup commands, test commands, lint commands, project structure
```

**L2-DC-02: Contributing guide**
```
  CONTRIBUTING.md at repo root
  OR README has "## Contributing" or "## Contribution" section
```

**L2-SV-01: Pre-commit hooks**
```
  .husky/ directory | .husky/pre-commit file
  .pre-commit-config.yaml
  lefthook.yml
  "lint-staged" in package.json
```

**L2-DE-01: Devcontainer**
```
  .devcontainer/devcontainer.json
```

**L2-DE-02: Environment template**
```
  .env.example | .env.template | .env.sample
  Only required if .env is in .gitignore (meaning env vars are used)
```

**L2-SC-01: Branch protection documented**
```
  Scan AGENTS.md, CONTRIBUTING.md, README for:
  "branch protection" | "required review" | "merge policy" | "main branch" | "protected branch"
```

**L2-SC-02: Secrets not in source**
```
  .gitignore must include: .env | *.key | *.pem | *.secret
  AND: no .env file tracked in git (check git ls-files)
```

**L2-TD-01: PR template**
```
  .github/pull_request_template.md
  .github/PULL_REQUEST_TEMPLATE/*.md
```

**L2-TD-02: Issue templates**
```
  .github/ISSUE_TEMPLATE/ directory with ≥1 .md or .yml file
```

**L2-BS-01: CI pipeline exists**
```
  .github/workflows/*.yml (any file)
  .gitlab-ci.yml
  Jenkinsfile
  .circleci/config.yml
  .travis.yml
  azure-pipelines.yml
  bitbucket-pipelines.yml
```

---

### Level 3–5

For brevity, Level 3–5 criteria follow the same pattern. The agent should:
1. Read the criterion from the catalog
2. Check for the specific files/configs listed in "Passes When"
3. For dependency-based checks: scan lock files or manifest files for the library name
4. For CI-based checks: scan workflow YAML for relevant step commands
5. For content-based checks: scan file contents for keywords

### Key Detection Patterns

**Dependency check** (does library X exist?):
```
  Node.js:  grep for "library" in package.json dependencies/devDependencies
  Python:   grep for "library" in requirements.txt | pyproject.toml [project.dependencies] | Pipfile
  Rust:     grep for "library" in Cargo.toml [dependencies]
  Go:       grep for "library" in go.mod
  .NET:     grep for "library" in *.csproj <PackageReference>
  Java:     grep for "library" in pom.xml <dependency> | build.gradle dependencies
  Ruby:     grep for "library" in Gemfile
```

**CI step check** (does CI run command X?):
```
  Scan .github/workflows/*.yml for:
    - run: containing the command
    - uses: action that implies the command
  Scan .gitlab-ci.yml script: sections
  Scan Jenkinsfile sh/bat steps
```

**File content check** (does file contain keyword?):
```
  Read the file and search for the keyword/pattern.
  Use case-insensitive matching.
  For headings: match ## keyword or # keyword at line start.
```
