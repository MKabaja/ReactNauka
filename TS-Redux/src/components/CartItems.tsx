// [Redux] Importujemy nasze własne, otypowane hooki. To kluczowa dobra praktyka.
import { useCartDispatch, useCartSelector } from '../store/hooks.ts';
// [Redux] Importujemy kreatory akcji oraz typ `CartItem` ze slice'a.
import {
	addToCart,
	removeFromCart,
	type CartItem,
} from '../store/cart-slice.ts';

export default function CartItems() {
	// [Redux & TS] Używamy `useCartSelector`. Ponieważ jest to nasz otypowany hook,
	// TypeScript automatycznie wie, że `state` ma typ `RootState`.
	// Dzięki temu, gdy piszesz `state.`, dostajesz podpowiedzi (`cart`, etc.).
	const cartItems = useCartSelector((state) => state.cart.items);
	// [Redux & TS] Używamy `useCartDispatch`. Zwraca on funkcję `dispatch`, która jest
	// w pełni otypowana i wie, jakich argumentów oczekują nasze akcje (`addToCart`, `removeFromCart`).
	const dispatch = useCartDispatch();

	// Obliczamy sumę. `cartItems` ma poprawny typ `CartItem[]`, więc TS wie, że `item` ma pola `price` i `quantity`.
	const totalPrice = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);
	const formattedTotalPrice = totalPrice.toFixed(2);

	// [TS] Ta funkcja oczekuje argumentu typu `CartItem`.
	function handleAddToCart(item: CartItem) {
		// [Redux & TS] Wywołujemy `dispatch` z akcją `addToCart`.
		// TypeScript sprawdzi, czy `item` pasuje do payloadu oczekiwanego przez `addToCart`.
		// Gdybyś spróbował przekazać np. tylko `item.id`, dostałbyś błąd.
		dispatch(addToCart(item));
	}
	// [TS] Ta funkcja oczekuje `id` jako string.
	function handleRemoveFromCart(id: string) {
		// [Redux & TS] Tutaj TypeScript pilnuje, aby do `removeFromCart` przekazać string,
		// zgodnie z definicją w `cart-slice.ts` (`PayloadAction<string>`).
		dispatch(removeFromCart(id));
	}

	return (
		<div id='cart'>
			{cartItems.length === 0 && <p>No items in cart!</p>}

			{cartItems.length > 0 && (
				<ul id='cart-items'>
					{cartItems.map((item) => {
						const formattedPrice = `$${item.price.toFixed(2)}`;

						return (
							<li key={item.id}>
								<div>
									<span>{item.title}</span>
									<span> ({formattedPrice})</span>
								</div>
								<div className='cart-item-actions'>
									<button
										onClick={() =>
											handleRemoveFromCart(item.id)
										}
									>
										-
									</button>
									<span>{item.quantity}</span>
									<button
										onClick={() => handleAddToCart(item)}
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
				Cart Total: <strong>${formattedTotalPrice}</strong>
			</p>
		</div>
	);
}
