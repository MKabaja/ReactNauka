import { type Meal } from '../types/meal';
import { type CartItem } from '../types/cart';

function getMealsInCart(meals: Meal[], items: readonly CartItem[]) {
	return meals.filter((meal) => items.some((item) => item.id === meal.id));
}

function getQuantity(items: readonly CartItem[], mealId: string) {
	return items.find((item) => item.id === mealId)?.quantity ?? 0;
}
function getTotal(items: readonly CartItem[], mealsInCart: Meal[]) {
	return mealsInCart.reduce((total, meal) => {
		const quantity = getQuantity(items, meal.id);
		return parseFloat((total + meal.price * quantity).toFixed(2));
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

export {
	getMealsInCart,
	getQuantity,
	getTotal,
	incrementQuantity,
	decrementQuantity,
};
