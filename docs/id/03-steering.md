# Steering Files

Steering files adalah file Markdown di `.kiro/steering/` yang otomatis menyuntikkan konteks ke setiap sesi Kiro.

## Kenapa Penting

Tanpa steering files, Kiro memulai setiap sesi tanpa pengetahuan apapun tentang project. Dengan steering files, Kiro selalu tahu:
- Apa yang dilakukan project ini
- Stack apa yang digunakan
- Konvensi apa yang harus diikuti
- Cara deploy, test, jalankan project

## Mode Inclusion

**Always included (default)** — disuntikkan ke setiap sesi:
```
.kiro/steering/context.md
.kiro/steering/tdd.md
```

**File-match** — hanya saat file yang cocok ada di konteks:
```yaml
---
inclusion: fileMatch
fileMatchPattern: '*.svelte'
---
# Konvensi Svelte...
```

**Manual** — hanya saat direferensikan eksplisit dengan `#`:
```yaml
---
inclusion: manual
---
# Panduan deployment lanjutan...
```

## Apa yang Dimasukkan ke Steering Files

`context.md` — identitas project, stack, struktur, env vars, commands
`tdd.md` — workflow development, konvensi testing
`conventions.md` — code style, penamaan, format commit
`deploy.md` — langkah deployment (tandai manual kalau kompleks)

## Contoh: context.md

```markdown
# Project Context

## Stack
- API: Hono + Cloudflare Workers
- Web: SvelteKit + GitHub Pages
- Shared: Zod schemas di packages/shared/

## Commands
pnpm dev      # api :8787 + web :5173
pnpm test     # jalankan semua test
pnpm deploy   # deploy api + web
```

## Tips

- Jaga steering files tetap ringkas — mereka mengonsumsi token konteks setiap sesi
- Pisahkan per topik: satu file per concern
- Referensikan file lain dengan `#[[file:path/to/file]]` untuk konten dinamis
- Commit steering files ke git supaya seluruh tim dapat manfaatnya
