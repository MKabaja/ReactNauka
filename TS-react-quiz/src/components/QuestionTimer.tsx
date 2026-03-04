import { useEffect, useState } from 'react';
export type Mode = 'correct' | 'wrong' | 'answered' | '';
type QuestionTimerProps = {
	duration: number;
	onSkipQuestion?: (() => void) | null;
	mode: Mode;
};
function QuestionTimer({ duration, onSkipQuestion, mode }: QuestionTimerProps) {
	const [timeRemaining, setTimeRemaining] = useState(duration);
	const devidedValue: number = duration / 200;

	useEffect(() => {
		if (!onSkipQuestion) return;
		console.log('Ustawiam Timeout!');

		const timeout = setTimeout(onSkipQuestion, duration);
		return () => clearTimeout(timeout);
	}, [duration, onSkipQuestion]);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeRemaining((prev) => prev - devidedValue);
		}, devidedValue);

		return () => clearInterval(interval);
	}, [duration, devidedValue]);

	return (
		<progress
			id='question-time'
			max={duration}
			value={timeRemaining}
			className={mode}
		></progress>
	);
}

export default QuestionTimer;
