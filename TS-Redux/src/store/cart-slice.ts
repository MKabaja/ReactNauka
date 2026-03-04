// [Redux Toolkit] Importujemy createSlice do tworzenia "kawałka" stanu oraz PayloadAction do typowania akcji.
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

// [TS] Definiujemy typ dla pojedynczego przedmiotu w koszyku.
// Dzięki temu TypeScript wie, jakie pola ma każdy obiekt w tablicy `items`.
export type CartItem = {
	id: string;
	title: string;
	price: number;
	quantity: number;
};
// [TS] Definiujemy typ dla całego stanu tego "slice'a".
// Mówi nam, że stan koszyka to obiekt z jednym polem: `items`, które jest tablicą `CartItem`.
type CartState = {
	items: CartItem[];
};

// Definiujemy początkowy stan, który musi pasować do typu `CartState`.
const initialState: CartState = {
	items: [],
};

// [Redux Toolkit] createSlice to funkcja, która upraszcza tworzenie akcji i reducerów.
export const cartSlice = createSlice({
	name: 'cart', // Nazwa slice'a, używana wewnętrznie przez Redux.
	initialState: initialState,
	// Reducery to funkcje, które definiują, jak stan może się zmieniać w odpowiedzi na akcje.
	reducers: {
		// Reducer do dodawania przedmiotu do koszyka.
		addToCart(
			state, // `state` to aktualny stan tego slice'a. Redux Toolkit (dzięki bibliotece Immer) pozwala na "mutowanie" go w ten sposób.
			// [TS] Typujemy akcję. Mówimy, że `action.payload` to obiekt z id, title i price.
			action: PayloadAction<{ id: string; title: string; price: number }>,
		) {
			// Szukamy, czy przedmiot już istnieje w koszyku.
			const itemIndex = state.items.findIndex(
				// [TS] Dzięki typowaniu `action`, TypeScript wie, że `action.payload` ma pole `id`.
				(item) => item.id === action.payload.id,
			);
			if (itemIndex >= 0) {
				// Jeśli przedmiot istnieje, zwiększamy jego ilość.
				state.items[itemIndex].quantity++;
			} else {
				// Jeśli nie, dodajemy nowy przedmiot do tablicy.
				// [TS] TypeScript sprawdzi, czy obiekt, który dodajemy, pasuje do typu `CartItem` (brakuje `quantity`, więc dodajemy je ręcznie).
				state.items.push({ ...action.payload, quantity: 1 });
			}
		},
		// Reducer do usuwania przedmiotu z koszyka.
		removeFromCart(state, action: PayloadAction<string>) {
			// [TS] Tutaj `payload` to po prostu string (ID przedmiotu).
			const itemIndex = state.items.findIndex(
				(item) => item.id === action.payload,
			);
			// Sprawdzamy, czy ilość przedmiotu to 1.
			if (state.items[itemIndex].quantity === 1) {
				// Jeśli tak, usuwamy cały przedmiot z tablicy.
				state.items.splice(itemIndex, 1);
			} else {
				// Jeśli nie, tylko zmniejszamy jego ilość.
				state.items[itemIndex].quantity--;
			}
		},
	},
});

// [Redux Toolkit] createSlice automatycznie generuje kreatory akcji na podstawie nazw reducerów.
// Eksportujemy je, aby móc ich używać w komponentach do wysyłania (dispatch) akcji.
export const { addToCart, removeFromCart } = cartSlice.actions;
