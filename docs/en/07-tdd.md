# TDD with Kiro

Kiro works best when paired with a test-driven workflow. This page covers the pattern used in real projects.

## The Core Loop

```
Schema → Test → Implement → Green → Commit
```

Never skip steps. Never implement before writing a test.

## 1. Schema First

Define your data shapes before writing any logic. In a TypeScript project with Zod:

```typescript
// packages/shared/src/index.ts
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
})

export type User = z.infer<typeof UserSchema>
```

Run typecheck immediately:
```bash
pnpm typecheck
```

## 2. Write the Test First

Write the test before the implementation. It will fail — that's expected.

```typescript
// apps/api/src/routes/users.test.ts
describe('POST /users', () => {
  it('creates a user with valid data', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
    })
    expect(res.status).toBe(201)
  })

  it('returns 400 with invalid email', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      body: JSON.stringify({ email: 'not-an-email' }),
    })
    expect(res.status).toBe(400)
  })
})
```

Run tests to confirm they fail:
```bash
pnpm test
```

## 3. Implement

Now write the implementation to make the tests pass.

```typescript
// apps/api/src/routes/users.ts
users.post('/', zValidator('json', CreateUserSchema), async (c) => {
  const data = c.req.valid('json')
  // ... create user
  return c.json(user, 201)
})
```

## 4. All Tests Green

```bash
pnpm test && pnpm typecheck && pnpm lint
```

Don't commit until everything passes.

## 5. Commit Per Layer

```bash
git commit -m "feat(shared): add UserSchema"
git commit -m "test(api): add user creation tests"
git commit -m "feat(api): implement POST /users"
git commit -m "feat(web): add user registration form"
```

## Prompting Kiro for TDD

Tell Kiro explicitly:

```
Write the test first, then implement. Don't write implementation until I confirm the test looks right.
```

Or set it in your steering file so it applies to every session:

```markdown
## Testing
Always write tests before implementation.
Never modify existing tests unless explicitly asked.
```

## What to Test

| Layer | Test |
|---|---|
| Shared schemas | Valid input, invalid input, edge cases |
| API handlers | Status codes, response shape, error cases |
| Utilities | Pure function input/output |
| UI | Only if explicitly asked |

## What Not to Test

- External APIs (mock them)
- Implementation details (test behavior, not internals)
- UI components (unless critical logic is involved)
