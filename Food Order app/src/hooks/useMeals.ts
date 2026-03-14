import { useEffect, useState } from 'react';
import { MealDTO, Meal } from '../types/meal';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';

export function useMeals() {
	const [meals, setMeals] = useState<Meal[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const MEALSURL = `${API_BASE_URL}${API_ENDPOINTS.MEALS}`;

	useEffect(() => {
		const fetchMeals = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(MEALSURL);
				if (!response.ok) {
					throw new Error('Nie można pobrać danych o posiłkach.');
				}
				const data: MealDTO[] = await response.json();
				setMeals(transformMeals(data));
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('Wystąpił nieznany błąd.');
				}
			} finally {
				setIsLoading(false);
			}
		};
		fetchMeals();
	}, []);
	return { meals, isLoading, error };
}

function transformMeals(mealDTOs: MealDTO[]): Meal[] {
	return mealDTOs.map((meal) => ({
		id: meal.id,
		logo: `${API_BASE_URL}/${meal.image}`,
		name: meal.name,
		price: parseFloat(meal.price),
		description: meal.description,
	}));
}
