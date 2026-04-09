
# Kiro Chat — Vibe Chat vs Spec Chat

Kiro punya dua mode chat. Tahu kapan menggunakan masing-masing adalah kunci efisiensi.

## Vibe Chat

Percakapan bebas. Gunakan untuk:

- Pertanyaan cepat tentang codebase
- Edit kecil, refactor, bug fix
- Eksplorasi ide sebelum membuat spec
- Menjalankan command, cek output
- Apapun yang tidak butuh dokumentasi formal

**Contoh prompt:**
```
Fix the type error in apps/api/src/routes/comments.ts
Jelaskan bagaimana rate limiting bekerja
Refactor fetchComments supaya lebih bersih
```

## Spec Chat

Development terstruktur berbasis dokumen. Gunakan untuk:

- Fitur baru yang butuh requirements dan design
- Perubahan kompleks yang menyentuh banyak file
- Pekerjaan yang perlu di-track dan bisa di-review
- Apapun yang ingin dikerjakan step-by-step dengan kontrol penuh

**Prosesnya:**
1. Deskripsikan fitur
2. Kiro buat dokumen requirements atau design
3. Kamu review dan approve
4. Kiro generate implementation tasks
5. Tasks dieksekusi satu per satu — kamu tetap in control

**Contoh prompt:**
```
Saya ingin tambah fitur transcript downloader
Buat sistem pagination untuk daftar komentar
```

## Pola Backbone Session

Jaga satu "main" chat session tetap bersih — gunakan hanya untuk:

- Keputusan high-level
- Diskusi arsitektur
- Review apa yang dibangun di session lain
- Update steering files dan specs

Buat session terpisah untuk setiap fitur atau task. Ini menjaga konteks tetap fokus dan mencegah main session terkontaminasi detail implementasi.

```
Main Session (backbone)
├── Feature Session 1 — video title
├── Feature Session 2 — pagination
├── Feature Session 3 — filter UI
└── Feature Session 4 — transcriber
```

## Tips Konteks

Gunakan `#File` untuk menarik file spesifik ke konteks:
```
#File apps/api/src/routes/comments.ts — kenapa ini return 403?
```

Gunakan `#Folder` untuk konteks lebih luas:
```
#Folder packages/shared — schema apa saja yang kita punya?
```

Drag gambar ke chat input untuk attach — berguna untuk mockup UI atau screenshot error.
