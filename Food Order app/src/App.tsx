import Header from './components/Header';
import Meals from './components/Meals';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';

function App() {
	return (
		<CartProvider>
			<Header />
			<main>
				<Meals />
			</main>
		</CartProvider>
	);
}

export default App;
