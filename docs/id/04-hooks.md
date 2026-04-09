# Hooks

Hooks memungkinkan kamu mengotomasi aksi agent berdasarkan event IDE. Ketika event terjadi, Kiro menjalankan aksi secara otomatis — tanpa trigger manual.

## Lokasi File Hook

Hook berada di `.kiro/hooks/` sebagai file JSON.

```
.kiro/hooks/
  lint-on-save.json
  test-after-task.json
  review-writes.json
```

## Schema Hook

```json
{
  "name": "string",
  "version": "1.0.0",
  "when": {
    "type": "eventType",
    "patterns": ["*.ts"],
    "toolTypes": ["write"]
  },
  "then": {
    "type": "runCommand | askAgent",
    "command": "npm run lint",
    "prompt": "Review perubahan ini"
  }
}
```

## Jenis Event

| Event | Kapan terjadi |
|---|---|
| `fileEdited` | User menyimpan file |
| `fileCreated` | File baru dibuat |
| `fileDeleted` | File dihapus |
| `promptSubmit` | Pesan dikirim ke agent |
| `agentStop` | Agent selesai mengerjakan task |
| `preToolUse` | Sebelum tool dijalankan |
| `postToolUse` | Setelah tool dijalankan |
| `preTaskExecution` | Sebelum spec task dimulai |
| `postTaskExecution` | Setelah spec task selesai |
| `userTriggered` | Klik tombol manual |

## Pola Umum

### Lint saat save
```json
{
  "name": "Lint on Save",
  "version": "1.0.0",
  "when": {
    "type": "fileEdited",
    "patterns": ["*.ts", "*.svelte"]
  },
  "then": {
    "type": "runCommand",
    "command": "pnpm lint"
  }
}
```

### Jalankan test setelah spec task
```json
{
  "name": "Test After Task",
  "version": "1.0.0",
  "when": {
    "type": "postTaskExecution"
  },
  "then": {
    "type": "runCommand",
    "command": "pnpm test"
  }
}
```

### Review sebelum menulis file
```json
{
  "name": "Review Writes",
  "version": "1.0.0",
  "when": {
    "type": "preToolUse",
    "toolTypes": ["write"]
  },
  "then": {
    "type": "askAgent",
    "prompt": "Apakah perubahan ini mengikuti konvensi di .kiro/steering/context.md?"
  }
}
```

## Tips

- Gunakan `runCommand` untuk pengecekan deterministik (lint, test, typecheck)
- Gunakan `askAgent` ketika butuh penilaian (code review, cek konvensi)
- Hook `preToolUse` bisa memblokir aksi — jika output agent bilang "ditolak", tool tidak akan jalan
- Jaga command hook tetap cepat — hook yang lambat mengganggu flow
- Commit hook ke git supaya seluruh tim dapat manfaatnya
