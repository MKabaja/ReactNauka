import logo from '../assets/logo.jpg';
import { useCartContext } from '../context/CartContext';
import Cart from './Cart';
import { useState } from 'react';

export default function Header() {
	const { totalItemsInCart } = useCartContext();
	const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

	function OpenCart() {
		setIsCartOpen(true);
	}
	function CloseCart() {
		setIsCartOpen(false);
	}

	return (
		<header id='main-header'>
			<div id='title'>
				<h1>Fajne Posiłki</h1>
				<img
					src={logo}
					alt='Talerz z sztućcami, oraz winem.'
				/>
			</div>
			<button
				onClick={OpenCart}
				className='text-button'
			>
				Koszyk({totalItemsInCart})
			</button>
			<Cart
				open={isCartOpen}
				close={CloseCart}
			/>
		</header>
	);
}
