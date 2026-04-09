# Agents

Agent adalah persona AI kustom yang di-scope ke project atau task tertentu. Mereka membawa konteks yang sudah di-load sehingga kamu tidak perlu mengulang diri setiap sesi.

## Lokasi File Agent

```
.kiro/agents/
  my-project.json
```

## Schema Agent

```json
{
  "name": "my-project",
  "description": "Deskripsi singkat yang ditampilkan di pemilih agent",
  "prompt": "System prompt — apa yang diketahui agent ini dan bagaimana perilakunya",
  "tools": ["read", "write", "shell", "grep", "glob", "thinking"]
}
```

## Tool yang Tersedia

| Tool | Fungsi |
|---|---|
| `read` | Baca file |
| `write` | Buat dan edit file |
| `shell` | Jalankan shell command |
| `grep` | Cari isi file |
| `glob` | Temukan file berdasarkan pola |
| `thinking` | Penalaran diperluas sebelum merespons |

## Contoh: Project Agent

```json
{
  "name": "ytmod",
  "description": "YouTube tools project agent",
  "prompt": "Kamu bekerja di ytmod — monorepo YouTube tools.\n\nStack: SvelteKit + Hono API on Cloudflare Workers + Zod shared schemas.\n\nAturan:\n- Jangan hardcode secrets atau API keys\n- Perubahan schema dimulai dari packages/shared/src/index.ts\n- Conventional commits: feat/fix/docs/chore/test\n\nDev: pnpm dev\nTest: pnpm test",
  "tools": ["read", "write", "shell", "grep", "glob"]
}
```

## Agent vs Steering Files

Keduanya menyuntikkan konteks — tapi dengan cara berbeda:

| | Agent | Steering File |
|---|---|---|
| Scope | Per-agent session | Semua sesi |
| Aktivasi | Pilih agent secara eksplisit | Otomatis |
| Terbaik untuk | Persona spesifik project | Konvensi global |

Gunakan steering files untuk hal yang dibutuhkan setiap sesi. Gunakan agent untuk konteks spesifik project yang ingin diaktifkan sesuai kebutuhan.

## Tips

- Jaga prompt tetap fokus — satu agent per project atau domain
- Sertakan stack, aturan utama, dan command umum
- Jangan duplikasi apa yang sudah ada di steering files
- Commit file agent ke git — mereka bagian dari project
