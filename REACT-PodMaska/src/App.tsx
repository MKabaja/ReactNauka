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
	}

	return (
		<>
			<Header />
			<main>
				<ConfigureCounter onSetCount={handleSetCount} />

				<Counter initialCount={chosenCount} />
			</main>
		</>
	);
}

export default App;
