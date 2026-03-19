import { useCartContext } from '../context/CartContext';
import { useMeals } from '../hooks/useMeals';
import CartElement from './CartElement';
import { type Meal } from '../types/meal';
import { type CartItem } from '../types/cart';

import Modal from './Modal';

type CartProps = {
	open: boolean;
	close: () => void;
};

export default function Cart({ open, close }: CartProps) {
	const {
		cart: { items },
		updateItem,
	} = useCartContext();
	const { meals } = useMeals();

	const mealsInCart = getMealsInCart(meals, items);

	return (
		<Modal
			isOpen={open}
			className='cart'
			onClose={close}
		>
			<h2>Twój koszyk</h2>
			<ul>
				{mealsInCart.map((meal) => (
					<CartElement
						key={meal.id}
						name={meal.name}
						quantity={getQuantity(items, meal.id)}
						increment={() =>
							updateItem(
								meal.id,
								incrementQuantity(items, meal.id),
							)
						}
						decrement={() =>
							updateItem(
								meal.id,
								decrementQuantity(items, meal.id),
							)
						}
					/>
				))}
			</ul>
			<p className='cart-total'>
				Suma: {getTotal(items, mealsInCart)} zł
			</p>
			<div className='modal-actions'>
				<button
					className='text-button'
					onClick={close}
				>
					Zamknij
				</button>
				<button className='button'>Złóż zamówienie</button>
			</div>
		</Modal>
	);
}

function getMealsInCart(meals: Meal[], items: readonly CartItem[]) {
	return meals.filter((meal) => items.some((item) => item.id === meal.id));
}

function getQuantity(items: readonly CartItem[], mealId: string) {
	return items.find((item) => item.id === mealId)?.quantity ?? 0;
}
function getTotal(items: readonly CartItem[], mealsInCart: Meal[]) {
	return mealsInCart.reduce((total, meal) => {
		const quantity = getQuantity(items, meal.id);
		return total + meal.price * quantity;
	}, 0);
}
function incrementQuantity(items: readonly CartItem[], mealId: string) {
	const quantity = getQuantity(items, mealId);
	return quantity + 1;
}
function decrementQuantity(items: readonly CartItem[], mealId: string) {
	const quantity = getQuantity(items, mealId);
	return quantity - 1;
}
