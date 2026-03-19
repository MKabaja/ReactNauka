import { ReactNode } from 'react';

interface FieldProps {
	label: string;
	id: string;
	error?: string;
	children: ReactNode;
}
export default function Field({ label, id, error, children }: FieldProps) {
	return (
		<div className='control'>
			<label htmlFor={id}>{label}</label>
			{children}
			{error && (
				<span
					role='alert'
					className='error'
				>
					{error}
				</span>
			)}
		</div>
	);
}
