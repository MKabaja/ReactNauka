import { useState, useCallback } from 'react';
import quizData from '../questions.ts';
import Summary from './Summary.tsx';
import Question from './Questions.tsx';
import { type SelectedPayload } from './Questions.tsx';

export type SelectedAnswer = SelectedPayload | null;

function Quiz() {
	const [answers, setAnswers] = useState<SelectedAnswer[]>([]);

	const activeQuestionIndex: number = answers.length;
	const quizIsComplete: boolean = activeQuestionIndex === quizData.length;

	const handleSelectAnswer = useCallback((selectedAnswer: SelectedAnswer) => {
		setAnswers((prevAnswer) => {
			return [...prevAnswer, selectedAnswer];
		});
	}, []);

	const handleSkipAnswer = useCallback(() => {
		handleSelectAnswer(null);
	}, [handleSelectAnswer]);

	if (quizIsComplete) {
		return <Summary answers={answers} />;
	}
	return (
		<section id='quiz'>
			<Question
				key={activeQuestionIndex}
				index={activeQuestionIndex}
				onSelectAnswer={handleSelectAnswer}
				onSkipAnswer={handleSkipAnswer}
			/>
		</section>
	);
}
export default Quiz;
