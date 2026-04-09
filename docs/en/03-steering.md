---
title: Steering Files
layout: default
parent: English
nav_order: 2
---

# Steering Files

Steering files are Markdown files in `.kiro/steering/` that automatically inject context into every Kiro session.

## Why They Matter

Without steering files, Kiro starts every session with zero project knowledge. With them, it always knows:
- What the project does
- What stack is being used
- What conventions to follow
- How to deploy, test, run the project

## Inclusion Modes

**Always included (default)** — injected into every session:
```
.kiro/steering/context.md
.kiro/steering/tdd.md
```

**File-match** — only when a matching file is in context:
```yaml
---
inclusion: fileMatch
fileMatchPattern: '*.svelte'
---
# Svelte conventions...
```

**Manual** — only when explicitly referenced with `#`:
```yaml
---
inclusion: manual
---
# Advanced deployment guide...
```

## What to Put in Steering Files

| File | Content |
|---|---|
| `context.md` | Project identity, stack, structure, env vars, commands |
| `tdd.md` | Development workflow, testing conventions |
| `conventions.md` | Code style, naming, commit format |
| `deploy.md` | Deployment steps (mark as manual if complex) |

## Tips

- Keep steering files concise — they consume context tokens every session
- Split by concern: one file per topic
- Reference other files using `#[[file:path/to/file]]` for dynamic content
- Commit steering files to git so the whole team benefits
