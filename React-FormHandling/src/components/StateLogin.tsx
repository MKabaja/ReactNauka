import {
	type FormEvent,
	type ChangeEvent,
	type FocusEvent,
	useState,
} from 'react';
type Values = {
	email: string;
	password: string;
};
type BlurValues = {
	email: boolean;
	password: boolean;
};
// Obsługa zdarzenia blur:
// Zdarzenie "blur" występuje, gdy element formularza (np. pole input) traci fokus, czyli użytkownik przestaje w nim pisać i przechodzi do innego elementu.
// Wykorzystujemy to zdarzenie, aby na przykład sprawdzać poprawność danych (walidację) dopiero po tym, jak użytkownik zakończy wypełnianie danego pola, a nie w trakcie wpisywania.
// Dzięki temu użytkownik nie jest rozpraszany komunikatami o błędzie podczas pisania, tylko widzi je dopiero po "wyjściu" z pola.
// Jest to popularna praktyka, bo poprawia doświadczenie użytkownika (UX) w formularzach.

export default function StateLogin() {
	// const [enteredEmail, setEnteredEmail] = useState<string>('');
	// const [enteredPassword, setEnteredPassword] = useState<string>('');

	const [enteredValues, setEnteredValues] = useState<Values>({
		email: '',
		password: '',
	});
	const [blurEdit, setBlurEdit] = useState<BlurValues>({
		email: false,
		password: false,
	});

	const emailIsInvalid = blurEdit.email && !enteredValues.email.includes('@');

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log('Wysłano:', enteredValues);
	}
	function handleBlur(e: FocusEvent<HTMLInputElement>) {
		const { name } = e.target;
		setBlurEdit((prevEdit) => ({
			...prevEdit,
			[name]: true,
		}));
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		// Uwaga: używamy nawiasów okrągłych () wokół nawiasów klamrowych {}
		// podczas zwracania obiektu w funkcji strzałkowej, aby JS nie myślał, że to blok kodu
		setEnteredValues((prev) => ({
			...prev,
			[name]: value,
		}));
		setBlurEdit((prevEdit) => ({
			...prevEdit,
			[name]: false,
		}));
	}

	// function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
	// 	setEnteredEmail(e.target.value);
	// }

	// function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
	// 	setEnteredPassword(e.target.value);
	// }

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
						onBlur={handleBlur}
						onChange={handleChange}
						value={enteredValues.email}
					/>
					<div className='control-error'>
						{emailIsInvalid && <p>Sprawdz Poprawność e maila!</p>}
					</div>
				</div>

				<div className='control no-margin'>
					<label htmlFor='password'>Password</label>
					<input
						id='password'
						type='password'
						name='password'
						onChange={handleChange}
						value={enteredValues.password}
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
