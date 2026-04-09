# Spec Workflow

Spec adalah dokumen terstruktur yang memandu pengembangan fitur dari requirements hingga implementasi. Mereka mencegah jebakan "langsung coding" dan menjaga fitur kompleks tetap terorganisir.

## Kenapa Spec?

Tanpa spec:
- Kamu mulai coding sebelum memahami scope penuh
- Requirements berubah di tengah implementasi
- Tidak ada catatan kenapa keputusan dibuat
- Sulit di-review atau diserahkan ke orang lain

Dengan spec:
- Requirements jelas sebelum satu baris kode ditulis
- Implementasi dipecah menjadi task yang bisa di-review
- Keputusan terdokumentasi
- Siapapun bisa melanjutkan dari mana kamu berhenti

## File Spec

Setiap spec berada di `.kiro/specs/{nama-fitur}/`:

```
.kiro/specs/
  user-authentication/
    requirements.md   # Apa yang perlu dibangun
    design.md         # Bagaimana cara membangunnya
    tasks.md          # Rencana implementasi step-by-step
```

## Dua Workflow

### Requirements-First
Terbaik ketika kamu tahu apa yang dibutuhkan tapi belum tahu cara membangunnya.

```
Requirements → Design → Tasks → Implementasi
```

### Design-First
Terbaik ketika kamu punya visi teknis yang jelas dan perlu memformalkannya.

```
Design → Requirements → Tasks → Implementasi
```

## Memulai Spec

Di Spec Chat, deskripsikan apa yang ingin dibangun:

```
Saya ingin tambah autentikasi user dengan email/password
```

Kiro akan bertanya: requirements-first atau design-first? Pilih berdasarkan situasimu.

## File Tasks

Setelah requirements dan design disetujui, Kiro generate `tasks.md`:

```markdown
- [ ] 1. Tambah UserSchema ke packages/shared/src/index.ts
- [ ] 2. Tulis tests untuk auth endpoints
- [ ] 3. Implementasi POST /auth/login
- [ ] 4. Implementasi POST /auth/register
- [ ] 5. Tambah auth UI ke +page.svelte
```

Task dieksekusi satu per satu. Kamu review setiap task sebelum lanjut ke berikutnya.

## Status Task

| Simbol | Arti |
|---|---|
| `- [ ]` | Belum dimulai |
| `- [-]` | Sedang dikerjakan |
| `- [~]` | Antrian |
| `- [x]` | Selesai |
| `- [ ]*` | Opsional (bisa dilewati) |

## Contoh Nyata

Lihat [project ytmod](https://github.com/sandikodev/ytmod) — semua fitur dibangun menggunakan workflow ini. File spec ada di `.kiro/specs/`.

## Tips

- Satu spec per fitur — jangan gabungkan hal yang tidak berkaitan
- Review requirements sebelum lanjut ke design
- Jaga task tetap kecil dan atomik — satu concern per task
- Task opsional (`*`) untuk nice-to-have, bukan blocker
