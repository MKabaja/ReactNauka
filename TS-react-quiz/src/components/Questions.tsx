import { useState } from 'react';
import quizData from '../questions.ts';
import QuestionTimer from './QuestionTimer.tsx';
import Answers from './Answers.tsx';
import { type Mode } from './QuestionTimer.tsx';

type QuestionProps = {
	index: number;
	onSelectAnswer: (answer: string) => void;
	onSkipAnswer: () => void;
};
type Answer = {
	selectedAnswer: string;
	isCorrect: boolean | null;
};

function Question({ index, onSelectAnswer, onSkipAnswer }: QuestionProps) {
	const [answer, setAnswer] = useState<Answer>({
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

	function handleSelectAnswer(answer: string) {
		setAnswer({
			selectedAnswer: answer,
			isCorrect: null,
		});

		setTimeout(() => {
			setAnswer({
				selectedAnswer: answer,
				isCorrect: quizData[index].answers[0] === answer,
			});
			setTimeout(() => {
				onSelectAnswer(answer);
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
				id={quizData[index].id}
			/>
		</div>
	);
}
export default Question;
