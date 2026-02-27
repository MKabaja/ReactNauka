import { type ReactNode } from 'react';
import { type CourseGoalType } from '../App.tsx';
import CourseGoal from './CourseGoal.tsx';
import InfoBox from './InfoBox.tsx';

interface CourseGoalListProps {
	goals: CourseGoalType[];

	onDeleteGoal: (id: number) => void;
}

export default function CourseGoalList({
	goals,
	onDeleteGoal,
}: CourseGoalListProps) {
	if (goals.length === 0) {
		return (
			<InfoBox mode='hint'>
				Nie masz jeszcze żadnych celów. Dodaj jakieś!
			</InfoBox>
		);
	}
	let warningBox: ReactNode;

	if (goals.length >= 4) {
		warningBox = (
			<InfoBox
				mode='warning'
				severity='medium'
			>
				Nazbierałeś za dużo celów!
			</InfoBox>
		);
	}

	return (
		<>
			{warningBox}
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
		</>
	);
}
