import logo from '../assets/logo.jpg';
import MealItem from './MealItem';
import { useMeals } from '../hooks/useMeals';

export default function Meals() {
	const { meals, isLoading, error } = useMeals();

	return (
		<section>
			<ul id='meals'>
				{meals.map((meal) => (
					<MealItem
						key={meal.id}
						meal={meal}
					/>
				))}
			</ul>
		</section>
	);
}
