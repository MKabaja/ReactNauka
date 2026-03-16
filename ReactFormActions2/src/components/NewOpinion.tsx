import { useActionState } from 'react';
import opinionAction from '../actions/opinionActions';
import { useFetch } from '../hooks/UseFetch';
import { postOpinion } from '../http/http';
import { OpinionDTO } from '../http/http';

export function NewOpinion() {
	const [formState, formAction] = useActionState(opinionAction, {
		errors: null,
	});

	return (
		<div id='new-opinion'>
			<h2>Share your opinion!</h2>
			<form action={formAction}>
				<div className='control-row'>
					<p className='control'>
						<label htmlFor='userName'>Your Name</label>
						<input
							type='text'
							id='userName'
							name='userName'
							defaultValue={formState.enteredValues?.userName}
						/>
					</p>

					<p className='control'>
						<label htmlFor='title'>Title</label>
						<input
							type='text'
							id='title'
							name='title'
							defaultValue={formState.enteredValues?.title}
						/>
					</p>
				</div>
				<p className='control'>
					<label htmlFor='body'>Your Opinion</label>
					<textarea
						id='body'
						name='body'
						rows={5}
						defaultValue={formState.enteredValues?.body}
					></textarea>
				</p>

				{formState.errors && (
					<div className='errors'>
						<h3>Errors:</h3>
						<ul>
							{Object.entries(formState.errors).map(
								([field, error]) => (
									<li key={field}>
										<strong>{field}:</strong> {error}
									</li>
								),
							)}
						</ul>
					</div>
				)}

				<p className='actions'>
					<button type='submit'>Submit</button>
				</p>
			</form>
		</div>
	);
}
