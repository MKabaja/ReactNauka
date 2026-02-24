import { useState, useEffect } from 'react';

export default function Progressbar({ timer, onFinish }) {
	const [remainingTime, setRemainingTime] = useState(timer);

	useEffect(() => {
		const progressBar = setInterval(() => {
			setRemainingTime((prevRemainingTime) => {
				if (prevRemainingTime === 0) {
					clearInterval(progressBar);
					onFinish();
					return;
				}
				return prevRemainingTime - 15;
			});
		}, 15);

		return () => clearInterval(progressBar);
	}, [onFinish, timer]);

	return (
		<progress
			value={remainingTime}
			max={timer}
		></progress>
	);
}
