# FAQ

Common questions from real usage.

## General

### What's the difference between Kiro and GitHub Copilot?

Copilot is primarily inline code completion. Kiro is a full IDE with chat, spec workflow, hooks, agents, and steering files — it understands your entire project, not just the current file.

### Do I need to re-explain my project every session?

No — that's what steering files are for. Put your project context in `.kiro/steering/context.md` and it's automatically loaded every session.

### Can Kiro access the internet?

Yes, Kiro can search the web and fetch URLs when needed. Useful for checking latest library versions, reading documentation, or researching solutions.

## Chat

### When should I use Vibe Chat vs Spec Chat?

**Vibe Chat** — anything under ~30 minutes: bug fixes, refactors, quick questions, small edits.

**Spec Chat** — new features, complex changes, anything that needs documentation and step-by-step control.

### How do I keep my main session clean?

Use the backbone session pattern: one main session for high-level decisions, separate sessions for each feature. See [Tips & Patterns](./09-tips).

### Kiro keeps forgetting context mid-session. Why?

Long sessions hit context limits. Solutions:
- Keep sessions focused on one task
- Use steering files for persistent context (not chat messages)
- Start a new session for a new task

## Steering Files

### How many steering files should I have?

Start with one (`context.md`). Add more as needed, split by concern. Most projects need 2-3 max.

### Should I commit steering files to git?

Yes. They're part of the project — the whole team benefits from shared context.

### Can steering files reference other files?

Yes, use `#[[file:path/to/file]]` syntax. Useful for keeping schemas or configs in sync with documentation.

## Spec Workflow

### How long should a spec take to write?

Requirements: 5-15 minutes of back-and-forth with Kiro.
Design: 10-20 minutes.
Tasks: auto-generated, review takes 2-5 minutes.

### Can I skip the design phase?

For simple features, yes. For anything touching multiple files or requiring architectural decisions, don't skip it.

### What if requirements change mid-implementation?

Update `requirements.md` first, then update `design.md` if needed, then update `tasks.md`. Don't just start changing code — keep the spec in sync.

## Testing

### Kiro keeps adding tests I didn't ask for. How do I stop it?

Add to your steering file:
```markdown
## Testing
Do NOT add tests unless explicitly asked.
```

### Should I test Svelte components?

Generally no — unit testing Svelte components is complex and low value. Test the logic (API handlers, utilities, schemas) instead.

## Troubleshooting

### Kiro is making changes to files I didn't ask it to touch

Be explicit in your prompt:
```
Only change apps/api/src/routes/comments.ts. Do not touch any other files.
```

Or add a constraint to your steering file.

### Kiro is ignoring my steering files

Check:
1. File is in `.kiro/steering/` (not `.kiro/` root)
2. No front-matter with `inclusion: manual` (manual files need `#` to activate)
3. File is valid Markdown

### Build is failing after Kiro's changes

Run diagnostics:
```bash
pnpm typecheck  # type errors
pnpm lint       # lint errors
pnpm test       # test failures
```

Share the error output with Kiro in a new message — it will fix it.
