import { type ChangeEvent, useState } from 'react';
import { log } from '../../log.js';

type ConfigureCounterProps = {
	onSetCount: (newCount: number) => void;
};
export default function ConfigureCounter({
	onSetCount,
}: ConfigureCounterProps) {
	log('<ConfigureCounter /> rendered', 1);
	const [enteredNumber, setEnteredNumber] = useState<number>(0);

	function handleChange(event: ChangeEvent<HTMLInputElement>): void {
		setEnteredNumber(+event.target.value);
	}

	function handleSetClick(): void {
		onSetCount(enteredNumber);
		setEnteredNumber(0);
	}
	return (
		<section id='configure-counter'>
			<h2>Set Counter</h2>
			<input
				type='number'
				onChange={handleChange}
				value={enteredNumber}
			/>
			<button onClick={handleSetClick}>Set</button>
		</section>
	);
}
