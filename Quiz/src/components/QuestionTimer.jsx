import { useState, useEffect } from 'react';
export default function QuestionTimer({ timeout, onTimeout, mode }) {
	const [remainingTime, setRemainingTime] = useState(timeout);
	const devideValue = timeout / 200;

	useEffect(() => {
		console.log('setting timeout');
		const timer = setTimeout(onTimeout, timeout);
		return () => clearTimeout(timer);
	}, [timeout, onTimeout]);

	useEffect(() => {
		console.log('setting interval');
		const progress = setInterval(() => {
			setRemainingTime(
				(prevRemainingTime) => prevRemainingTime - devideValue,
			);
		}, devideValue);

		return () => {
			clearInterval(progress);
		};
	}, [timeout]);

	return (
		<progress
			id='question-time'
			max={timeout}
			value={remainingTime}
			className={mode}
		></progress>
	);
}
