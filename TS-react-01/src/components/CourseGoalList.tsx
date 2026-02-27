import { ReactNode } from 'react';
import { type CourseGoalType } from '../App.tsx';
import CourseGoal from './CourseGoal.tsx';

interface CourseGoalListProps {
	goals: CourseGoalType[];
	children?: ReactNode;
	onDeleteGoal: (id: number) => void;
}

export default function CourseGoalList({
	goals,
	onDeleteGoal,
}: CourseGoalListProps) {
	return (
		<ul>
			{goals.map((goal) => (
				<li key={goal.id}>
					<CourseGoal
						title={goal.title}
						onDelete={onDeleteGoal}
						id={goal.id}
					>
						<p>{goal.description}</p>
					</CourseGoal>
				</li>
			))}
		</ul>
	);
}
