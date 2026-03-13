import { useActionState } from 'react';
import {
	hasMinLength,
	isEmail,
	isEqualToOtherValue,
	isNotEmpty,
} from '../util/validation';

type AcquisitionMethod = ('google' | 'friend' | 'other')[];

type SignupFormState = {
	errors: string[] | null;
	enteredValues?: {
		email: string;
		password: string;
		confirmPassword: string;
		firstName: string;
		lastName: string;
		role: string;
		acquisition: AcquisitionMethod;
		terms: boolean;
	};
};
type SignupActionFn = (
	prevState: SignupFormState,
	formData: FormData,
) => SignupFormState;

export default function Signup() {
	const signupAction: SignupActionFn = (prevState, formData) => {
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirm-password') as string;
		const firstName = formData.get('first-name') as string;
		const lastName = formData.get('last-name') as string;
		const role = formData.get('role') as string;
		const acquisition = formData.getAll('acquisition') as AcquisitionMethod;
		const terms = formData.get('terms') === 'on' ? true : false;

		let errors: string[] = [];

		if (!isEmail(email)) {
			errors.push('Email must be valid!');
		}
		if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
			errors.push('Password must be at least 6 characters long!');
		}
		if (!isEqualToOtherValue(password, confirmPassword)) {
			errors.push('Passwords must match!');
		}
		if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
			errors.push('First and last names must be provided!');
		}
		if (!isNotEmpty(role)) {
			errors.push('Role must be selected!');
		}
		if (!terms) {
			errors.push('You must agree to the terms and conditions!');
		}
		if (acquisition.length === 0) {
			errors.push('Please let us know how did you find us!');
		}
		if (errors.length > 0) {
			return {
				errors,
				enteredValues: {
					email,
					password,
					confirmPassword,
					firstName,
					lastName,
					role,
					acquisition,
					terms,
				},
			};
		}
		return { errors: null };
	};
	const [formState, formAction] = useActionState(signupAction, {
		errors: null,
	});

	return (
		<form action={formAction}>
			<h2>Welcome on board!</h2>
			<p>
				We just need a little bit of data from you to get you started 🚀
			</p>

			<div className='control'>
				<label htmlFor='email'>Email</label>
				<input
					id='email'
					type='email'
					name='email'
					defaultValue={formState.enteredValues?.email || ''}
				/>
			</div>

			<div className='control-row'>
				<div className='control'>
					<label htmlFor='password'>Password</label>
					<input
						id='password'
						type='password'
						name='password'
						defaultValue={formState.enteredValues?.password || ''}
					/>
				</div>

				<div className='control'>
					<label htmlFor='confirm-password'>Confirm Password</label>
					<input
						id='confirm-password'
						type='password'
						name='confirm-password'
						defaultValue={
							formState.enteredValues?.confirmPassword || ''
						}
					/>
				</div>
			</div>

			<hr />

			<div className='control-row'>
				<div className='control'>
					<label htmlFor='first-name'>First Name</label>
					<input
						type='text'
						id='first-name'
						name='first-name'
					/>
				</div>

				<div className='control'>
					<label htmlFor='last-name'>Last Name</label>
					<input
						type='text'
						id='last-name'
						name='last-name'
					/>
				</div>
			</div>

			<div className='control'>
				<label htmlFor='phone'>What best describes your role?</label>
				<select
					id='role'
					name='role'
				>
					<option value='student'>Student</option>
					<option value='teacher'>Teacher</option>
					<option value='employee'>Employee</option>
					<option value='founder'>Founder</option>
					<option value='other'>Other</option>
				</select>
			</div>

			<fieldset>
				<legend>How did you find us?</legend>
				<div className='control'>
					<input
						type='checkbox'
						id='google'
						name='acquisition'
						value='google'
						defaultChecked={
							formState.enteredValues?.acquisition.includes(
								'google',
							) || false
						}
					/>
					<label htmlFor='google'>Google</label>
				</div>

				<div className='control'>
					<input
						type='checkbox'
						id='friend'
						name='acquisition'
						value='friend'
						defaultChecked={
							formState.enteredValues?.acquisition.includes(
								'friend',
							) || false
						}
					/>
					<label htmlFor='friend'>Referred by friend</label>
				</div>

				<div className='control'>
					<input
						type='checkbox'
						id='other'
						name='acquisition'
						value='other'
						defaultChecked={
							formState.enteredValues?.acquisition.includes(
								'other',
							) || false
						}
					/>
					<label htmlFor='other'>Other</label>
				</div>
			</fieldset>

			<div className='control'>
				<label htmlFor='terms-and-conditions'>
					<input
						type='checkbox'
						id='terms-and-conditions'
						name='terms'
						defaultChecked={formState.enteredValues?.terms || false}
					/>
					I agree to the terms and conditions
				</label>
			</div>

			{formState.errors && (
				<ul className='errors'>
					{formState.errors.map((error) => (
						<li key={error}>{error}</li>
					))}
				</ul>
			)}

			<p className='form-actions'>
				<button
					type='reset'
					className='button button-flat'
				>
					Reset
				</button>
				<button className='button'>Sign up</button>
			</p>
		</form>
	);
}
