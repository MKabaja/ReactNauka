import { type SubmitEvent, type ReactNode } from 'react';
import Spinner from './Spinner';
interface FormProps {
	onCancel: () => void;
	submitLabel?: string;
	cancelLabel?: string;
	isLoading?: boolean;
	children: ReactNode;
	action: (formData: FormData) => void | Promise<void>;
}
export default function Form({
	onCancel,
	submitLabel,
	cancelLabel,
	isLoading,
	children,
	action,
}: FormProps) {
	return (
		<form action={action}>
			{children}
			<div className='modal-actions'>
				<button
					type='submit'
					disabled={isLoading}
					className='button'
				>
					{isLoading ? <Spinner /> : submitLabel}
				</button>
				<button
					type='button'
					onClick={onCancel}
					disabled={isLoading}
					className='button text-button'
				>
					{cancelLabel}
				</button>
			</div>
		</form>
	);
}
