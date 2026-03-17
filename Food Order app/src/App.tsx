import Header from './components/Header';
import Meals from './components/Meals';
import { CartProvider } from './context/CartContext';

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
