# Memulai dengan Kiro

Kiro adalah IDE berbasis AI yang dibangun untuk developer. Panduan ini mencakup segalanya dari setup pertama hingga workflow lanjutan — dibangun dari penggunaan nyata.

## Apa itu Kiro?

Kiro lebih dari sekadar chat assistant. Ini adalah IDE yang memahami codebase kamu, mengikuti konvensi kamu, dan membantu membangun fitur secara sistematis.

Tiga permukaan utama:

| Permukaan | Fungsi |
|---|---|
| **Kiro Chat** | Coding percakapan — tanya, edit, debug |
| **Kiro Spec** | Pengembangan fitur terstruktur dengan dokumentasi |
| **Kiro CLI** | Otomasi, scripting, integrasi CI |

## Instalasi

Download Kiro IDE dari situs resmi dan install seperti aplikasi desktop biasa.

Setelah terbuka, kamu akan melihat panel chat di sebelah kiri. Di situlah segalanya dimulai.

## Sesi Pertama

Buka folder project, lalu mulai sesi chat. Kiro akan membaca workspace kamu secara otomatis.

Coba prompt pertama ini:
```
Jelaskan struktur project ini
```

Kiro akan scan file-file kamu dan memberikan ringkasan. Ini adalah baseline kamu — sekarang kamu tahu apa yang Kiro lihat.

## Setup Konteks

Kiro bekerja paling baik ketika kamu memberinya konteks persisten via **steering files**. Tanpanya, setiap sesi dimulai dari nol.

Buat `.kiro/steering/context.md` di project kamu:

```markdown
# Project Context

## Stack
- API: Hono + Cloudflare Workers
- Web: SvelteKit
- Shared: Zod schemas

## Commands
pnpm dev    # jalankan dev server
pnpm test   # jalankan tests
```

Sekarang setiap sesi otomatis mengetahui project kamu. Lihat [Steering Files](./03-steering) untuk panduan lengkap.

## Dua Mode Chat

Kiro punya dua mode — tahu kapan menggunakan masing-masing adalah kuncinya:

- **Vibe Chat** — bebas, untuk task cepat dan pertanyaan
- **Spec Chat** — terstruktur, untuk membangun fitur dengan dokumentasi

Lihat [Vibe vs Spec Chat](./02-mode-chat) untuk detailnya.

## Langkah Selanjutnya

1. [Vibe vs Spec Chat](./02-mode-chat) — pelajari dua mode
2. [Steering Files](./03-steering) — setup konteks persisten
3. [Hooks](./04-hooks) — otomasi aksi berulang
4. [Spec Workflow](./06-spec-workflow) — bangun fitur secara sistematis
