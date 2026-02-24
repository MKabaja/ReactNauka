import { useState, useCallback } from 'react';
import quizData from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import Progressbar from './ProgressBar.jsx';
import QuestionTimer from './QuestionTimer.jsx';

const TIMER = 15000;

export default function Quiz() {
	const [userAnswers, setUserAnswers] = useState([]);

	const activeQuestionIndex = userAnswers.length;
	const quizIsComplete = activeQuestionIndex === quizData.length;

	const handleSelectAnswer = useCallback(function handleSelectAnswer(
		selectedAnswer,
	) {
		setUserAnswers((prevUserAnswers) => {
			return [...prevUserAnswers, selectedAnswer];
		});
	}, []);
	const handleSkipAnswer = useCallback(
		() => handleSelectAnswer(null),

		[handleSelectAnswer],
	);
	if (quizIsComplete) {
		return (
			<div id='summary'>
				<h2>Quiz Complete!</h2>
				<img
					src={quizCompleteImg}
					alt='Quiz complete image'
				/>
			</div>
		);
	}
	const shuffledAnswers = [...quizData[activeQuestionIndex].answers];
	shuffledAnswers.sort(() => Math.random() - 0.5);

	return (
		<section id='quiz'>
			<div id='question'>
				<QuestionTimer
					timeout={TIMER}
					onTimeout={handleSkipAnswer}
				/>
				<h2>{quizData[activeQuestionIndex].text}</h2>
				<ul id='answers'>
					{shuffledAnswers.map((answer, index) => {
						return (
							<li
								key={index}
								className='answer'
							>
								<button
									onClick={() => handleSelectAnswer(answer)}
								>
									{answer}
								</button>
							</li>
						);
					})}
				</ul>
				{/* <Progressbar
					timer={TIMER}
					onFinish={handleFinish}
				/> */}
			</div>
		</section>
	);
}
