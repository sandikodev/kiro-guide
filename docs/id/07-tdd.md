# TDD dengan Kiro

Kiro bekerja paling baik ketika dipasangkan dengan workflow test-driven. Halaman ini mencakup pola yang digunakan di project nyata.

## Loop Utama

```
Schema → Test → Implementasi → Hijau → Commit
```

Jangan lewati langkah. Jangan implementasi sebelum menulis test.

## 1. Schema Dulu

Definisikan bentuk data sebelum menulis logika apapun. Di project TypeScript dengan Zod:

```typescript
// packages/shared/src/index.ts
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
})

export type User = z.infer<typeof UserSchema>
```

Jalankan typecheck segera:
```bash
pnpm typecheck
```

## 2. Tulis Test Dulu

Tulis test sebelum implementasi. Test akan gagal — itu normal.

```typescript
// apps/api/src/routes/users.test.ts
describe('POST /users', () => {
  it('membuat user dengan data valid', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
    })
    expect(res.status).toBe(201)
  })

  it('mengembalikan 400 dengan email tidak valid', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      body: JSON.stringify({ email: 'bukan-email' }),
    })
    expect(res.status).toBe(400)
  })
})
```

Jalankan test untuk konfirmasi gagal:
```bash
pnpm test
```

## 3. Implementasi

Baru setelah test ditulis, tulis implementasi untuk membuat test pass.

```typescript
// apps/api/src/routes/users.ts
users.post('/', zValidator('json', CreateUserSchema), async (c) => {
  const data = c.req.valid('json')
  // ... buat user
  return c.json(user, 201)
})
```

## 4. Semua Test Hijau

```bash
pnpm test && pnpm typecheck && pnpm lint
```

Jangan commit sampai semuanya pass.

## 5. Commit Per Layer

```bash
git commit -m "feat(shared): add UserSchema"
git commit -m "test(api): add user creation tests"
git commit -m "feat(api): implement POST /users"
git commit -m "feat(web): add user registration form"
```

## Prompting Kiro untuk TDD

Katakan ke Kiro secara eksplisit:

```
Tulis test dulu, baru implementasi. Jangan tulis implementasi sampai saya konfirmasi test-nya sudah benar.
```

Atau set di steering file supaya berlaku di setiap sesi:

```markdown
## Testing
Selalu tulis test sebelum implementasi.
Jangan modifikasi test yang sudah ada kecuali diminta eksplisit.
```

## Apa yang Perlu Di-test

| Layer | Test |
|---|---|
| Shared schemas | Input valid, input tidak valid, edge cases |
| API handlers | Status codes, bentuk response, kasus error |
| Utilities | Input/output fungsi murni |
| UI | Hanya jika diminta eksplisit |

## Apa yang Tidak Perlu Di-test

- API eksternal (mock mereka)
- Detail implementasi (test perilaku, bukan internal)
- Komponen UI (kecuali ada logika kritis)
