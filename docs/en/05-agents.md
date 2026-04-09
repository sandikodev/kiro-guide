# Agents

Agents are custom AI personas scoped to a specific project or task. They carry pre-loaded context so you don't have to repeat yourself every session.

## Agent File Location

```
.kiro/agents/
  my-project.json
```

## Agent Schema

```json
{
  "name": "my-project",
  "description": "Short description shown in the agent picker",
  "prompt": "System prompt — what this agent knows and how it behaves",
  "tools": ["read", "write", "shell", "grep", "glob", "thinking"]
}
```

## Available Tools

| Tool | What it does |
|---|---|
| `read` | Read files |
| `write` | Create and edit files |
| `shell` | Run shell commands |
| `grep` | Search file contents |
| `glob` | Find files by pattern |
| `thinking` | Extended reasoning before responding |

## Example: Project Agent

```json
{
  "name": "ytmod",
  "description": "YouTube tools project agent",
  "prompt": "You are working on ytmod — a YouTube tools monorepo.\n\nStack: SvelteKit + Hono API on Cloudflare Workers + Zod shared schemas.\n\nRules:\n- Never hardcode secrets or API keys\n- Schema changes start in packages/shared/src/index.ts\n- Conventional commits: feat/fix/docs/chore/test\n\nDev: pnpm dev\nTest: pnpm test",
  "tools": ["read", "write", "shell", "grep", "glob"]
}
```

## Agent vs Steering Files

Both inject context — but differently:

| | Agent | Steering File |
|---|---|---|
| Scope | Per-agent session | All sessions |
| Activation | Select agent explicitly | Automatic |
| Best for | Project-specific persona | Global conventions |

Use steering files for things every session needs. Use agents for project-specific context that you want to activate on demand.

## Tips

- Keep the prompt focused — one agent per project or domain
- Include the stack, key rules, and common commands
- Don't duplicate what's already in steering files
- Commit agent files to git — they're part of the project
