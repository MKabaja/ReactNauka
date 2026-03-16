import { useState, useEffect } from 'react';
import { Cart, CartItem } from '../types/cart';
import { CART_STORAGE_KEY } from '../constants/cart';
import {
	CartMutationAction,
	CartRemovalAction,
	AdjustUpdateIntent,
} from '../types/cart';

export function useCart() {
	const [cart, setCart] = useState<Cart>(() => retrieveCart());

	const addItem: CartMutationAction = (mealId, quantity = 1) => {
		setCart((prevCart) => {
			if (isAlreadyInCart(mealId, prevCart)) {
				return {
					...prevCart,
					items: adjustQuantity(
						mealId,
						prevCart,
						quantity,
						'increaseQuantity',
					),
				};
			}
			return {
				...prevCart,
				items: [...prevCart.items, { id: mealId, quantity }],
			};
		});
	};

	const removeItem: CartRemovalAction = (mealId) => {
		setCart((prevCart) => ({
			...prevCart,
			items: excludeFromCart(mealId, prevCart),
		}));
	};

	const updateItem: CartMutationAction = (mealId, quantity) => {
		if (quantity === undefined || quantity <= 0) {
			removeItem(mealId);
			return;
		}
		setCart((prevCart) => ({
			...prevCart,
			items: adjustQuantity(mealId, prevCart, quantity, 'updateQuantity'),
		}));
	};

	const clearCart = () => {
		setCart({ items: [] });
	};

	const totalItemsInCart: number = cart.items.reduce(
		(total, { quantity }) => total + quantity,
		0,
	);

	useEffect(() => {
		persistCart(cart);
	}, [cart]);

	return {
		cart,
		addItem,
		removeItem,
		updateItem,
		clearCart,
		totalItemsInCart,
	};
}

//========================> Helper functions <========================

function isAlreadyInCart(mealId: string, cart: Cart): boolean {
	return cart.items.some((item) => item.id === mealId);
}
function adjustQuantity(
	mealId: string,
	cart: Cart,
	quantity: number,
	intent: AdjustUpdateIntent,
): CartItem[] {
	const operations = {
		increaseQuantity: cart.items.map((item) =>
			item.id === mealId
				? { ...item, quantity: item.quantity + quantity }
				: item,
		),
		updateQuantity: cart.items.map((item) =>
			item.id === mealId ? { ...item, quantity } : item,
		),
	};
	return operations[intent];
}

function excludeFromCart(mealId: string, cart: Cart): CartItem[] {
	return cart.items.filter((item) => item.id !== mealId);
}

function persistCart(cart: Cart) {
	localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.items));
}

function retrieveCart(): Cart {
	const storedCart = localStorage.getItem(CART_STORAGE_KEY);

	try {
		const parsed = storedCart ? JSON.parse(storedCart) : [];
		return { items: parsed };
	} catch (error) {
		console.error('Failed to parse cart from localStorage:', error);

		return { items: [] };
	}
}
