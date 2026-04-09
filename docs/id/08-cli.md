# Kiro CLI

Kiro CLI memungkinkan kamu berinteraksi dengan Kiro dari terminal — berguna untuk otomasi, git hooks, dan pipeline CI.

## Instalasi

Kiro CLI sudah termasuk dalam Kiro IDE. Setelah terinstall, command `kiro` tersedia di terminal.

Verifikasi:
```bash
kiro --version
```

## Penggunaan Dasar

```bash
kiro "<prompt>" [opsi]
```

### Tanya tentang file
```bash
kiro "jelaskan apa yang dilakukan file ini" --file src/index.ts
```

### Tanya tentang direktori
```bash
kiro "rangkum API routes yang ada" --dir apps/api/src/routes
```

### Tanya dengan konteks git diff
```bash
kiro "review perubahan ini" --diff
kiro "tulis commit message untuk perubahan ini" --diff
```

## Workflow Umum

### Auto-generate commit message
```bash
# Stage perubahan dulu
git add -A
kiro "tulis conventional commit message untuk staged changes ini" --diff
```

### Review sebelum commit
Tambahkan ke `.husky/pre-commit`:
```bash
#!/bin/sh
kiro "cek staged changes untuk: hardcoded secrets, missing error handling, console.log" --diff
```

### Generate dokumentasi
```bash
kiro "dokumentasikan semua fungsi yang diekspor dengan JSDoc" --file src/utils.ts
kiro "buat README untuk modul ini" --dir packages/shared
```

### Proses file secara batch
```bash
for f in apps/api/src/routes/*.ts; do
  kiro "tambah input validation ke semua route handler" --file "$f"
done
```

## Integrasi CI

### GitHub Actions — review PR
```yaml
name: Kiro Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Review PR
        run: kiro "review PR ini untuk masalah keamanan dan test yang kurang" --diff origin/main
```

### GitHub Actions — generate dokumentasi
```yaml
- name: Generate API docs
  run: kiro "generate dokumentasi API" --dir src/routes --output docs/api.md
```

## Referensi Flag

| Flag | Deskripsi |
|---|---|
| `--file <path>` | Sertakan file spesifik sebagai konteks |
| `--dir <path>` | Sertakan semua file dalam direktori |
| `--diff` | Sertakan git diff saat ini sebagai konteks |
| `--diff <ref>` | Diff terhadap ref tertentu (misal `origin/main`) |
| `--output <path>` | Tulis output ke file, bukan stdout |
| `--dry-run` | Preview perubahan tanpa menerapkannya |
| `--model <name>` | Tentukan model yang digunakan |

## Tips

- Pipe output ke file: `kiro "..." --file src/index.ts > review.md`
- Gunakan `--dry-run` sebelum menerapkan perubahan massal
- Di CI, set environment variable `KIRO_API_KEY` untuk autentikasi
- Kombinasikan dengan `jq` untuk memproses output terstruktur

::: tip Contoh nyata
Panduan ini sebagian ditulis menggunakan:
```bash
kiro "tulis dokumentasi untuk Kiro steering files berdasarkan contoh ini" --file .kiro/steering/context.md
```
:::
