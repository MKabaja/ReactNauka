import logo from '../assets/logo.jpg';
import MealItem from './MealItem';
import { useMeals } from '../hooks/useMeals';
import Spinner from './Spinner';

export default function Meals() {
	const { meals, isLoading, error } = useMeals();

	return (
		<section>
			{isLoading && <Spinner />}
			{error && <p>{error}</p>}
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
