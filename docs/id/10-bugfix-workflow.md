# Bugfix Workflow

Kiro punya workflow khusus untuk memperbaiki bug — berbeda dari workflow spec fitur. Menggunakan metodologi "bug condition" untuk memastikan perbaikan benar-benar mengatasi akar masalah.

## Kenapa Workflow Terpisah?

Spec fitur dimulai dari nol. Spec bugfix dimulai dari perilaku yang rusak.

Perbedaan utama: kamu perlu **membuktikan bug ada** sebelum memperbaikinya, dan **membuktikan bug hilang** setelahnya.

## Metodologi Bug Condition

Setiap bug punya kondisi `C(X)` — properti yang bernilai true ketika bug ada.

```
C(X) = true   → bug ada
C(X) = false  → bug sudah diperbaiki
```

Tugasmu:
1. Definisikan `C(X)` dengan tepat
2. Tulis test yang mengkonfirmasi `C(X) = true` (bug ada)
3. Perbaiki kode
4. Konfirmasi `C(X) = false` (bug hilang)

## File Bugfix Spec

```
.kiro/specs/quantity-zero-crash/
  bugfix.md    # Deskripsi bug, kondisi, langkah reproduksi
  design.md    # Analisis root cause dan pendekatan perbaikan
  tasks.md     # Langkah implementasi
```

## Memulai Bugfix Spec

Di Spec Chat, deskripsikan bug:

```
Aplikasi crash ketika quantity nol di keranjang belanja
```

Kiro akan mengenali ini sebagai bugfix dan memandu kamu melalui:
1. Mendokumentasikan kondisi bug
2. Menulis test reproduksi
3. Menganalisis root cause
4. Merencanakan perbaikan

## Proses Bugfix

### Langkah 1: Dokumentasikan kondisi bug

```markdown
## Bug Condition

C(X) = `calculateTotal(items)` throw ketika ada item dengan `quantity: 0`

## Reproduksi

Input:  [{ id: '1', price: 10, quantity: 0 }]
Expected: total = 0
Actual:   TypeError: Division by zero
```

### Langkah 2: Tulis exploration test

Test ini harus **gagal** di kode yang belum diperbaiki — itulah tujuannya. Kegagalan mengkonfirmasi bug ada.

```typescript
it('bug condition: crash dengan quantity nol', () => {
  // Ini HARUS throw sebelum perbaikan
  expect(() => calculateTotal([
    { id: '1', price: 10, quantity: 0 }
  ])).not.toThrow()
})
```

Jalankan — konfirmasi gagal:
```bash
pnpm test
# ✗ bug condition: crash dengan quantity nol
```

### Langkah 3: Perbaiki

Sekarang implementasikan perbaikan.

```typescript
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    if (item.quantity <= 0) return sum  // ← perbaikan
    return sum + item.price * item.quantity
  }, 0)
}
```

### Langkah 4: Konfirmasi sudah diperbaiki

```bash
pnpm test
# ✓ bug condition: crash dengan quantity nol
```

Test yang sama yang membuktikan bug ada, sekarang membuktikan perbaikannya.

## Format Commit

```bash
git commit -m "test(cart): add bug condition test for zero quantity crash"
git commit -m "fix(cart): handle zero quantity in calculateTotal"
```

## Tips

- Exploration test bersifat permanen — simpan di test suite
- Jika exploration test pass secara tak terduga (sebelum perbaikanmu), selidiki ulang root cause-nya
- Satu bugfix spec per bug — jangan gabungkan beberapa perbaikan
- Dokumentasikan root cause di `design.md`, bukan hanya gejalanya
