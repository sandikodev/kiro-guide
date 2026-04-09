# Kiro CLI

The Kiro CLI brings Kiro's capabilities to your terminal — useful for automation, scripting, and CI workflows.

::: warning Work in Progress
This page will be updated as CLI features are documented from real usage. Contributions welcome.
:::

## Basic Usage

```bash
kiro "explain this file" --file src/index.ts
kiro "write tests for this function" --file src/utils.ts
```

## Common Patterns

### Code review before commit
```bash
# In .husky/pre-commit
kiro "review staged changes for issues" --diff
```

### Generate docs
```bash
kiro "document all exported functions" --file src/index.ts --output docs/api.md
```

### Batch operations
```bash
# Process multiple files
for f in src/routes/*.ts; do
  kiro "add JSDoc comments" --file "$f"
done
```

## CI Integration

Use Kiro CLI in GitHub Actions for automated reviews:

```yaml
- name: Kiro Review
  run: kiro "review this PR for security issues" --diff HEAD~1
```

## Tips

- Pipe output to files for documentation generation
- Use `--dry-run` to preview changes before applying
- Combine with git hooks for automated quality checks

---

*Know something about Kiro CLI that's not here? [Contribute](https://github.com/sandikodev/kiro-guide/blob/main/CONTRIBUTING.md).*
