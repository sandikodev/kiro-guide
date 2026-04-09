# Kiro Chat — Vibe Chat vs Spec Chat

Kiro has two chat modes. Knowing when to use each one is key to working efficiently.

## Vibe Chat

Free-form conversation. Use it for:

- Quick questions about the codebase
- Small edits, refactors, bug fixes
- Exploring ideas before committing to a spec
- Running commands, checking output
- Anything that doesn't need formal documentation

**Example prompts:**
```
Fix the type error in apps/api/src/routes/comments.ts
Explain how the rate limiting works
Refactor fetchComments to use async/await properly
```

## Spec Chat

Structured, document-driven development. Use it for:

- New features that need requirements and design
- Complex changes that span multiple files
- Work that needs to be tracked and reviewable
- Anything you want to execute step-by-step with control

**Process:**
1. Describe the feature
2. Kiro creates a requirements or design doc
3. You review and approve
4. Kiro generates implementation tasks
5. Tasks execute one by one — you stay in control

**Example prompts:**
```
I want to add a transcript downloader feature
Build a pagination system for the comments list
```

## The Backbone Session Pattern

Keep one "main" chat session clean — use it only for:

- High-level decisions
- Architecture discussions
- Reviewing what was built in other sessions
- Updating steering files and specs

Spin up separate sessions for each feature or task. This keeps context focused and prevents the main session from getting polluted with implementation details.

```
Main Session (backbone)
├── Feature Session 1 — video title
├── Feature Session 2 — pagination
├── Feature Session 3 — filter UI
└── Feature Session 4 — transcriber
```

## Context Tips

Use `#File` to pull specific files into context:
```
#File apps/api/src/routes/comments.ts — why is this returning 403?
```

Use `#Folder` for broader context:
```
#Folder packages/shared — what schemas do we have?
```

Attach images by dragging into the chat input — useful for UI mockups or error screenshots.
