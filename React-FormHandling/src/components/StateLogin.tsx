import {
	type FormEvent,
	type ChangeEvent,
	type FocusEvent,
	useState,
} from 'react';
import Input from './Input';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation';
import { useInput } from '../hooks/useInput';

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
	const {
		value: emailValue,
		handleChange: handleEmailChange,
		handleBlur: handleEmailBlur,
		hasError: emailHasError,
	} = useInput(
		'',
		// Przekazujemy tu funkcję (closure), która „zamyka” w sobie logikę walidacji:
		// przy każdym wywołaniu hooka dostaje aktualną wartość `value`,
		// ale sama funkcja pamięta, że ma użyć konkretnych reguł (`isEmail`, `isNotEmpty`).
		(value) => isEmail(value) && isNotEmpty(value),
	);

	const {
		value: passwordValue,
		handleChange: handlePasswordChange,
		handleBlur: handlePasswordBlur,
		hasError: passwordHasError,
	} = useInput('', (value) => hasMinLength(value, 6));

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>State Login</h2>

			<div className='control-row'>
				<Input
					label='Email'
					id='email'
					type='email'
					name='email'
					onBlur={handleEmailBlur}
					onChange={handleEmailChange}
					value={emailValue}
					error={emailHasError ? 'Nieprawidłowy email' : undefined}
				></Input>
				<Input
					label='Password'
					id='password'
					type='password'
					name='password'
					onBlur={handlePasswordBlur}
					onChange={handlePasswordChange}
					value={passwordValue}
					error={passwordHasError ? 'Nieprawidłowe hasło' : undefined}
				></Input>
			</div>

			<p className='form-actions'>
				<button className='button button-flat'>Reset</button>
				<button className='button'>Login</button>
			</p>
		</form>
	);
}
