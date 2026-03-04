import {
	useDispatch,
	useSelector,
	type TypedUseSelectorHook,
} from 'react-redux';
// Importujemy typy z naszego pliku store.ts. To kluczowy krok.
import { AppDispatch, RootState } from './store';

// [TS] Definiujemy typ dla funkcji dispatch, aby upewnić się, że jest zgodny z naszym store.
type DispatchFunction = () => AppDispatch; // Zwraca typ `AppDispatch` zdefiniowany w store.ts

// [TS & Redux] Tworzymy własną, "otypowaną" wersję hooka `useDispatch`.
// Zamiast używać `useDispatch` bezpośrednio w komponentach, będziemy używać `useCartDispatch`.
// Dzięki temu `dispatch` będzie znał typy naszych akcji (szczególnie ważne przy thunkach).
const useCartDispatch: DispatchFunction = useDispatch;

// [TS & Redux] Tworzymy własną, "otypowaną" wersję hooka `useSelector`.
// `TypedUseSelectorHook<RootState>` "uczy" hooka `useSelector` o strukturze naszego całego stanu (RootState).
// Dzięki temu, w komponentach, argument `state` w `useSelector(state => ...)` będzie automatycznie otypany.
const useCartSelector: TypedUseSelectorHook<RootState> = useSelector;

// Eksportujemy nasze własne hooki, aby używać ich w całej aplikacji.
// To jest dobra praktyka, która centralizuje typowanie i zapobiega powtarzaniu kodu.
export { useCartDispatch, useCartSelector };
