import {
	decrementQuantity,
	incrementQuantity,
	getTotal,
	getQuantity,
} from '../helpers/cartHelpers';
import { type Meal } from '../types/meal';
import { type CartItem, type CartMutationAction } from '../types/cart';
import CartElement from './CartElement';

type CartContentProps = {
	productsInCart: Meal[];
	addedProducts: readonly CartItem[];
	updateProduct: CartMutationAction;
	close: () => void;
	goToCheckout: () => void;
};

export default function CartContent({
	productsInCart,
	addedProducts,
	updateProduct,
	close,
	goToCheckout,
}: CartContentProps) {
	return (
		<>
			<h2>Twój koszyk</h2>
			<ul>
				{productsInCart.map((product) => (
					<CartElement
						key={product.id}
						name={product.name}
						quantity={getQuantity(addedProducts, product.id)}
						increment={() =>
							updateProduct(
								product.id,
								incrementQuantity(addedProducts, product.id),
							)
						}
						decrement={() =>
							updateProduct(
								product.id,
								decrementQuantity(addedProducts, product.id),
							)
						}
					/>
				))}
			</ul>
			<p className='cart-total'>
				Suma: {getTotal(addedProducts, productsInCart)} zł
			</p>
			<div className='modal-actions'>
				<button
					className='text-button'
					onClick={close}
				>
					Zamknij
				</button>
				<button
					className='button'
					onClick={goToCheckout}
				>
					Złóż zamówienie
				</button>
			</div>
		</>
	);
}
