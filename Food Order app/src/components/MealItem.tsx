import { ComponentPropsWithoutRef } from 'react';
import { Meal } from '../types/meal';

type MealItemProps = ComponentPropsWithoutRef<'li'> & {
	meal: Meal;
};

export default function MealItem({ meal }: MealItemProps) {
	const { logo, name, price, description } = meal;
	return (
		<li className='meal-item'>
			<img
				src={logo}
				alt={name}
			/>
			<h3>{name}</h3>
			<p className='meal-item-price'>{`${price} zł`}</p>
			<article>
				<p className='meal-item-description'>{description}</p>
			</article>
			<div className='meal-item-actions'>
				<button className='button'>Dodaj do koszyka</button>
			</div>
		</li>
	);
}
