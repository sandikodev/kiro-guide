# Kiro Guide

[![Deploy](https://github.com/sandikodev/kiro-guide/actions/workflows/deploy.yml/badge.svg)](https://github.com/sandikodev/kiro-guide/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](./CONTRIBUTING.md)

Community-driven guide to Kiro IDE, Chat, and CLI — built from real-world usage, not marketing copy.

**🌐 [sandikodev.github.io/kiro-guide](https://sandikodev.github.io/kiro-guide)**

> 📖 Baca dalam [Bahasa Indonesia](https://sandikodev.github.io/kiro-guide/id/) | Read in [English](https://sandikodev.github.io/kiro-guide/en/)

---

## What's Inside

- **Kiro Chat** — Vibe Chat vs Spec Chat, context management, backbone session pattern
- **Steering Files** — persistent context injection, inclusion modes, best practices
- **Hooks** — event-driven automation, common patterns
- **Agents** — custom AI personas scoped to projects
- **Spec Workflow** — requirements-first, design-first, bugfix methodology
- **TDD with Kiro** — schema-first development, property-based testing
- **Kiro CLI** — terminal usage, CI integration
- **Real World Example** — complete feature walkthrough from spec to deploy
- **FAQ** — common questions from real usage

## Contributing

All contributions welcome — new pages, translations, corrections, examples.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Adding a new language

1. Create `docs/{lang-code}/` folder
2. Copy `docs/en/` as starting point
3. Translate and adapt
4. Add language to `docs/.vitepress/config.mts`
5. Open a PR

## Local Development

```bash
pnpm install
pnpm dev      # localhost:5173
pnpm build    # production build
```

## License

MIT — see [LICENSE](./LICENSE)
