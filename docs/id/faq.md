# FAQ

Pertanyaan umum dari penggunaan nyata.

## Umum

### Apa perbedaan Kiro dengan GitHub Copilot?

Copilot terutama untuk code completion inline. Kiro adalah IDE lengkap dengan chat, spec workflow, hooks, agents, dan steering files — ia memahami seluruh project kamu, bukan hanya file saat ini.

### Apakah saya perlu menjelaskan project saya setiap sesi?

Tidak — itulah fungsi steering files. Taruh konteks project di `.kiro/steering/context.md` dan akan dimuat otomatis setiap sesi.

### Bisakah Kiro mengakses internet?

Ya, Kiro bisa mencari web dan mengambil URL saat dibutuhkan. Berguna untuk mengecek versi library terbaru, membaca dokumentasi, atau meneliti solusi.

## Chat

### Kapan pakai Vibe Chat vs Spec Chat?

**Vibe Chat** — apapun yang kurang dari ~30 menit: bug fix, refactor, pertanyaan cepat, edit kecil.

**Spec Chat** — fitur baru, perubahan kompleks, apapun yang butuh dokumentasi dan kontrol step-by-step.

### Bagaimana menjaga main session tetap bersih?

Gunakan pola backbone session: satu main session untuk keputusan high-level, sesi terpisah untuk setiap fitur. Lihat [Tips & Pola](./09-tips).

### Kiro terus melupakan konteks di tengah sesi. Kenapa?

Sesi panjang mencapai batas konteks. Solusi:
- Jaga sesi fokus pada satu task
- Gunakan steering files untuk konteks persisten (bukan pesan chat)
- Mulai sesi baru untuk task baru

## Steering Files

### Berapa banyak steering file yang harus saya punya?

Mulai dengan satu (`context.md`). Tambah sesuai kebutuhan, pisahkan per concern. Kebanyakan project butuh 2-3 maksimal.

### Haruskah steering files di-commit ke git?

Ya. Mereka bagian dari project — seluruh tim mendapat manfaat dari konteks bersama.

### Bisakah steering files mereferensikan file lain?

Ya, gunakan sintaks `#[[file:path/to/file]]`. Berguna untuk menjaga schema atau config tetap sinkron dengan dokumentasi.

## Spec Workflow

### Berapa lama menulis spec?

Requirements: 5-15 menit bolak-balik dengan Kiro.
Design: 10-20 menit.
Tasks: di-generate otomatis, review butuh 2-5 menit.

### Bisakah saya skip fase design?

Untuk fitur sederhana, ya. Untuk apapun yang menyentuh banyak file atau membutuhkan keputusan arsitektur, jangan skip.

### Bagaimana kalau requirements berubah di tengah implementasi?

Update `requirements.md` dulu, lalu update `design.md` jika perlu, lalu update `tasks.md`. Jangan langsung ubah kode — jaga spec tetap sinkron.

## Testing

### Kiro terus menambah test yang tidak saya minta. Bagaimana menghentikannya?

Tambahkan ke steering file:
```markdown
## Testing
Jangan tambah test kecuali diminta secara eksplisit.
```

### Haruskah saya test komponen Svelte?

Umumnya tidak — unit testing komponen Svelte kompleks dan nilai rendah. Test logikanya saja (API handlers, utilities, schemas).

## Troubleshooting

### Kiro membuat perubahan ke file yang tidak saya minta

Eksplisit dalam prompt:
```
Hanya ubah apps/api/src/routes/comments.ts. Jangan sentuh file lain.
```

Atau tambahkan batasan ke steering file.

### Kiro mengabaikan steering files saya

Cek:
1. File ada di `.kiro/steering/` (bukan root `.kiro/`)
2. Tidak ada front-matter dengan `inclusion: manual` (file manual butuh `#` untuk diaktifkan)
3. File adalah Markdown yang valid

### Build gagal setelah perubahan Kiro

Jalankan diagnostik:
```bash
pnpm typecheck  # type errors
pnpm lint       # lint errors
pnpm test       # test failures
```

Bagikan output error ke Kiro di pesan baru — ia akan memperbaikinya.
