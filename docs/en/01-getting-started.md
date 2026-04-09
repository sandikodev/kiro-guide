# Getting Started with Kiro

Kiro is an AI-powered IDE built for developers. This guide covers everything from first setup to advanced workflows — built from real usage, not documentation copy-paste.

## What is Kiro?

Kiro is more than a chat assistant. It's an IDE that understands your codebase, follows your conventions, and helps you build features systematically.

Three main surfaces:

| Surface | What it does |
|---|---|
| **Kiro Chat** | Conversational coding — ask, edit, debug |
| **Kiro Spec** | Structured feature development with docs |
| **Kiro CLI** | Automation, scripting, CI integration |

## Installation

Download Kiro IDE from the official site and install it like any desktop app.

Once open, you'll see the chat panel on the left. That's where everything starts.

## First Session

Open a project folder, then start a chat session. Kiro will read your workspace automatically.

Try this first prompt:
```
Explain the structure of this project
```

Kiro will scan your files and give you a summary. This is your baseline — now you know what Kiro sees.

## Setting Up Context

Kiro works best when you give it persistent context via **steering files**. Without them, every session starts from zero.

Create `.kiro/steering/context.md` in your project:

```markdown
# Project Context

## Stack
- API: Hono + Cloudflare Workers
- Web: SvelteKit
- Shared: Zod schemas

## Commands
pnpm dev    # start dev server
pnpm test   # run tests
```

Now every session automatically knows your project. See [Steering Files](./03-steering) for the full guide.

## Two Chat Modes

Kiro has two modes — knowing which to use is key:

- **Vibe Chat** — free-form, for quick tasks and questions
- **Spec Chat** — structured, for building features with documentation

See [Vibe vs Spec Chat](./02-chat-modes) for details.

## Next Steps

1. [Vibe vs Spec Chat](./02-chat-modes) — learn the two modes
2. [Steering Files](./03-steering) — set up persistent context
3. [Hooks](./04-hooks) — automate repetitive actions
4. [Spec Workflow](./06-spec-workflow) — build features systematically
