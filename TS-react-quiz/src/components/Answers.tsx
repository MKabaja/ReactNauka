import { type QuizAnswer } from '../questions';
import { type SelectedPayload } from './Questions';
import { type Mode } from './QuestionTimer';
type AnswersProps = {
	answers: QuizAnswer[];
	selectedAnswer: string | null;
	answerState: Mode;

	onSelect: (payload: SelectedPayload) => void;
};

function Answers({
	answers,
	selectedAnswer,
	answerState,
	onSelect,
}: AnswersProps) {
	return (
		<ul id='answers'>
			{answers.map((answer) => {
				const isSelected = selectedAnswer === answer.answer;
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
						key={answer.answer}
						className='answer'
					>
						<button
							onClick={() =>
								onSelect({
									userAnswer: answer.answer,
									isAnswerCorrect: answer.isCorrect,
								})
							}
							className={cssClass}
							disabled={answerState !== ''}
						>
							{answer.answer}
						</button>
					</li>
				);
			})}
		</ul>
	);
}
export default Answers;
