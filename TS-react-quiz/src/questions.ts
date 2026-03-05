export type QuizAnswer = {
	answer: string;
	isCorrect: boolean;
};
export type QuizQuestion = {
	id: string;
	text: string;
	answers: QuizAnswer[];
};
const quizData: QuizQuestion[] = [
	{
		id: 'q1',
		text: 'Which of the following definitions best describes React.js?',
		answers: [
			{
				answer: 'A library to build user interfaces with help of declarative code.',
				isCorrect: true,
			},

			{
				answer: 'A library for managing state in web applications.',
				isCorrect: false,
			},
			{
				answer: 'A framework to build user interfaces with help of imperative code.',
				isCorrect: false,
			},
			{
				answer: 'A library used for building mobile applications only.',
				isCorrect: false,
			},
		],
	},
	{
		id: 'q2',
		text: 'What purpose do React hooks serve?',
		answers: [
			{
				answer: 'Enabling the use of state and other React features in functional components.',
				isCorrect: true,
			},
			{
				answer: 'Creating responsive layouts in React applications.',
				isCorrect: false,
			},
			{
				answer: 'Handling errors within the application.',
				isCorrect: false,
			},
			{
				answer: 'Part of the Redux library for managing global state.',
				isCorrect: false,
			},
		],
	},
	{
		id: 'q3',
		text: 'Can you identify what JSX is?',
		answers: [
			{
				answer: 'A JavaScript extension that adds HTML-like syntax to JavaScript.',
				isCorrect: true,
			},
			{
				answer: 'A JavaScript library for building dynamic user interfaces.',
				isCorrect: false,
			},
			{
				answer: 'A specific HTML version that was explicitly created for React.',
				isCorrect: false,
			},
			{
				answer: 'A tool for making HTTP requests in a React application.',
				isCorrect: false,
			},
		],
	},
	{
		id: 'q4',
		text: 'What is the most common way to create a component in React?',
		answers: [
			{
				answer: 'By defining a JavaScript function that returns a renderable value.',
				isCorrect: true,
			},
			{
				answer: 'By defining a custom HTML tag in JavaScript.',
				isCorrect: false,
			},
			{
				answer: 'By creating a file with a .jsx extension.',
				isCorrect: false,
			},
			{
				answer: 'By using the "new" keyword followed by the component name.',
				isCorrect: false,
			},
		],
	},
	{
		id: 'q5',
		text: 'What does the term "React state" imply?',
		answers: [
			{
				answer: 'An object in a component that holds values and may cause the component to render on change.',
				isCorrect: true,
			},
			{
				answer: 'The lifecycle phase a React component is in.',
				isCorrect: false,
			},
			{
				answer: 'The overall status of a React application, including all props and components.',
				isCorrect: false,
			},
			{
				answer: 'A library for managing global state in React applications.',
				isCorrect: false,
			},
		],
	},
	{
		id: 'q6',
		text: 'How do you typically render list content in React apps?',
		answers: [
			{
				answer: 'By using the map() method to iterate over an array of data and returning JSX.',
				isCorrect: true,
			},
			{
				answer: 'By using the for() loop to iterate over an array of data and returning JSX.',
				isCorrect: false,
			},
			{
				answer: 'By using the forEach() method to iterate over an array of data and returning JSX.',
				isCorrect: false,
			},
			{
				answer: 'By using the loop() method to iterate over an array of data and returning JSX.',
				isCorrect: false,
			},
		],
	},
	{
		id: 'q7',
		text: 'Which approach can NOT be used to render content conditionally?',
		answers: [
			{
				answer: 'Using a the #if template syntax.',
				isCorrect: true,
			},
			{
				answer: 'Using a ternary operator.',
				isCorrect: false,
			},
			{
				answer: 'Using the && operator.',
				isCorrect: false,
			},
			{
				answer: 'Using an if-else statement.',
				isCorrect: false,
			},
		],
	},
];

function shuffleArray<T>(arrayToShuffle: T[]): T[] {
	const shuffled = [...arrayToShuffle];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled;
}

const shuffledQuizData = quizData.map((question) => ({
	...question,
	answers: shuffleArray(question.answers),
}));

export default shuffledQuizData;
