import logo from '../assets/logo.jpg';
import { useCartContext } from '../context/CartContext';

export default function Header() {
	const { totalItemsInCart } = useCartContext();

	return (
		<header id='main-header'>
			<div id='title'>
				<h1>Fajne Posiłki</h1>
				<img
					src={logo}
					alt='Talerz z sztućcami, oraz winem.'
				/>
			</div>
			<button className='text-button'>Koszyk({totalItemsInCart})</button>
		</header>
	);
}
