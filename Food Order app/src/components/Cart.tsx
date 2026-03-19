import { useCartContext } from '../context/CartContext';
import { useMeals } from '../hooks/useMeals';
import { getMealsInCart, getTotal } from '../helpers/cartHelpers';
import { useState, type ReactNode } from 'react';
import CartContent from './CartContent';
import CheckoutContent from './CheckoutContent';

import Modal from './Modal';

type CartProps = {
	open: boolean;
	close: () => void;
};
type ModalView = 'cart' | 'checkout';

export default function Cart({ open, close }: CartProps) {
	const [modalView, setModalView] = useState<ModalView>('cart');
	const {
		cart: { items },
		updateItem,
	} = useCartContext();
	const { meals } = useMeals();
	const mealsInCart = getMealsInCart(meals, items);

	const MODAL_VIEWS: Record<ModalView, ReactNode> = {
		cart: (
			<CartContent
				productsInCart={mealsInCart}
				addedProducts={items}
				updateProduct={updateItem}
				close={handleCloseModal}
				goToCheckout={goToCheckout}
			/>
		),
		checkout: (
			<CheckoutContent
				totalPrice={getTotal(items, mealsInCart)}
				close={handleCloseModal}
			/>
		),
	};

	function goToCheckout() {
		setModalView('checkout');
	}
	function handleCloseModal() {
		setModalView('cart');
		close();
	}

	return (
		<Modal
			isOpen={open}
			className='cart'
			onClose={handleCloseModal}
		>
			{MODAL_VIEWS[modalView]}
		</Modal>
	);
}
