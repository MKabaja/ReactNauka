import quizCompleteImg from '../assets/quiz-complete.png';
import quizData from '../questions.ts';
import { type SelectedAnswer } from './Quiz.tsx';

type SummaryProps = {
	answers: SelectedAnswer[];
};
function Summary({ answers }: SummaryProps) {
	const skippedAnswers = answers.filter((answer) => answer === null);
	const correctAnswers = answers.filter(
		(answer, index) => answer === quizData[index].answers[0],
	);
	const skippedAnswersShare = Math.round(
		(skippedAnswers.length / answers.length) * 100,
	);
	const correctAnswersShare = Math.round(
		(correctAnswers.length / answers.length) * 100,
	);

	const wrongAnswersShare = 100 - correctAnswersShare - skippedAnswersShare;

	return (
		<div id='summary'>
			<img
				src={quizCompleteImg}
				alt='Quiz complete image'
			/>
			<h2>Quiz Complete!</h2>
			<div id='summary-stats'>
				<p>
					<span className='number'>{skippedAnswersShare}%</span>
					<span className='text'> skipped</span>
				</p>
				<p>
					<span className='number'>{correctAnswersShare}%</span>
					<span className='text'>Answered correctly</span>
				</p>
				<p>
					<span className='number'>{wrongAnswersShare}%</span>
					<span className='text'>Answered incorrectly</span>
				</p>
			</div>
			<ol>
				{answers.map((answer, index) => {
					let cssClass = 'user-answer';

					if (answer === null) {
						cssClass += ' skipped';
					} else if (answer === quizData[index].answers[0]) {
						cssClass += ' correct';
					} else {
						cssClass += ' wrong';
					}
					return (
						<li key={index}>
							<h3>{index + 1}</h3>
							<p className='question'>{quizData[index].text}</p>
							<p className={cssClass}>{answer ?? 'skipped'}</p>
						</li>
					);
				})}
			</ol>
		</div>
	);
}
export default Summary;
