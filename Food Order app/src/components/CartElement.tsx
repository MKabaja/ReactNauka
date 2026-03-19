import { type ComponentPropsWithoutRef } from 'react';

type CartItemProps = ComponentPropsWithoutRef<'li'> & {
	name: string;
	quantity: number;
	increment: () => void;
	decrement: () => void;
};
export default function CartElement({
	quantity,
	name,
	increment,
	decrement,
	...props
}: CartItemProps) {
	return (
		<li
			className='cart-item'
			{...props}
		>
			<p>{name}</p>
			<div className='cart-item-actions'>
				<button onClick={decrement}>-</button>
				<span>{quantity}</span>
				<button onClick={increment}>+</button>
			</div>
		</li>
	);
}
