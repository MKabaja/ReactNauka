# 🛒 CART SYSTEM - Szczegółowy Plan Implementacji

## Overview

Implementacja **Custom Hook `useCart` + Context API** dla globalnego zarządzania koszykiem z persystencją localStorage.

---

## KROK 1: Types i Interfejsy (Cart)

### 📋 Cel

Zdefiniować typy TypeScript dla cart system.

### ✅ Definition of Done

- [x] Plik `src/types/cart.ts` istnieje
- [x] `CartItem` interface: `{ id: string; quantity: number }`
- [x] `Cart` interface: `{ items: CartItem[] }`
- [x] Brak TypeScript errors
- [x] Typy są exportowane i możliwe do importu

### 📝 Co zaimplementować

```typescript
interface CartItem {
	id: string;
	quantity: number;
}

interface Cart {
	items: CartItem[];
}
```

### 📦 Commit Message

```
feat: add Cart types (CartItem, Cart interfaces)
```

---

## KROK 2: Stałe (Constants)

### 📋 Cel

Stworzyć constants dla cart system.

### ✅ Definition of Done

- [x] Plik `src/constants/cart.ts` istnieje
- [x] Stała `CART_STORAGE_KEY = 'cart'`
- [x] Eksportowane i testowalne

### 📝 Co zaimplementować

```typescript
export const CART_STORAGE_KEY = 'cart';
```

### 📦 Commit Message

```
feat: add Cart constants (CART_STORAGE_KEY)
```

---

## KROK 3: Custom Hook (useCart) - Logika

### 📋 Cel

Stwórz hook zarządzający koszykiem z localStorage.

### ✅ Definition of Done

- [x] Plik `src/hooks/useCart.ts` istnieje
- [x] Hook exportuje funkcję `useCart()`
- [x] Stan: `cart: CartItem[]`
- [x] Akcje implementowane:
    - [x] `addToCart(mealId: string, quantity: number): void`
    - [x] `removeFromCart(mealId: string): void`
    - [x] `updateQuantity(mealId: string, quantity: number): void`
    - [x] `clearCart(): void`
- [x] Getter: `cartCount` - suma ilości (readonly)
- [x] `useEffect` do sync localStorage (load na mount + save na change)
- [x] Brak TypeScript errors
- [x] Edge cases:
    - [x] Dodawanie istniejącego item'u → update qty
    - [x] Update qty ≤ 0 → remove item

### 🎯 Key Points

- Przechowuj cart jako array, nie object
- `cartCount` = computed getter (reduce suma)
- localStorage load na mount, save na zmianę

### 📦 Commit Message

```
feat: add useCart hook with localStorage persistence

- Implement addToCart, removeFromCart, updateQuantity, clearCart
- Auto-sync with localStorage on mount and change
- Computed cartCount getter
- Handle edge cases (duplicate items, invalid quantities)
```

---

## KROK 4: Context Provider

### 📋 Cel

Udostępnić cart globalnie via Context API.

### ✅ Definition of Done

- [x] Plik `src/context/CartContext.tsx` istnieje
- [x] `CartContext` created z proper type'ami
- [x] `CartProvider` komponent
- [x] `useCartContext()` hook - safe getter (throw error jeśli brak providera)
- [x] Eksport: `CartProvider`, `useCartContext`

### 🎯 Key Points

- Context type = `ReturnType<typeof useCart>`
- Safe hook - throw error jeśli used outside provider
- Provide value z `useCart()` hooka

### 📦 Commit Message

```
feat: add CartContext and CartProvider

- Create context for global cart state
- Implement useCartContext hook with error boundary
- Safe usage with error handling
```

---

## KROK 5: App.tsx - Wrap Provider

### 📋 Cel

Owinąć app w CartProvider.

### ✅ Definition of Done

- [x] `src/App.tsx` zmodyfikowany
- [x] Import: `{ CartProvider } from './context/CartContext'`
- [x] Struktura: `<CartProvider><Header /><main>...</main></CartProvider>`
- [x] Brak errors
- [x] App renderuje bez problemów

### 📦 Commit Message

```
feat: wrap App with CartProvider

- Make cart globally available via Context
```

---

## KROK 6: Header.tsx - Wyświetl Cart Count

### 📋 Cel

Wyświetl ilość artykułów w koszyku w Header.

### ✅ Definition of Done

- [ ] Import: `useCartContext` z contextu
- [ ] Use hook: `const { cartCount } = useCartContext()`
- [ ] Button text: `Koszyk({cartCount})` zamiast hardcoded `Koszyk(0)`
- [ ] Dynamicznie aktualizuje się
- [ ] Brak TypeScript errors

### 📦 Commit Message

```
feat: display cart count in Header

- Show dynamic cartCount from context
- Updates when cart changes
```

---

## KROK 7: MealItem.tsx - Add to Cart Button

### 📋 Cel

Zaimplementować logikę "Dodaj do koszyka".

### ✅ Definition of Done

- [ ] Import: `useCartContext`
- [ ] Use hook: `const { addToCart } = useCartContext()`
- [ ] Button: `onClick={() => addToCart(meal.id, 1)}`
- [ ] Cart count w Header zmienia się po kliknięciu
- [ ] Brak TypeScript errors

### 📦 Commit Message

```
feat: implement Add to Cart button

- Click button adds 1 item to cart
- Cart count updates in Header
- Global state management via context
```

---

## KROK 8: Weryfikacja & Testing

### 📋 Cel

Przetestować całą funkcjonalność.

### ✅ Manual Testing Checklist

- [ ] `npm run dev` + `node backend/app.js`
- [ ] Klikni "Dodaj do koszyka" - cartCount rośnie
- [ ] Odśwież stronę (F5) - cartCount nadal taki sam (localStorage!)
- [ ] DevTools → Application → LocalStorage → sprawdzić `'cart'` key
- [ ] localStorage zawiera poprawny JSON
- [ ] Brak errors w console
- [ ] `npm run build` - TypeScript bez errors

### 📦 Commit Message

```
test: verify cart functionality end-to-end

- Manual testing complete
- localStorage persistence verified
- No console errors
- Build successful
```

---

## Workflow: Krok za krokiem

1️⃣ **KROK 1** - rozpisz typy → **pokaż mi** → code review → commit  
2️⃣ **KROK 2** - constants → **pokaż mi** → code review → commit  
3️⃣ **KROK 3** - useCart hook → **pokaż mi** → code review → commit  
4️⃣ **KROK 4** - CartContext → **pokaż mi** → code review → commit  
5️⃣ **KROK 5** - App.tsx wrap → **pokaż mi** → code review → commit  
6️⃣ **KROK 6** - Header Update → **pokaż mi** → code review → commit  
7️⃣ **KROK 7** - MealItem button → **pokaż mi** → code review → commit  
8️⃣ **KROK 8** - E2E Testing → **pokaż mi results** → verify → commit

---

## Clean Code Checklist (dla każdego kroku)

- ✓ Meaningful names
- ✓ SRP - jedna odpowiedzialność
- ✓ Type Safety - bez `any`
- ✓ DRY - nie duplikuj
- ✓ Edge cases - obsługuj
