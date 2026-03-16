import { useCart } from '../hooks/useCart';

/**
 * Reprezentuje pojedynczy element w koszyku
 * @property { string } id - unikalny identyfikator posiłku
 * @property { number } quantity - ilość sztuk
 */
export interface CartItem {
	readonly id: string;
	readonly quantity: number;
}
/**  Tablica produktów aktualnie znajdujących się w koszyku.
 * @property { CartItem[] } items - lista elementów w koszyku
 */
export interface Cart {
	readonly items: readonly CartItem[];
}

/**
 * Typ dla akcji mutujących koszyk (dodawanie, aktualizacja ilości)
 * @callback CartMutationAction
 * @param {string} id - unikalny identyfikator posiłku
 * @param {number} [quantity=1] - ilość sztuk (opcjonalne, domyślnie 1)
 * @returns {void}
 *
 * @example
 * addItem('m1', 2); // dodaj 2 sztuki posiłku m1
 * addItem('m2');    // dodaj 1 sztukę posiłku m2 (default)
 */
export type CartMutationAction = (id: string, quantity?: number) => void;

/**
 * Typ dla akcji usuwającej artykuł z koszyka
 * @callback CartRemovalAction
 * @param {string} id - unikalny identyfikator posiłku do usunięcia
 * @returns {void}
 *
 * @example
 * removeItem('m1'); // usuń posiłek m1 z koszyka
 */
export type CartRemovalAction = (id: string) => void;

/**
 * Typ reprezentujący intencję operacji na ilości
 * - 'increaseQuantity': zwiększ istniejącą ilość
 * - 'updateQuantity': ustaw dokładną ilość
 * @typedef {'increaseQuantity' | 'updateQuantity'} AdjustUpdateIntent
 */
export type AdjustUpdateIntent = 'increaseQuantity' | 'updateQuantity';

/**
 * Typ reprezentujący całość kontekstu koszyka
 * Zawiera: stan koszyka, akcje (dodawanie, usuwanie), getter totalItemsInCart
 * @typedef {Object} CartContextType
 */
export type CartContextType = ReturnType<typeof useCart>;
