import CourseGoalList from './components/CourseGoalList.tsx';
import Header from './components/Header.tsx';
import GoalsImg from './assets/goals.jpg';
import { useState } from 'react';
import NewGoal from './components/NewGoal.tsx';

export type CourseGoalType = {
	title: string;
	description: string;
	id: number;
};

export default function App() {
	const [goals, setGoals] = useState<CourseGoalType[]>([]);

	function handleAddGoal(goal: string, summary: string) {
		setGoals((prevGoals) => {
			const newGoal: CourseGoalType = {
				id: Math.random(),
				title: goal,
				description: summary,
			};
			return [...prevGoals, newGoal];
		});
	}

	function handleDeleteGoal(id: number) {
		setGoals((prevGoals) => {
			return prevGoals.filter((goal) => goal.id !== id);
		});
	}

	return (
		<main>
			<Header
				image={{
					src: GoalsImg,
					alt: 'sheet of paper with goals as checkbox',
				}}
			>
				<h1>Moje Cele z Kursu!</h1>
			</Header>
			<NewGoal onAddGoal={handleAddGoal} />
			<CourseGoalList
				goals={goals}
				onDeleteGoal={handleDeleteGoal}
			/>
		</main>
	);
}
