# Contributing to Kiro Guide

Thanks for helping make this guide better. Contributions in any language are welcome.

## What You Can Contribute

- New documentation pages (any language)
- Translations of existing pages
- Real-world examples and templates
- Corrections and improvements
- New language support

## i18n Structure

Each language lives in its own folder under `docs/`:

```
docs/
  en/    # English
  id/    # Bahasa Indonesia
  ja/    # 日本語 (add yours here)
  zh/    # 中文
  ...
```

To add a new language:
1. Create `docs/{lang-code}/` folder
2. Copy `docs/en/README.md` as a starting point
3. Translate and adapt — don't just machine-translate, add local context
4. Add the language link to the root `README.md`

## Adding a New Page

1. Write the page in your language under `docs/{lang}/`
2. Add it to the table of contents in `docs/{lang}/README.md`
3. If writing in a non-English language, consider adding an English version too (or note it's pending translation)

## File Naming

- English: `01-getting-started.md`, `02-chat-modes.md`
- Indonesian: `01-memulai.md`, `02-mode-chat.md`
- Other languages: use natural names in that language

## Workflow

1. Fork the repo
2. Create a branch: `docs/add-japanese-translation` or `fix/en-steering-typo`
3. Make your changes
4. Open a PR with a clear description

## Style Guide

- Write from real experience — avoid generic advice
- Use code examples wherever possible
- Keep pages focused — one topic per file
- Short sentences, active voice
- Screenshots welcome (put in `docs/{lang}/assets/`)

## Questions

Open an issue or start a discussion. All languages welcome in issues too.
