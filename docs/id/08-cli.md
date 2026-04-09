# Kiro CLI

Kiro CLI membawa kemampuan Kiro ke terminal kamu — berguna untuk otomasi, scripting, dan workflow CI.

::: warning Dalam Pengembangan
Halaman ini akan diperbarui seiring fitur CLI terdokumentasi dari penggunaan nyata. Kontribusi disambut.
:::

## Penggunaan Dasar

```bash
kiro "jelaskan file ini" --file src/index.ts
kiro "tulis tests untuk fungsi ini" --file src/utils.ts
```

## Pola Umum

### Code review sebelum commit
```bash
# Di .husky/pre-commit
kiro "review staged changes untuk masalah" --diff
```

### Generate dokumentasi
```bash
kiro "dokumentasikan semua fungsi yang diekspor" --file src/index.ts --output docs/api.md
```

### Operasi batch
```bash
# Proses banyak file
for f in src/routes/*.ts; do
  kiro "tambah komentar JSDoc" --file "$f"
done
```

## Integrasi CI

Gunakan Kiro CLI di GitHub Actions untuk review otomatis:

```yaml
- name: Kiro Review
  run: kiro "review PR ini untuk masalah keamanan" --diff HEAD~1
```

## Tips

- Pipe output ke file untuk generate dokumentasi
- Gunakan `--dry-run` untuk preview perubahan sebelum diterapkan
- Kombinasikan dengan git hooks untuk pengecekan kualitas otomatis

---

*Tahu sesuatu tentang Kiro CLI yang belum ada di sini? [Kontribusi](https://github.com/sandikodev/kiro-guide/blob/main/CONTRIBUTING.md).*
