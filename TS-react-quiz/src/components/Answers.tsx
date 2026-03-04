import { useState, useEffect } from 'react';
type AnswersProps = {
	answers: string[];
	selectedAnswer: string | null;
	answerState: string | null;
	id: string;
	onSelect: (answerText: string) => void;
};

function Answers({
	answers,
	selectedAnswer,
	answerState,
	onSelect,
	id,
}: AnswersProps) {
	const [shuffledAnswers, setSchuffledAnswers] = useState<string[]>([]);
	useEffect(() => {
		const copiedAnswers = [...answers];
		copiedAnswers.sort(() => Math.random() - 0.5);
		setSchuffledAnswers(copiedAnswers);
	}, [id, answers]);

	return (
		<ul id='answers'>
			{shuffledAnswers.map((answer) => {
				const isSelected = selectedAnswer === answer;
				let cssClass = '';
				if (answerState === 'answered' && isSelected) {
					cssClass = 'selected';
				}
				if (
					(answerState === 'correct' || answerState === 'wrong') &&
					isSelected
				) {
					cssClass = answerState;
				}

				return (
					<li
						key={answer}
						className='answer'
					>
						<button
							onClick={() => onSelect(answer)}
							className={cssClass}
							disabled={answerState !== ''}
						>
							{answer}
						</button>
					</li>
				);
			})}
		</ul>
	);
}
export default Answers;
