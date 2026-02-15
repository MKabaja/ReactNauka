import Input from './Input.jsx';
import Button from './Button.jsx';
import { forwardRef, useImperativeHandle, useRef } from 'react';
const Modal = forwardRef(function Modal({ ...props }, ref) {
	const dialogRef = useRef();
	useImperativeHandle(ref, () => {
		return {
			open() {
				dialogRef.current.showModal();
			},
			hide() {
				dialogRef.current.close();
			},
		};
	});

	return (
		<dialog
			ref={dialogRef}
			className='bg-stone-50 '
		>
			<form
				action=''
				className='bg-stone-50 flex flex-col'
			>
				<div>
					<Button
						variant='secondary'
						text='Zapisz'
					></Button>
					<Button
						variant='cancel'
						text='Anuluj'
						// onClick={dialogRef.current.close()}
					></Button>
				</div>
				<Input
					label='Nazwa'
					type='text'
					required
				></Input>
				<Input
					label='opis'
					isTextArea={true}
					required
				></Input>
				<Input
					label='Data'
					type='date'
					required
				></Input>
			</form>
		</dialog>
	);
});
export default Modal;
