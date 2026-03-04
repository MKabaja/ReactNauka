import { configureStore } from '@reduxjs/toolkit';
// Importujemy reducer z naszego cart-slice.
import { cartSlice } from './cart-slice.ts';

// [Redux Toolkit] `configureStore` to główna funkcja do tworzenia store'a.
// Upraszcza konfigurację, automatycznie dodając m.in. Redux DevTools i Immer.
export const store = configureStore({
	// `reducer` to obiekt, w którym klucze to nazwy "slice'ów" stanu,
	// a wartości to odpowiadające im reducery.
	reducer: {
		cart: cartSlice.reducer, // Łączymy reducer z `cartSlice` ze stanem globalnym pod kluczem `cart`.
	},
});

// [TS] Magia inferencji typów! Zamiast ręcznie pisać `interface RootState { cart: CartState }`,
// pozwalamy TypeScriptowi "wywnioskować" typ całego stanu na podstawie tego, co zwraca `store.getState()`.
// Jeśli dodasz nowy slice do `reducer`, ten typ zaktualizuje się automatycznie.
export type RootState = ReturnType<typeof store.getState>;

// [TS] Podobnie jak z `RootState`, pobieramy typ funkcji `dispatch` bezpośrednio ze store'a.
// Gwarantuje to, że nasz `dispatch` jest w pełni świadomy wszystkich akcji,
// w tym akcji asynchronicznych (thunks), jeśli ich użyjemy.
export type AppDispatch = typeof store.dispatch;
