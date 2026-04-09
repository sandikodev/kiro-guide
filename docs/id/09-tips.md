# Tips & Pola

Pola yang dikumpulkan dari penggunaan Kiro nyata. Diperbarui seiring pola baru ditemukan.

## Manajemen Konteks

### Pola Backbone Session
Jaga satu sesi "utama" tetap bersih untuk keputusan high-level. Buat sesi terpisah untuk setiap fitur.

```
Main Session (backbone)
├── Feature Session — video title
├── Feature Session — pagination
└── Feature Session — transcriber
```

Sesi utama tetap bersih. Sesi fitur boleh berantakan — tidak masalah.

### Gunakan #File dan #Folder
Tarik konteks spesifik ke chat tanpa memuat semuanya:

```
#File apps/api/src/routes/comments.ts — kenapa ini return 403?
#Folder packages/shared — schema apa saja yang kita punya?
```

### Attach Gambar
Drag screenshot atau mockup langsung ke input chat. Berguna untuk:
- Bug UI ("ini yang saya lihat")
- Mockup desain ("buat sesuatu seperti ini")
- Screenshot error

## Pola Prompting

### Eksplisit tentang batasan
```
Refactor fungsi ini. JANGAN ubah signature fungsi.
Tambah error handling. JANGAN tambah dependency baru.
```

### Minta rencana dulu
```
Sebelum menulis kode apapun, jelaskan pendekatanmu untuk menambah pagination.
```

### Batasi scope task
```
Hanya ubah apps/api/src/routes/comments.ts. Jangan sentuh file lain.
```

### Minta perubahan minimal
```
Perbaiki hanya bug-nya. Jangan refactor hal lain.
```

## Pola Steering File

### Pisahkan per concern
```
.kiro/steering/
  context.md      # identitas project, stack, commands
  tdd.md          # workflow testing
  conventions.md  # code style, penamaan
  deploy.md       # deployment (tandai manual)
```

### Gunakan fileMatch untuk aturan spesifik bahasa
```yaml
---
inclusion: fileMatch
fileMatchPattern: '*.svelte'
---
# Aturan Svelte 5: gunakan $state, $derived, $effect — bukan stores
```

### Referensikan file secara dinamis
```markdown
Schema saat ini:
#[[file:packages/shared/src/index.ts]]
```

## Pola Spec

### Satu spec per fitur
Jangan gabungkan fitur yang tidak berkaitan dalam satu spec. Jaga tetap atomik.

### Tulis spec sebelum sesi
Memiliki file spec yang siap sebelum memulai sesi Spec Chat memberi Kiro konteks langsung dan menghasilkan output yang lebih baik.

### Gunakan task opsional untuk nice-to-have
```markdown
- [ ] 1. Fitur utama (wajib)
- [ ]* 2. Peningkatan nice-to-have (opsional)
```

## Kesalahan Umum

**Mulai tanpa steering files** — Kiro tidak punya konteks project. Setiap sesi dimulai dari nol.

**Menggunakan Spec Chat untuk perbaikan cepat** — Terlalu berlebihan. Gunakan Vibe Chat untuk apapun yang kurang dari 30 menit.

**Tidak review sebelum approve** — Spec Chat meminta persetujuan di setiap fase. Baca dokumennya sebelum bilang "oke lanjut".

**Hardcode secrets** — Selalu gunakan env vars. Kiro akan mengikuti aturan steering file kamu jika sudah diset.

**Task terlalu besar** — Pecah task menjadi unit kecil dan atomik. Satu concern per task.
