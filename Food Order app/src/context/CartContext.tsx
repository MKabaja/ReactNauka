import { createContext, useContext, type ReactNode } from 'react';
import { useCart } from '../hooks/useCart';
import { CartContextType } from '../types/cart';

type CartProviderProps = {
	children: ReactNode;
};

const CartContext = createContext<CartContextType | null>(null);

function CartProvider({ children }: CartProviderProps) {
	const cart = useCart();
	return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}
function useCartContext() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCartContext must be used within a CartProvider');
	}
	return context;
}

export { CartProvider, useCartContext };
