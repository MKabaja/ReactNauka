import { type PropsWithChildren } from 'react';

// interface CourseGoalProps {
// 	title: string;
// 	children: ReactNode;
// }

interface CourseGoalProps extends PropsWithChildren {
	id: number;
	title: string;
	onDelete: (id: number) => void;
}

export default function CourseGoal({
	title,
	onDelete,
	children,
	id,
}: CourseGoalProps) {
	return (
		<article>
			<div>
				<h2> {title}</h2>
				{children}
			</div>
			<button onClick={() => onDelete(id)}>Usuń</button>
		</article>
	);
}
