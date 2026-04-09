# Kiro CLI

The Kiro CLI lets you interact with Kiro from your terminal — useful for automation, git hooks, and CI pipelines.

## Installation

Kiro CLI is bundled with Kiro IDE. Once installed, the `kiro` command is available in your terminal.

Verify:
```bash
kiro --version
```

## Basic Usage

```bash
kiro "<prompt>" [options]
```

### Ask about a file
```bash
kiro "explain what this file does" --file src/index.ts
```

### Ask about a directory
```bash
kiro "summarize the API routes" --dir apps/api/src/routes
```

### Ask with git diff context
```bash
kiro "review these changes" --diff
kiro "write a commit message for these changes" --diff
```

## Common Workflows

### Auto-generate commit messages
```bash
# Stage your changes first
git add -A
kiro "write a conventional commit message for these staged changes" --diff
```

### Pre-commit review
Add to `.husky/pre-commit`:
```bash
#!/bin/sh
kiro "check staged changes for: hardcoded secrets, missing error handling, console.log statements" --diff
```

### Generate documentation
```bash
kiro "document all exported functions with JSDoc" --file src/utils.ts
kiro "generate a README for this module" --dir packages/shared
```

### Batch file processing
```bash
for f in apps/api/src/routes/*.ts; do
  kiro "add input validation to all route handlers" --file "$f"
done
```

## CI Integration

### GitHub Actions — PR review
```yaml
name: Kiro Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Review PR
        run: kiro "review this PR for security issues and missing tests" --diff origin/main
```

### GitHub Actions — doc generation
```yaml
- name: Generate API docs
  run: kiro "generate API documentation" --dir src/routes --output docs/api.md
```

## Flags Reference

| Flag | Description |
|---|---|
| `--file <path>` | Include a specific file as context |
| `--dir <path>` | Include all files in a directory |
| `--diff` | Include current git diff as context |
| `--diff <ref>` | Diff against a specific ref (e.g., `origin/main`) |
| `--output <path>` | Write output to a file instead of stdout |
| `--dry-run` | Preview what would change without applying |
| `--model <name>` | Specify which model to use |

## Tips

- Pipe output to files: `kiro "..." --file src/index.ts > review.md`
- Use `--dry-run` before applying bulk changes
- In CI, set `KIRO_API_KEY` environment variable for authentication
- Combine with `jq` for structured output processing

::: tip Real example
This guide was partially written using:
```bash
kiro "write documentation for Kiro steering files based on this example" --file .kiro/steering/context.md
```
:::
