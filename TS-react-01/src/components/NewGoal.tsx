import { type FormEvent, useRef } from 'react';

interface newGoalProps {
	onAddGoal: (goal: string, summary: string) => void;
}
export default function NewGoal({ onAddGoal }: newGoalProps) {
	const goal = useRef<HTMLInputElement>(null);
	const summary = useRef<HTMLInputElement>(null);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!goal.current || !summary.current) return;

		const enteredGoal = goal.current.value;
		const enteredSummary = summary.current.value;

		if (validate([enteredGoal, enteredSummary])) return;

		onAddGoal(enteredGoal, enteredSummary);

		e.currentTarget.reset();
	}

	return (
		<form onSubmit={handleSubmit}>
			<p>
				<label htmlFor='goal'>Twój Cel</label>
				<input
					id='goal'
					type='text'
					ref={goal}
				/>
			</p>
			<p>
				<label htmlFor='summary'>Krótki opis</label>
				<input
					id='summary'
					type='text'
					ref={summary}
				/>
			</p>
			<p>
				<button>Dodaj cel</button>
			</p>
		</form>
	);

	function validate(values: string[]): boolean {
		return values.some((value) => {
			const spamPattern = /([a-z])\1{4,}/i;
			if (value.trim() === '') return true;
			if (value.trim().length < 5) return true;
			if (value.trim().length > 100) return true;
			if (spamPattern.test(value.trim())) return true;
			return false;
		});
	}
}
