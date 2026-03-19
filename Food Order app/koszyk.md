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

- [x] Import: `useCartContext` z contextu
- [x] Use hook: `const { cartCount } = useCartContext()`
- [x] Button text: `Koszyk({cartCount})` zamiast hardcoded `Koszyk(0)`
- [x] Dynamicznie aktualizuje się
- [x] Brak TypeScript errors

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

---

# 🛒 MODAL + CHECKOUT - Rozszerzenie Planu

---

## KROK 9: Order Types (AddAddress + Order)

### 📋 Cel

Zdefiniować typy dla zamówienia i adresu dostawy.

### ✅ Definition of Done

- [x] `npm install zod` - zainstaluj!
- [x] Plik `src/types/order.ts` istnieje
- [x] `OrderAddress` interface z Zod schema
- [x] `Order` interface: `{ customer: OrderAddress, items: CartItem[] }`
- [x] **Zod Schema** `orderAddressSchema` z validacją:
    - [x] name: min 1 character
    - [x] email: valid email format
    - [x] street, postalCode, city: min 1 character
- [x] Type inferred z Zoda: `type OrderAddress = z.infer<...>`
- [x] Brak TypeScript errors
- [x] Export: types + schema

### 📝 Co zaimplementować

```typescript
import { z } from 'zod';
import { CartItem } from './cart';

// Zod Schema dla walidacji
export const orderAddressSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	street: z.string().min(1, 'Street is required'),
	postalCode: z.string().min(1, 'Postal code is required'),
	city: z.string().min(1, 'City is required'),
});

// TypeScript Type (inferred z Zoda)
export type OrderAddress = z.infer<typeof orderAddressSchema>;

export interface Order {
	customer: OrderAddress;
	items: CartItem[];
}
```

### 🎯 Key Points - Zod BASIS

**Co to Zod?**

- Schema validation library (TypeScript-first)
- `z.string()` = string type
- `.min(1)` = minimum 1 character
- `.email()` = must be valid email
- `z.infer<typeof schema>` = extract TypeScript type z schema'u
- `.parse(data)` = waliduj, throw error
- `.safeParse(data)` = waliduj, return `{ success, data, error }`

**Dlaczego Zod?**

- Define validation raz
- Use w formach + server actions
- Type-safe: types come from schema, not duplicated

### 📦 Commit Message

```
feat: add Order types with Zod schema for validation

- Create OrderAddress type with Zod validation schema
- Add email, name, street, postal code, city validation
- Export types inferred from Zod schema
- Setup for useActionState integration
```

---

## KROK 10: CartModal Component (forwardRef + Dialog)

### 📋 Cel

Stwórz modal wyświetlający cart items z +/- quantity oraz total.

### ✅ Definition of Done

- [x] Plik `src/components/CartModal.tsx` istnieje
- [x] **forwardRef + <dialog>** element
- [x] Wyświetla listę cart items (podobnie jak MealItem, ale edytowalne)
- [ ] Każdy item ma: `-` button, quantity, `+` button, `X` remove
- [x] Pokazuje **cart total** (sum ceny \* qty)
- [x] Dwa buttons: "Close" (close modal), "Go to Checkout" (close + open checkout modal)
- [x] Używa `.modal`, `.cart-item`, `.cart-item-actions` CSS classes
- [x] Brak TypeScript errors
- [x] Brak items → ui komunikat "Koszyk jest pusty"

### 🎯 Key Points

- forwardRef do `dialog.current.showModal()/close()`
- useCartContext do dostępu do `{ cart, updateItem, removeItem, totalItemsInCart }`
- Total price: `cart.items.reduce((sum, item) => sum + item.quantity * (price z Meals?), 0)`
    - **PROBLEM:** checkout modal nie ma cenę! Musisz przechowywać meal dane razem z cart?
    - **Rozwiązanie:** `CartItem` powinien mieć `price` field!

### 📝 Struktura

```json
CartItem: { id, quantity, price }  // ← zmiana z poprzedniego!
```

### ⚠️ UWAGA

Trzeba będzie **zmienić typ `CartItem`** - dodać `price: number`!
Zmiana w:

- `types/cart.ts` - interface CartItem
- `useCart.ts` - zmapować price w addItem
- `MealItem.tsx` - passing meal.price

### 📦 Commit Message

```
feat: create CartModal component with forwardRef

- Display cart items with +/- quantity controls
- Show cart total price
- Close and Go to Checkout buttons
- CSS styling with existing modal classes
- forwardRef for showModal/close dialog methods
```

---

## KROK 11: Update CartItem Type + Integrate Price

### 📋 Cel

Rozszerzyć CartItem o price field i scalować z useCart.

### ✅ Definition of Done

- [ ] `types/cart.ts` - CartItem ma `{ id, quantity, price }`
- [ ] `useCart.ts` - `addItem()` zachowuje meal price w CartItem
    - Problem: hook nie ma dostępu do Meals!
    - Rozwiązanie: **addItem musi przyjmować także price!**
    ```typescript
    addItem(mealId: string, quantity: number, price: number)
    ```
- [ ] `MealItem.tsx` - pass price: `addItem(id, 1, price)`
- [ ] `CartModal.tsx` - używa `item.price` do total
- [ ] localStorage persystuje price
- [ ] TypeScript bez errors

### 🎯 Key Points

- Zmiana sygnatury `addItem` - BREAKING CHANGE
- Cena przechowywana w CartItem dla easy total calculation
- localStorage save/load bez zmian (JSON zawiera price)

### 📦 Commit Message

```
refactor: update CartItem to include price field

- Add price: number to CartItem interface
- Update addItem action to accept and store price
- Update MealItem to pass price when adding to cart
- Enable accurate total price calculation in CartModal
```

---

## KROK 12: CartModal Actions (Qty +/- / Remove)

### 📋 Cel

Implementować przyciski +/- i usuwania w CartModal.

### ✅ Definition of Done

- [ ] Button `-` (minus) - `updateItem(id, item.quantity - 1)`
    - Jeśli qty ≤ 0 → auto removeItem
- [ ] Button `+` (plus) - `updateItem(id, item.quantity + 1)`
- [ ] Button `X` (remove) - `removeItem(id)`
- [ ] Total price aktualizuje się w real-time
- [ ] Buttons mają proper styling (`.cart-item-actions`)
- [ ] UX: po akcji modal nadal otwarta (nie zamyka)
- [ ] Cart count w Header aktualizuje się live
- [ ] Brak errors

### 📦 Commit Message

```
feat: implement cart item controls in CartModal

- Add +/- quantity buttons with updateItem actions
- Add remove button (X) for each item
- Real-time total price updates
- Smooth UX with modal staying open
```

---

## KROK 13: CheckoutModal + useActionState (Zod + Form Action)

### 📋 Cel

Stwórz modal z formularzem, używając **useActionState + Zod** do walidacji i POST do backendu.

### ✅ Definition of Done

- [ ] Plik `src/components/CheckoutModal.tsx` istnieje
- [ ] **forwardRef + <dialog>** element
- [ ] **Server Action (client-side)** `submitOrder`:
    ```typescript
    async function submitOrder(prevState, formData) {
    	// Parse formData z Zod
    	// Validate
    	// POST to /orders
    	// Return { success, message, error }
    }
    ```
- [ ] **useActionState hook** - get `[formState, formAction]`
- [ ] Form fields (`.control` CSS class):
    - [ ] Name (text)
    - [ ] Email (email)
    - [ ] Street (text)
    - [ ] Postal Code (text)
    - [ ] City (text)
- [ ] Form `action={formAction}` (form submit z action!)
- [ ] **Zod validation** w action:
    - [ ] `orderAddressSchema.safeParse(data)`
    - [ ] Jeśli fail → return error state
    - [ ] Show validation errors
- [ ] Submit button z loading state:
    - [ ] `pending` state z useActionState
    - [ ] Disable button gdy loading
- [ ] Error display:
    - [ ] Backend 400 errors
    - [ ] Zod validation errors
- [ ] Success flow:
    - [ ] 201 response → `formState.success = true`
    - [ ] `clearCart()`
    - [ ] Close modals
    - [ ] Success notification
- [ ] Brak TypeScript errors

### 📝 Pseudo-kod

```typescript
// Server Action
async function submitOrder(prevState, formData) {
  const data = Object.fromEntries(formData);

  // Validate z Zod
  const result = orderAddressSchema.safeParse(data);
  if (!result.success) {
    return { success: false, errors: result.error.flatten() };
  }

  // POST
  try {
    const response = await fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order: {
          customer: {
            ...result.data,
            'postal-code': result.data.postalCode, // ← kebab-case!
          },
          items: cartItems,
        },
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return { success: false, error: err.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: 'Network error' };
  }
}

// Component
export default forwardRef(function CheckoutModal({ cartModalRef }, ref) {
  const { cart, clearCart } = useCartContext();
  const [formState, formAction] = useActionState(submitOrder, {
    success: false,
    error: null,
    pending: false,
  });

  return (
    <dialog ref={ref}>
      <form action={formAction}>
        <input name="name" />
        <input name="email" type="email" />
        {/* ... reszta fields */}

        <button type="submit" disabled={formState.pending}>
          {formState.pending ? 'Processing...' : 'Confirm Order'}
        </button>
      </form>

      {formState.error && <p className="error">{formState.error}</p>}
      {formState.success && <p>Order created!</p>}
    </dialog>
  );
});
```

### 🎯 Key Points - useActionState

- `[formState, formAction] = useActionState(action, initialState)`
- **action**: `async (prevState, formData) => newState`
- **formState**: `{ pending, success, error, ... }`
- **formAction**: pass do `<form action={...}>`
- NO useState needed! Automatic loading state!

### 🎯 Zod + useActionState

1. Schema w `types/order.ts` - `orderAddressSchema`
2. W action: `schema.safeParse(formDataObject)`
3. Return errors w formState
4. Component displays errors
5. On success (201): `clearCart()` → close modals

### ⚠️ IMPORTANT

- **FormData parsing**: `Object.fromEntries(formData)`
- **postal-code**: JavaScript camelCase → backend kebab-case
- **POST body**: `{ order: { customer: {...}, items: cartItems } }`
- **Loading**: `.pending` from formState (automatic!)

### 📦 Commit Message

```
feat: create CheckoutModal with useActionState and Zod validation

- Implement server action submitOrder with Zod schema validation
- Use useActionState for automatic loading and error state
- Validate FormData with orderAddressSchema
- POST /orders with proper camelCase → kebab-case conversion
- Handle backend 201 success and 400 validation errors
- Display errors inline with validation feedback
```

---

## KROK 14: Header Integration (useRef + Button)

### 📋 Cel

Połączyć Header button "Koszyk" z CartModal.

### ✅ Definition of Done

- [ ] `Header.tsx` - create refs:
    ```typescript
    const cartModalRef = useRef<HTMLDialogElement>(null);
    const checkoutModalRef = useRef<HTMLDialogElement>(null);
    ```
- [ ] Button "Koszyk" - `onClick={() => cartModalRef.current?.showModal()}`
- [ ] Pass refs do CartModal i CheckoutModal (lub via global state)
- [ ] "Go to Checkout" button w CartModal:
    - [ ] Close CartModal
    - [ ] Open CheckoutModal
- [ ] Brak errors
- [ ] Modal otwiera się/zamyka z header button

### 🎯 Key Points

- Optional chaining: `?.showModal()`, `?.close()`
- Refs passing via props (lub Context - ale props prostsze)
- UX: CartModal → Go to Checkout → CheckoutModal

### 📦 Commit Message

```
feat: integrate CartModal and CheckoutModal in Header

- Add useRef for both modals
- Header button opens CartModal
- CartModal "Go to Checkout" opens CheckoutModal and closes itself
- Clean modal flow with forwardRef integration
```

---

## KROK 15: React Portal Setup

### 📋 Cel

Renderować modals w dedicated portal DOM node.

### ✅ Definition of Done

- [ ] `public/index.html` - dodaj `<div id="modal-root"></div>` (poza root div)
- [ ] `src/components/ModalPortal.tsx` - wrapper component:
    ```typescript
    export function ModalPortal({ children }) {
    	return ReactDOM.createPortal(
    		children,
    		document.getElementById('modal-root')!,
    	);
    }
    ```
- [ ] `App.tsx` - wrap CartModal i CheckoutModal w Portal:
    ```tsx
    <ModalPortal>
    	<CartModal
    		ref={cartModalRef}
    		checkoutModalRef={checkoutModalRef}
    	/>
    	<CheckoutModal
    		ref={checkoutModalRef}
    		cartModalRef={cartModalRef}
    	/>
    </ModalPortal>
    ```
- [ ] CSS `.modal { ... }` nadal działa (z portal'u)
- [ ] Brak TypeScript errors

### 🎯 Key Points

- Portal DOM: `/index.html` - nowy div
- ReactDOM.createPortal przechowuje HTML5 dialog poza React tree
- Clean separation - modals w osobnym DOM
- Z-index: backdrop modal'u działa prawidłowo

### 📦 Commit Message

```
feat: add React Portal for modal rendering

- Create modal-root div in index.html
- Add ModalPortal component wrapper
- Render CartModal and CheckoutModal via portal
- Clean DOM tree with modals in separate container
```

---

## KROK 16: Integration + Linking (Cart ↔ Checkout Flow)

### 📋 Cel

Scalić wszystko razem - obsługa flow między modalami.

### ✅ Definition of Done

- [ ] CartModal ma prop `checkoutModalRef`
- [ ] "Go to Checkout" button:
    - [ ] `cartModalRef.current?.close()`
    - [ ] `checkoutModalRef.current?.showModal()`
- [ ] CheckoutModal ma prop `cartModalRef`
- [ ] "Back to Cart" button (na checkoucie):
    - [ ] `checkoutModalRef.current?.close()`
    - [ ] `cartModalRef.current?.showModal()`
- [ ] Submit order:
    - [ ] POST do backendu
    - [ ] Obsłuż 201 success
    - [ ] `clearCart()` z contextu
    - [ ] Both modals close
    - [ ] Alert success
- [ ] Flow całej ścieżki:
    1. Header "Koszyk" → CartModal open
    2. Edit qty +/-
    3. "Go to Checkout" → CartModal close → CheckoutModal open
    4. Fill form + submit (POST to /orders)
    5. Success: clearCart + modals close + alert

### 📦 Commit Message

```
feat: integrate complete checkout flow with backend

- Link CartModal and CheckoutModal via refs
- Implement Go to Checkout and Back to Cart navigation
- Complete order flow: cart → checkout → POST /orders → clear
- Success notification after order placement
```

---

## KROK 17: E2E Testing + Verification

### 📋 Cel

Przetestować całą checkout ścieżkę end-to-end z backend'em.

### ✅ Manual Testing Checklist

- [ ] `npm run dev` + `node backend/app.js`
- [ ] Klik "Dodaj do koszyka" na 2-3 produkty
- [ ] Header "Koszyk(3)" - pokazuje poprawnie
- [ ] Klik Header button "Koszyk" → CartModal otworzy się
- [ ] CartModal pokazuje 3 items z cenami
- [ ] Total price = sum(qty × price) - sprawdź kalkulację
- [ ] Klik `+` button - qty zmienia się
- [ ] Klik `-` button - qty zmienia się (min 1, <1 = remove)
- [ ] Klik `X` button - item usunięty z CartModal i Header count aktualizuje
- [ ] Klik "Go to Checkout" → CartModal close, CheckoutModal open
- [ ] Form fields visible (name, email, street, postal-code, city)
- [ ] Spróbuj submit bez danych → validation error w modalu
- [ ] Spróbuj submit z invalid email → validation error
- [ ] Spróbuj submit - sprawdzić Network tab:
    - [ ] Request: POST `/orders`
    - [ ] Body zawiera: `{ order: { customer: {...}, items: [...] } }`
    - [ ] postal-code jest w kebab-case!
- [ ] Fill all fields poprawnie + submit
- [ ] Response: 201 `{ message: 'Order created!' }`
- [ ] Alert: "Order placed successfully!"
- [ ] CartModal + CheckoutModal zamknięty
- [ ] Header "Koszyk(0)" - cart cleared
- [ ] localStorage: cart is empty
- [ ] Backend: `backend/data/orders.json` zawiera nowe zamówienie
- [ ] `npm run build` - TypeScript bez errors

### 📦 Commit Message

```
test: verify complete checkout flow with backend integration

- Cart modal displays items and total correctly
- Quantity +/- controls work
- Checkout form validation works
- POST /orders sends correct data structure
- Backend validation errors display in modal
- Order saved to backend (orders.json)
- Cart clears after successful submission
- localStorage updated correctly
- No console errors
```

---

## Workflow: Krok za krokiem (CZĘŚĆ 2)

9️⃣ **KROK 9** - Order types → **pokaż mi** → code review → commit  
🔟 **KROK 10** - CartModal (dialog, items, total) → **pokaż mi** → code review → commit  
1️⃣1️⃣ **KROK 11** - Update CartItem type + price field → **pokaż mi** → code review → commit  
1️⃣2️⃣ **KROK 12** - CartModal actions (+/-/remove) → **pokaż mi** → code review → commit  
1️⃣3️⃣ **KROK 13** - CheckoutModal + POST /orders → **pokaż mi** → code review → commit  
1️⃣4️⃣ **KROK 14** - Header integration (useRef) → **pokaż mi** → code review → commit  
1️⃣5️⃣ **KROK 15** - React Portal setup → **pokaż mi** → code review → commit  
1️⃣6️⃣ **KROK 16** - Linking CartModal ↔ CheckoutModal → **pokaż mi** → code review → commit  
1️⃣7️⃣ **KROK 17** - E2E Testing (with backend) → **pokaż mi results** → verify → commit

---

## ⚠️ UWAGA O forwardRef

React 19+ pozwala na bardziej naturalne podejścia, ale forwardRef jest **dobrą praktyką** dla `<dialog>` elements, więc **wciąż go będziemy używać**. To świetny drill! 💪

---

## CSS Classes Ready to Use (z index.css)

## KROK 14: Header Integration (useRef + Button)

### 📋 Cel

Połączyć Header button "Koszyk" z CartModal.

### ✅ Definition of Done

- [ ] `Header.tsx` - create refs:
    ```typescript
    const cartModalRef = useRef<HTMLDialogElement>(null);
    const checkoutModalRef = useRef<HTMLDialogElement>(null);
    ```
- [ ] Button "Koszyk" - `onClick={() => cartModalRef.current?.showModal()}`
- [ ] Pass refs do CartModal i CheckoutModal (lub via global state)
- [ ] "Go to Checkout" button w CartModal:
    - [ ] Close CartModal
    - [ ] Open CheckoutModal
- [ ] Brak errors
- [ ] Modal otwiera się/zamyka z header button

### 🎯 Key Points

- Optional chaining: `?.showModal()`, `?.close()`
- Refs passing via props (lub Context - ale props prostsze)
- UX: CartModal → Go to Checkout → CheckoutModal

### 📦 Commit Message

```
feat: integrate CartModal and CheckoutModal in Header

- Add useRef for both modals
- Header button opens CartModal
- CartModal "Go to Checkout" opens CheckoutModal and closes itself
- Clean modal flow with forwardRef integration
```

---

## KROK 15: React Portal Setup

### 📋 Cel

Renderować modals w dedicated portal DOM node.

### ✅ Definition of Done

- [ ] `public/index.html` - dodaj `<div id="modal-root"></div>` (poza root div)
- [ ] `src/components/ModalPortal.tsx` - wrapper component:
    ```typescript
    export function ModalPortal({ children }) {
    	return ReactDOM.createPortal(
    		children,
    		document.getElementById('modal-root')!,
    	);
    }
    ```
- [ ] `App.tsx` - wrap CartModal i CheckoutModal w Portal:
    ```tsx
    <ModalPortal>
    	<CartModal
    		ref={cartModalRef}
    		checkoutModalRef={checkoutModalRef}
    	/>
    	<CheckoutModal
    		ref={checkoutModalRef}
    		cartModalRef={cartModalRef}
    	/>
    </ModalPortal>
    ```
- [ ] CSS `.modal { ... }` nadal działa (z portal'u)
- [ ] Brak TypeScript errors

### 🎯 Key Points

- Portal DOM: `/index.html` - nowy div
- ReactDOM.createPortal przechowuje HTML5 dialog poza React tree
- Clean separation - modals w osobnym DOM
- Z-index: backdrop modal'u działa prawidłowo

### 📦 Commit Message

```
feat: add React Portal for modal rendering

- Create modal-root div in index.html
- Add ModalPortal component wrapper
- Render CartModal and CheckoutModal via portal
- Clean DOM tree with modals in separate container
```

---

## KROK 16: Integration + Linking (Cart ↔ Checkout Flow)

### 📋 Cel

Scalić wszystko razem - obsługa flow między modalami.

### ✅ Definition of Done

- [ ] CartModal ma prop `checkoutModalRef`
- [ ] "Go to Checkout" button:
    - [ ] `cartModalRef.current?.close()`
    - [ ] `checkoutModalRef.current?.showModal()`
- [ ] CheckoutModal ma prop `cartModalRef`
- [ ] "Back to Cart" button (na checkoucie):
    - [ ] `checkoutModalRef.current?.close()`
    - [ ] `cartModalRef.current?.showModal()`
- [ ] Submit order:
    - [ ] Validation + fake submit (console.log)
    - [ ] `clearCart()` z contextu
    - [ ] Both modals close
    - [ ] Alert success → modal reset
- [ ] Flow całej ścieżki:
    1. Header "Koszyk" → CartModal open
    2. Edit qty +/-
    3. "Go to Checkout" → CartModal close → CheckoutModal open
    4. Fill form + submit
    5. clearCart + modals close + success alert

### 📦 Commit Message

```
feat: integrate complete checkout flow

- Link CartModal and CheckoutModal via refs
- Implement Go to Checkout and Back to Cart navigation
- Complete order flow: cart → checkout → submit → clear
- Success notification after order placement
```

---

## KROK 17: E2E Testing + Verification

### 📋 Cel

Przetestować całą checkout ścieżkę end-to-end.

### ✅ Manual Testing Checklist

- [ ] `npm run dev` + `node backend/app.js`
- [ ] Klik "Dodaj do koszyka" na 2-3 produkty
- [ ] Header "Koszyk(3)" - pokazuje poprawnie
- [ ] Klik Header button "Koszyk" → CartModal otworzy się
- [ ] CartModal pokazuje 3 items z cenami
- [ ] Total price = sum(qty \* price) - sprawdź kalkulację
- [ ] Klik `+` button - qty zmienia się
- [ ] Klik `-` button - qty zmienia się (min 1, <1 = remove)
- [ ] Klik `X` button - item usunięty z CartModal i Header count aktualizuje
- [ ] Klik "Go to Checkout" → CartModal close, CheckoutModal open
- [ ] Form fields visible (name, email, street, postal-code, city)
- [ ] Spróbuj submit bez danych → error message
- [ ] Spróbuj submit z invalid email → error
- [ ] Fill all fields poprawnie + submit
- [ ] Console: `Order { customer: {...}, items: [...] }` logged
- [ ] Alert: "Order placed successfully!"
- [ ] CartModal zamknięty, Header "Koszyk(0)" - cart cleared
- [ ] localStorage: cart is empty
- [ ] `npm run build` - TypeScript bez errors

### 📦 Commit Message

```
test: verify complete checkout flow end-to-end

- Cart modal displays items and total correctly
- Quantity +/- controls work
- Remove item removes from display
- Checkout modal opens with form
- Form validation prevents invalid submission
- Order logs to console with correct structure
- Cart clears after successful order
- localStorage updated correctly
- No console errors
```

---

## Workflow: Krok za krokiem (CZĘŚĆ 2)

9️⃣ **KROK 9** - Order types → **pokaż mi** → code review → commit  
🔟 **KROK 10** - CartModal (dialog, items, total) → **pokaż mi** → code review → commit  
1️⃣1️⃣ **KROK 11** - Update CartItem type + price field → **pokaż mi** → code review → commit  
1️⃣2️⃣ **KROK 12** - CartModal actions (+/-/remove) → **pokaż mi** → code review → commit  
1️⃣3️⃣ **KROK 13** - CheckoutModal + form → **pokaż mi** → code review → commit  
1️⃣4️⃣ **KROK 14** - Header integration (useRef) → **pokaż mi** → code review → commit  
1️⃣5️⃣ **KROK 15** - React Portal setup → **pokaż mi** → code review → commit  
1️⃣6️⃣ **KROK 16** - Linking CartModal ↔ CheckoutModal → **pokaż mi** → code review → commit  
1️⃣7️⃣ **KROK 17** - E2E Testing → **pokaż mi results** → verify → commit

---

## ⚠️ UWAGA O forwardRef

React 19+ pozwala na bardziej naturalne podejścia, ale forwardRef jest **dobrą praktyką** dla `<dialog>` elements, więc **wciąż go będziemy używać**. To świetny drill! 💪

---

## CSS Classes Ready to Use (z index.css)

✓ `.modal` - dialog styling  
✓ `.cart` - cart container  
✓ `.cart-item` - item wrapper  
✓ `.cart-item-actions` - +/- buttons  
✓ `.cart-total` - total price display  
✓ `.control` - form fields  
✓ `.control-row` - form row  
✓ `.button` - primary button  
✓ `.text-button` - text button  
✓ `.modal-actions` - button bar

**Reuse existing styles - nie dodawaj CSS!** ✨
