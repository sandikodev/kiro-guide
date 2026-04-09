# Bugfix Workflow

Kiro has a dedicated workflow for fixing bugs — different from the feature spec workflow. It uses a "bug condition" methodology to ensure the fix actually addresses the root cause.

## Why a Separate Workflow?

Feature specs start from zero. Bugfix specs start from broken behavior.

The key difference: you need to **prove the bug exists** before fixing it, and **prove it's gone** after.

## Bug Condition Methodology

Every bug has a condition `C(X)` — a property that is true when the bug is present.

```
C(X) = true   → bug exists
C(X) = false  → bug is fixed
```

Your job:
1. Define `C(X)` precisely
2. Write a test that confirms `C(X) = true` (bug exists)
3. Fix the code
4. Confirm `C(X) = false` (bug gone)

## Bugfix Spec Files

```
.kiro/specs/quantity-zero-crash/
  bugfix.md    # Bug description, condition, reproduction steps
  design.md    # Root cause analysis and fix approach
  tasks.md     # Implementation steps
```

## Starting a Bugfix Spec

In Spec Chat, describe the bug:

```
The app crashes when quantity is zero in the cart
```

Kiro will recognize this as a bugfix and guide you through:
1. Documenting the bug condition
2. Writing a reproduction test
3. Analyzing root cause
4. Planning the fix

## The Bugfix Process

### Step 1: Document the bug condition

```markdown
## Bug Condition

C(X) = `calculateTotal(items)` throws when any item has `quantity: 0`

## Reproduction

Input:  [{ id: '1', price: 10, quantity: 0 }]
Expected: total = 0
Actual:   TypeError: Division by zero
```

### Step 2: Write the exploration test

This test should **fail** on unfixed code — that's the point. Failure confirms the bug exists.

```typescript
it('bug condition: crashes with zero quantity', () => {
  // This SHOULD throw before the fix
  expect(() => calculateTotal([
    { id: '1', price: 10, quantity: 0 }
  ])).not.toThrow()
})
```

Run it — confirm it fails:
```bash
pnpm test
# ✗ bug condition: crashes with zero quantity
```

### Step 3: Fix

Now implement the fix.

```typescript
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    if (item.quantity <= 0) return sum  // ← fix
    return sum + item.price * item.quantity
  }, 0)
}
```

### Step 4: Confirm fixed

```bash
pnpm test
# ✓ bug condition: crashes with zero quantity
```

The same test that proved the bug now proves the fix.

## Commit Format

```bash
git commit -m "test(cart): add bug condition test for zero quantity crash"
git commit -m "fix(cart): handle zero quantity in calculateTotal"
```

## Tips

- The exploration test is permanent — keep it in the test suite
- If the exploration test passes unexpectedly (before your fix), re-investigate the root cause
- One bugfix spec per bug — don't bundle multiple fixes
- Document the root cause in `design.md`, not just the symptom
