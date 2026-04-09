# Spec Workflow

Specs are structured documents that guide feature development from requirements to implementation. They prevent the "just start coding" trap and keep complex features organized.

## Why Specs?

Without a spec:
- You start coding before understanding the full scope
- Requirements change mid-implementation
- No record of why decisions were made
- Hard to review or hand off

With a spec:
- Requirements are clear before a line of code is written
- Implementation is broken into reviewable tasks
- Decisions are documented
- Anyone can pick up where you left off

## Spec Files

Every spec lives in `.kiro/specs/{feature-name}/`:

```
.kiro/specs/
  user-authentication/
    requirements.md   # What needs to be built
    design.md         # How it will be built
    tasks.md          # Step-by-step implementation plan
```

## Two Workflows

### Requirements-First
Best when you know what you need but not how to build it.

```
Requirements → Design → Tasks → Implementation
```

### Design-First
Best when you have a clear technical vision and need to formalize it.

```
Design → Requirements → Tasks → Implementation
```

## Starting a Spec

In Spec Chat, describe what you want to build:

```
I want to add user authentication with email/password
```

Kiro will ask: requirements-first or design-first? Choose based on your situation.

## The Tasks File

After requirements and design are approved, Kiro generates `tasks.md`:

```markdown
- [ ] 1. Add UserSchema to packages/shared/src/index.ts
- [ ] 2. Write tests for auth endpoints
- [ ] 3. Implement POST /auth/login
- [ ] 4. Implement POST /auth/register
- [ ] 5. Add auth UI to +page.svelte
```

Tasks execute one by one. You review each before moving to the next.

## Task Status

| Symbol | Meaning |
|---|---|
| `- [ ]` | Not started |
| `- [-]` | In progress |
| `- [~]` | Queued |
| `- [x]` | Completed |
| `- [ ]*` | Optional (skippable) |

## Real Example

See the [ytmod project](https://github.com/sandikodev/ytmod) — all features were built using this workflow. The spec files are in `.kiro/specs/`.

## Tips

- One spec per feature — don't combine unrelated things
- Review requirements before moving to design
- Keep tasks small and atomic — one concern per task
- Optional tasks (`*`) are for nice-to-haves, not blockers
