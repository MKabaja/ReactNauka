import Button from './Button';
import Input from './Input';
export function NewProject() {
	return (
		<div className='bg-stone-50 '>
			<ul>
				<li>
					<Button
						variant='secondary'
						text='Zapisz'
					></Button>
				</li>

				<li>
					<Button
						variant='cancel'
						text='Anuluj'
						// onClick={dialogRef.current.close()}
					></Button>
				</li>
			</ul>
			<div>
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
			</div>
		</div>
	);
}
