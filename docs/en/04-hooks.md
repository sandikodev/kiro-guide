# Hooks

Hooks let you automate agent actions based on IDE events. When an event fires, Kiro runs the action automatically — no manual trigger needed.

## Hook File Location

Hooks live in `.kiro/hooks/` as JSON files.

```
.kiro/hooks/
  lint-on-save.json
  test-after-task.json
  review-writes.json
```

## Hook Schema

```json
{
  "name": "string",
  "version": "1.0.0",
  "when": {
    "type": "eventType",
    "patterns": ["*.ts"],
    "toolTypes": ["write"]
  },
  "then": {
    "type": "runCommand | askAgent",
    "command": "npm run lint",
    "prompt": "Review this change"
  }
}
```

## Event Types

| Event | When it fires |
|---|---|
| `fileEdited` | User saves a file |
| `fileCreated` | New file created |
| `fileDeleted` | File deleted |
| `promptSubmit` | Message sent to agent |
| `agentStop` | Agent finishes a task |
| `preToolUse` | Before a tool runs |
| `postToolUse` | After a tool runs |
| `preTaskExecution` | Before a spec task starts |
| `postTaskExecution` | After a spec task completes |
| `userTriggered` | Manual button click |

## Common Patterns

### Lint on save
```json
{
  "name": "Lint on Save",
  "version": "1.0.0",
  "when": {
    "type": "fileEdited",
    "patterns": ["*.ts", "*.svelte"]
  },
  "then": {
    "type": "runCommand",
    "command": "pnpm lint"
  }
}
```

### Run tests after spec task
```json
{
  "name": "Test After Task",
  "version": "1.0.0",
  "when": {
    "type": "postTaskExecution"
  },
  "then": {
    "type": "runCommand",
    "command": "pnpm test"
  }
}
```

### Review before writing files
```json
{
  "name": "Review Writes",
  "version": "1.0.0",
  "when": {
    "type": "preToolUse",
    "toolTypes": ["write"]
  },
  "then": {
    "type": "askAgent",
    "prompt": "Does this change follow our conventions in .kiro/steering/context.md?"
  }
}
```

## Tips

- Use `runCommand` for deterministic checks (lint, test, typecheck)
- Use `askAgent` when you need judgment (code review, convention check)
- `preToolUse` hooks can block actions — if the agent output says "denied", the tool won't run
- Keep hook commands fast — slow hooks interrupt your flow
- Commit hooks to git so the whole team benefits
