import { type FormEvent, type ChangeEvent, useRef, useState } from 'react';
type Values = {
	email: string;
	password: string;
};

// W tym komponencie validacja adresu e-mail realizowana jest za pomocą referencji (useRef), a nie stanu.
// Przy wysyłaniu formularza pobierane są wartości z pól (email oraz password) przez referencje do inputów.
// Następnie sprawdzane jest, czy email zawiera znak '@'. Jeśli nie, ustawiany jest stan emailIsInvalid na true i wyświetlany jest komunikat o błędzie.
// Dzięki użyciu ref nie śledzimy każdej zmiany w polu tekstowym, tylko odczytujemy jego wartość w momencie submit formularza.

export default function Login() {
	const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>(false);

	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const enteredEmail = email.current?.value;
		const enteredPassword = password.current?.value;

		const emailIsValid = enteredEmail?.includes('@');

		if (!emailIsValid) {
			setEmailIsInvalid(true);
			return;
		}

		setEmailIsInvalid(false);

		console.log(`dane: ${enteredEmail},${enteredPassword}`);
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>

			<div className='control-row'>
				<div className='control no-margin'>
					<label htmlFor='email'>Email</label>
					<input
						id='email'
						type='email'
						name='email'
						ref={email}
					/>
					<div className='control-error'>
						{emailIsInvalid && <p>Żle!</p>}
					</div>
				</div>

				<div className='control no-margin'>
					<label htmlFor='password'>Password</label>
					<input
						id='password'
						type='password'
						name='password'
						ref={password}
					/>
				</div>
			</div>

			<p className='form-actions'>
				<button className='button button-flat'>Reset</button>
				<button className='button'>Login</button>
			</p>
		</form>
	);
}
