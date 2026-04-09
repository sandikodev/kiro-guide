# Real World Example

A complete walkthrough of building a feature using Kiro — from idea to deployed code.

## The Project

[ytmod](https://github.com/sandikodev/ytmod) — a YouTube tools monorepo. SvelteKit frontend + Hono API on Cloudflare Workers.

We'll walk through adding **video title** to the API response — a real feature built using this exact workflow.

## Setup (One Time)

Before any feature work, the project has:

```
.kiro/steering/context.md   # project identity, stack, commands
.kiro/steering/tdd.md       # TDD workflow rules
.kiro/agents/ytmod.json     # project-specific agent
```

These files mean every Kiro session automatically knows the project. No re-explaining needed.

## Step 1: Check the Spec

The feature spec was written before starting:

```markdown
# Spec: Video Title in Response

## Problem
API response doesn't include video title. User has to open YouTube
manually to know which video they're downloading comments for.

## Goal
Show video title in UI after comments are fetched.

## Requirements
1. API fetches video title from YouTube Data API (videos endpoint)
2. videoTitle returned in CommentsResponse
3. UI displays video title above comment list
4. If title fetch fails, don't fail the whole request — fallback to undefined
```

## Step 2: Schema (Already Done)

`CommentsResponseSchema` in `packages/shared/src/index.ts` already had `videoTitle` as optional:

```typescript
export const CommentsResponseSchema = z.object({
  videoId: z.string(),
  videoTitle: z.string().optional(),  // ← already there
  totalComments: z.number(),
  comments: z.array(CommentSchema),
  nextPageToken: z.string().optional(),
})
```

No schema changes needed. Run typecheck to confirm:
```bash
pnpm typecheck  # ✓
```

## Step 3: Write Tests First

New file: `apps/api/src/routes/comments.test.ts`

```typescript
import { vi, describe, it, expect, beforeEach } from 'vitest'

// Mock global fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('GET /comments — video title', () => {
  beforeEach(() => mockFetch.mockReset())

  it('includes videoTitle when YouTube videos API succeeds', async () => {
    // Mock commentThreads response
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          pageInfo: { totalResults: 1 },
          items: [/* ... comment item ... */]
        })
      })
      // Mock videos response
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          items: [{ snippet: { title: 'My Video Title' } }]
        })
      })

    const res = await testApp.request('/comments?videoId=abc123', {}, mockEnv)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.videoTitle).toBe('My Video Title')
  })

  it('returns response without videoTitle when videos API fails', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => ({ pageInfo: { totalResults: 0 }, items: [] }) })
      .mockResolvedValueOnce({ ok: false })  // videos API fails

    const res = await testApp.request('/comments?videoId=abc123', {}, mockEnv)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.videoTitle).toBeUndefined()  // graceful fallback
  })
})
```

Run — confirm they fail:
```bash
pnpm test  # ✗ 2 tests fail (expected)
```

## Step 4: Implement

Update `apps/api/src/routes/comments.ts` — add video title fetch after comments:

```typescript
// After fetching comments...
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
  // Silently fail — videoTitle stays undefined
}

const response: CommentsResponse = {
  videoId,
  videoTitle,           // ← added
  totalComments: data.pageInfo.totalResults,
  // ...
}
```

## Step 5: Green

```bash
pnpm test      # ✓ all pass
pnpm typecheck # ✓
pnpm lint      # ✓
```

## Step 6: Update UI

`apps/web/src/routes/+page.svelte` — show title above comment count:

```svelte
{#if result}
  <div class="result">
    {#if result.videoTitle}
      <h2 class="video-title">{result.videoTitle}</h2>
    {/if}
    <div class="result-header">
      <span>Found <strong>{result.totalComments}</strong> comments</span>
      ...
    </div>
  </div>
{/if}
```

## Step 7: Commit

```bash
git commit -m "test(api): add video title fetch tests"
git commit -m "feat(api): fetch and return video title"
git commit -m "feat(web): display video title in result"
```

## What Made This Smooth

- **Steering files** — Kiro knew the stack, conventions, and TDD rules without being told
- **Spec file** — requirements were clear before coding started
- **Schema already correct** — shared types meant no coordination needed between API and web
- **Graceful fallback** — spec explicitly said "don't fail the whole request" — this was in the test

## The Full Repo

Browse the actual code: [github.com/sandikodev/ytmod](https://github.com/sandikodev/ytmod)

The spec files are in `.kiro/specs/` — you can see exactly how each feature was planned.
