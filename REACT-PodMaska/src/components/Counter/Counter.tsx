import {
	useState,
	memo,
	useMemo,
	useCallback,
	useEffect,
	type ComponentProps,
} from 'react';

import IconButton from '../UI/IconButton';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';
import CounterHistory from './CounterHistory';

function isPrime(number: number): boolean {
	log('Calculating if is prime number', 2, 'other');
	if (number <= 1) {
		return false;
	}

	const limit = Math.sqrt(number);

	for (let i = 2; i <= limit; i++) {
		if (number % i === 0) {
			return false;
		}
	}

	return true;
}
type CounterProps = { initialCount: number } & ComponentProps<'section'>;
export type CounterChange = {
	value: number;
	id: number;
};

const Counter = memo(function Counter({ initialCount }: CounterProps) {
	log('<Counter /> rendered', 1);
	const initialCountIsPrime = useMemo(
		() => isPrime(initialCount),
		[initialCount],
		// Funkcja isPrime zostanie ponownie obliczona tylko wtedy,
		//  gdy wartość initialCount się zmieni
	);

	// useEffect(() => {
	// 	setCounterChanges([{ value: initialCount, id: Math.random() * 100 }]);
	// }, [initialCount]);

	/**
	 * =========================================================
	 * Use Effect nie jest optymalnym rozwiązaniem,
	  ponieważ powoduje dodatkowe renderowanie komponentu po zmianie initialCount.
	  W tym przypadku lepiej jest zresetowac stan za pomocą key na elemencie Counter,
	  który jest unikalny dla każdej wartości initialCount.
	 * =========================================================
	 */

	// const [counter, setCounter] = useState<number>(initialCount);

	const [counterChanges, setCounterChanges] = useState<CounterChange[]>([
		{ value: initialCount, id: Math.random() * 100 },
	]);

	const currentCounter: number = counterChanges.reduce(
		(prevCounter, counterChange) => prevCounter + counterChange.value,
		0,
	);

	const handleDecrement = useCallback(() => {
		// setCounter((prevCounter) => prevCounter - 1);
		setCounterChanges((prevCounterChanges) => [
			{ value: -1, id: Math.random() * 100 },
			...prevCounterChanges,
		]);
	}, []);

	const handleIncrement = useCallback(() => {
		// setCounter((prevCounter) => prevCounter + 1);
		setCounterChanges((prevCounterChanges) => [
			{ value: 1, id: Math.random() * 100 },
			...prevCounterChanges,
		]);
	}, []);

	return (
		<section className='counter'>
			<p className='counter-info'>
				The initial counter value was <strong>{initialCount}</strong>.
				It <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong>{' '}
				prime number.
			</p>
			<p>
				<IconButton
					icon={MinusIcon}
					onClick={handleDecrement}
				>
					Decrement
				</IconButton>
				<CounterOutput value={currentCounter} />
				<IconButton
					icon={PlusIcon}
					onClick={handleIncrement}
				>
					Increment
				</IconButton>
			</p>
			<CounterHistory history={counterChanges} />
		</section>
	);
});

export default Counter;
