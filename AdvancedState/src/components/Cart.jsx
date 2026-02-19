import { useContext } from 'react';
import { CartContext } from '../store/shopping-card-context';
import { use } from 'react';

// use - używamy w wersji reacta 19+, można go używac w blokach if.
// useContext - Używamy w wersjach Reacta  mniejsz niz 19, nie mozna ich używac w blokach if
export default function Cart({ onUpdateItemQuantity }) {
	const { items } = useContext(CartContext);

	const totalPrice = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);
	const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

	return (
		<div id='cart'>
			{items.length === 0 && <p>No items in cart!</p>}
			{items.length > 0 && (
				<ul id='cart-items'>
					{items.map((item) => {
						const formattedPrice = `$${item.price.toFixed(2)}`;

						return (
							<li key={item.id}>
								<div>
									<span>{item.name}</span>
									<span> ({formattedPrice})</span>
								</div>
								<div className='cart-item-actions'>
									<button
										onClick={() =>
											onUpdateItemQuantity(item.id, -1)
										}
									>
										-
									</button>
									<span>{item.quantity}</span>
									<button
										onClick={() =>
											onUpdateItemQuantity(item.id, 1)
										}
									>
										+
									</button>
								</div>
							</li>
						);
					})}
				</ul>
			)}
			<p id='cart-total-price'>
				Cart Total: <strong>{formattedTotalPrice}</strong>
			</p>
		</div>
	);
}
