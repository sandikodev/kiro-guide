# Contoh Nyata

Walkthrough lengkap membangun fitur menggunakan Kiro — dari ide hingga kode yang di-deploy.

## Projectnya

[ytmod](https://github.com/sandikodev/ytmod) — monorepo YouTube tools. SvelteKit frontend + Hono API on Cloudflare Workers.

Kita akan walkthrough menambahkan **judul video** ke API response — fitur nyata yang dibangun menggunakan workflow ini.

## Setup (Sekali Saja)

Sebelum pekerjaan fitur apapun, project sudah punya:

```
.kiro/steering/context.md   # identitas project, stack, commands
.kiro/steering/tdd.md       # aturan TDD workflow
.kiro/agents/ytmod.json     # agent spesifik project
```

File-file ini berarti setiap sesi Kiro otomatis mengetahui project. Tidak perlu menjelaskan ulang.

## Langkah 1: Cek Spec

Spec fitur ditulis sebelum mulai:

```markdown
# Spec: Video Title di Response

## Masalah
API response tidak menyertakan judul video. User harus buka YouTube
manual untuk tahu video apa yang sedang diunduh komentarnya.

## Goal
Tampilkan judul video di UI setelah komentar berhasil diambil.

## Requirements
1. API mengambil judul video dari YouTube Data API (videos endpoint)
2. videoTitle dikembalikan dalam CommentsResponse
3. UI menampilkan judul video di atas daftar komentar
4. Kalau fetch title gagal, jangan gagalkan seluruh request — fallback ke undefined
```

## Langkah 2: Schema (Sudah Ada)

`CommentsResponseSchema` di `packages/shared/src/index.ts` sudah punya `videoTitle` sebagai optional:

```typescript
export const CommentsResponseSchema = z.object({
  videoId: z.string(),
  videoTitle: z.string().optional(),  // ← sudah ada
  totalComments: z.number(),
  comments: z.array(CommentSchema),
  nextPageToken: z.string().optional(),
})
```

Tidak perlu perubahan schema. Jalankan typecheck untuk konfirmasi:
```bash
pnpm typecheck  # ✓
```

## Langkah 3: Tulis Test Dulu

File baru: `apps/api/src/routes/comments.test.ts`

```typescript
import { vi, describe, it, expect, beforeEach } from 'vitest'

const mockFetch = vi.fn()
global.fetch = mockFetch

describe('GET /comments — video title', () => {
  beforeEach(() => mockFetch.mockReset())

  it('menyertakan videoTitle ketika YouTube videos API berhasil', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          pageInfo: { totalResults: 1 },
          items: [/* ... comment item ... */]
        })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          items: [{ snippet: { title: 'Judul Video Saya' } }]
        })
      })

    const res = await testApp.request('/comments?videoId=abc123', {}, mockEnv)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.videoTitle).toBe('Judul Video Saya')
  })

  it('mengembalikan response tanpa videoTitle ketika videos API gagal', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => ({ pageInfo: { totalResults: 0 }, items: [] }) })
      .mockResolvedValueOnce({ ok: false })

    const res = await testApp.request('/comments?videoId=abc123', {}, mockEnv)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.videoTitle).toBeUndefined()  // graceful fallback
  })
})
```

Jalankan — konfirmasi gagal:
```bash
pnpm test  # ✗ 2 test gagal (diharapkan)
```

## Langkah 4: Implementasi

Update `apps/api/src/routes/comments.ts` — tambah fetch video title setelah comments:

```typescript
// Setelah fetch comments...
let videoTitle: string | undefined

try {
  const videoRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
  )
  if (videoRes.ok) {
    const videoData = await videoRes.json()
    videoTitle = videoData.items?.[0]?.snippet?.title
  }
} catch {
  // Gagal diam-diam — videoTitle tetap undefined
}

const response: CommentsResponse = {
  videoId,
  videoTitle,           // ← ditambahkan
  totalComments: data.pageInfo.totalResults,
  // ...
}
```

## Langkah 5: Semua Hijau

```bash
pnpm test      # ✓ semua pass
pnpm typecheck # ✓
pnpm lint      # ✓
```

## Langkah 6: Update UI

`apps/web/src/routes/+page.svelte` — tampilkan judul di atas jumlah komentar:

```svelte
{#if result}
  <div class="result">
    {#if result.videoTitle}
      <h2 class="video-title">{result.videoTitle}</h2>
    {/if}
    <div class="result-header">
      <span>Ditemukan <strong>{result.totalComments}</strong> komentar</span>
      ...
    </div>
  </div>
{/if}
```

## Langkah 7: Commit

```bash
git commit -m "test(api): add video title fetch tests"
git commit -m "feat(api): fetch and return video title"
git commit -m "feat(web): display video title in result"
```

## Yang Membuat Ini Lancar

- **Steering files** — Kiro tahu stack, konvensi, dan aturan TDD tanpa diberitahu
- **Spec file** — requirements jelas sebelum coding dimulai
- **Schema sudah benar** — shared types berarti tidak perlu koordinasi antara API dan web
- **Graceful fallback** — spec secara eksplisit bilang "jangan gagalkan seluruh request" — ini ada di test

## Repo Lengkapnya

Browse kode aktualnya: [github.com/sandikodev/ytmod](https://github.com/sandikodev/ytmod)

File spec ada di `.kiro/specs/` — kamu bisa lihat persis bagaimana setiap fitur direncanakan.
