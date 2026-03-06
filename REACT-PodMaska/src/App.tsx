import { useState } from 'react';
import { type ChangeEvent } from 'react';

import Counter from './components/Counter/Counter';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';

function App() {
	log('<App /> rendered');
	const [chosenCount, setChosenCount] = useState<number>(0);

	function handleSetCount(newCount: number) {
		setChosenCount(newCount);
		setChosenCount((prevChosenCount) => prevChosenCount + 1);
	}

	return (
		<>
			<Header />
			<main>
				<ConfigureCounter onSetCount={handleSetCount} />
				{/* użycie key na elemencie Counter powoduje,
				że React traktuje go jako zupełnie nowy komponent za każdym razem,
				gdy wartość initialCount się zmienia.
				Dzięki temu stan wewnętrzny Counter jest resetowany do wartości początkowej,
				co jest dokładnie tym, czego chcemy w tym przypadku.
				To podejście jest bardziej efektywne niż używanie useEffect do resetowania stanu,
				ponieważ unika dodatkowego renderowania komponentu po zmianie initialCount.
				 */}

				<Counter
					key={chosenCount}
					initialCount={chosenCount}
				/>
				<Counter initialCount={0} />
			</main>
		</>
	);
}

export default App;
