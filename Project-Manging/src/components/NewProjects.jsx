import Button from './Button.jsx';
import Input from './Input.jsx';
import { useRef } from 'react';
export function NewProject({ onCloseOverlay, onAdd }) {
	const titleRef = useRef();
	const descriptionRef = useRef();
	const dateRef = useRef();

	function handleSubmit() {
		const paybackTitile = titleRef.current.value;
		const paybackDescription = descriptionRef.current.value;
		const paybackDate = dateRef.current.value;

		if (paybackTitile.trim() === '') return;

		onAdd({
			title: paybackTitile,
			description: paybackDescription,
			date: paybackDate,
		});
	}
	return (
		<div className='bg-stone-50  w-2/3 px-4'>
			<ul className=' flex  gap-4 flex-row-reverse'>
				<li>
					<Button
						variant='secondary'
						text='Zapisz'
						onClick={handleSubmit}
					></Button>
				</li>

				<li>
					<Button
						variant='cancel'
						text='Anuluj'
						onClick={onCloseOverlay}
					></Button>
				</li>
			</ul>
			<div className=' flex flex-col space-y-2.5'>
				<Input
					label='Nazwa'
					type='text'
					required
					ref={titleRef}
				></Input>
				<Input
					label='opis'
					isTextArea={true}
					required
					ref={descriptionRef}
				></Input>
				<Input
					label='Data'
					type='date'
					required
					ref={dateRef}
				></Input>
			</div>
		</div>
	);
}
