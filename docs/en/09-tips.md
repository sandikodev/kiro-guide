# Tips & Patterns

Collected patterns from real Kiro usage. Updated as new patterns emerge.

## Context Management

### The Backbone Session Pattern
Keep one "main" session clean for high-level decisions. Spin up separate sessions for each feature.

```
Main Session (backbone)
├── Feature Session — video title
├── Feature Session — pagination
└── Feature Session — transcriber
```

The main session stays uncluttered. Feature sessions can be messy — that's fine.

### Use #File and #Folder
Pull specific context into chat without loading everything:

```
#File apps/api/src/routes/comments.ts — why is this returning 403?
#Folder packages/shared — what schemas do we have?
```

### Attach Images
Drag screenshots or mockups directly into the chat input. Useful for:
- UI bugs ("this is what I'm seeing")
- Design mockups ("build something like this")
- Error screenshots

## Prompting Patterns

### Be explicit about constraints
```
Refactor this function. Do NOT change the function signature.
Add error handling. Do NOT add new dependencies.
```

### Ask for a plan first
```
Before writing any code, explain your approach for adding pagination.
```

### Scope the task
```
Only change apps/api/src/routes/comments.ts. Don't touch other files.
```

### Request minimal changes
```
Fix only the bug. Don't refactor anything else.
```

## Steering File Patterns

### Split by concern
```
.kiro/steering/
  context.md      # project identity, stack, commands
  tdd.md          # testing workflow
  conventions.md  # code style, naming
  deploy.md       # deployment (mark as manual)
```

### Use fileMatch for language-specific rules
```yaml
---
inclusion: fileMatch
fileMatchPattern: '*.svelte'
---
# Svelte 5 rules: use $state, $derived, $effect — not stores
```

### Reference files dynamically
```markdown
Current schema:
#[[file:packages/shared/src/index.ts]]
```

## Spec Patterns

### One spec per feature
Don't combine unrelated features in one spec. Keep them atomic.

### Write the spec before the session
Having a spec file ready before starting a Spec Chat session gives Kiro immediate context and produces better output.

### Use optional tasks for nice-to-haves
```markdown
- [ ] 1. Core feature (required)
- [ ]* 2. Nice-to-have enhancement (optional)
```

## Common Mistakes

**Starting without steering files** — Kiro has no project context. Every session starts from scratch.

**Using Spec Chat for quick fixes** — Overkill. Use Vibe Chat for anything under 30 minutes.

**Not reviewing before approving** — Spec Chat asks for approval at each phase. Actually read the docs before saying "looks good".

**Hardcoding secrets** — Always use env vars. Kiro will follow your steering file rules if you set them.

**Giant tasks** — Break tasks into small, atomic units. One concern per task.
