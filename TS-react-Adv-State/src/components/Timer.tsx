import Container from './UI/Container.tsx';
import {
	useTimersContext,
	type Timer as TimerProps,
} from '../store/timers-contex.tsx';
import { useEffect, useState, useRef } from 'react';

export default function Timer({ name, duration }: TimerProps) {
	const intervalRef = useRef<number | null>(null);
	const [remainingTime, setRemainingTime] = useState(duration * 1000);

	const { isRuning } = useTimersContext();

	if (remainingTime <= 0 && intervalRef.current) {
		clearInterval(intervalRef.current);
	}

	useEffect(() => {
		let timer: number;

		if (isRuning) {
			timer = setInterval(() => {
				setRemainingTime((prevTime) => prevTime - 50);
			}, 50);
			intervalRef.current = timer;
		} else if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		return () => {
			clearInterval(timer);
		};
	}, [isRuning]);

	const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

	return (
		<Container as='article'>
			<h2>{name}</h2>
			<p>
				<progress
					max={duration * 1000}
					value={remainingTime}
				></progress>
			</p>
			<p>{formattedRemainingTime}</p>
		</Container>
	);
}
