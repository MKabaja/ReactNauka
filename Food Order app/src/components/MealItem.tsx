import { ComponentPropsWithoutRef } from 'react';
import { Meal } from '../types/meal';
import { useCartContext } from '../context/CartContext';

type MealItemProps = ComponentPropsWithoutRef<'li'> & {
	meal: Meal;
};

export default function MealItem({ meal }: MealItemProps) {
	const { logo, name, price, description, id } = meal;
	const { addItem } = useCartContext();
	return (
		<li
			id={id}
			className='meal-item'
		>
			<img
				src={logo}
				alt={name}
			/>
			<h3>{name}</h3>
			<p className='meal-item-price'>{`${price} zł`}</p>

			<p className='meal-item-description'>{description}</p>

			<div className='meal-item-actions'>
				<button
					className='button'
					onClick={() => addItem(id)}
				>
					Dodaj do koszyka
				</button>
			</div>
		</li>
	);
}
