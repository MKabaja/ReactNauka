import { useState, useEffect } from 'react';
export default function QuestionTimer({ timeout, onTimeout }) {
	const [remainingTime, setRemainingTime] = useState(timeout);
	const devideValue = timeout / 200;

	useEffect(() => {
		console.log('setting timeout');
		setTimeout(onTimeout, timeout);
	}, [timeout, onTimeout]);

	useEffect(() => {
		console.log('setting interval');
		setInterval(() => {
			setRemainingTime(
				(prevRemainingTime) => prevRemainingTime - devideValue,
			);
		}, devideValue);
	}, []);

	return (
		<progress
			id='question-time'
			max={timeout}
			value={remainingTime}
		></progress>
	);
}
