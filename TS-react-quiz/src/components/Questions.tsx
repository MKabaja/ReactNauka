import { useState } from 'react';
import quizData from '../questions.ts';
import QuestionTimer from './QuestionTimer.tsx';
import Answers from './Answers.tsx';
import { type Mode } from './QuestionTimer.tsx';

type QuestionProps = {
	index: number;
	onSelectAnswer: (answer: SelectedPayload | null) => void;
	onSkipAnswer: () => void;
};

export type SelectedAnswerState = {
	selectedAnswer: string;
	isCorrect: boolean | null;
};
export type SelectedPayload = {
	userAnswer: string;
	isAnswerCorrect: boolean;
};

function Question({ index, onSelectAnswer, onSkipAnswer }: QuestionProps) {
	const [answer, setAnswer] = useState<SelectedAnswerState>({
		selectedAnswer: '',
		isCorrect: null,
	});
	let timer: number = 10000;

	if (answer.selectedAnswer) {
		timer = 1000;
	}
	if (answer.isCorrect !== null) {
		timer = 2000;
	}

	function handleSelectAnswer(selected: SelectedPayload) {
		setAnswer({
			selectedAnswer: selected.userAnswer,
			isCorrect: null,
		});

		setTimeout(() => {
			setAnswer({
				selectedAnswer: selected.userAnswer,
				isCorrect: selected.isAnswerCorrect,
			});
			setTimeout(() => {
				onSelectAnswer({
					userAnswer: selected.userAnswer,
					isAnswerCorrect: selected.isAnswerCorrect,
				});
			}, 2000);
		}, 1000);
	}
	let answerState: Mode = '';

	if (answer.selectedAnswer && answer.isCorrect !== null) {
		answerState = answer.isCorrect ? 'correct' : 'wrong';
	} else if (answer.selectedAnswer) {
		answerState = 'answered';
	}

	return (
		<div id='question'>
			<QuestionTimer
				key={timer}
				duration={timer}
				onSkipQuestion={
					answer.selectedAnswer === '' ? onSkipAnswer : null
				}
				mode={answerState}
			/>
			<h2>{quizData[index].text}</h2>
			<Answers
				answers={quizData[index].answers}
				selectedAnswer={answer.selectedAnswer}
				answerState={answerState}
				onSelect={handleSelectAnswer}
			/>
		</div>
	);
}
export default Question;
