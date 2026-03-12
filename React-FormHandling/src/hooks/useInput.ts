import { useState, type FocusEvent, type ChangeEvent } from 'react';
interface UseInputResult {
	value: string;
	handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	hasError: boolean;
}
type ValidationFn = (value: string) => boolean;

// Ten custom hook kapsułkuje logikę pojedynczego pola formularza:
// przechowuje jego aktualną wartość, śledzi czy użytkownik „opuścił” pole (blur),
// wywołuje przekazaną funkcję walidującą i zwraca flagę błędu `hasError`,
// którą można wykorzystać do warunkowego wyświetlania komunikatów o błędzie dopiero po blur.

export function useInput(
	defaultValue: string,
	validate: ValidationFn,
): UseInputResult {
	const [enteredValue, setEnteredValue] = useState<string>(defaultValue);
	const [blurEdit, setBlurEdit] = useState<boolean>(false);

	const valueIsValid = validate(enteredValue);

	function handleBlur(e: FocusEvent<HTMLInputElement>) {
		setBlurEdit(true);
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setEnteredValue(e.target.value);
		setBlurEdit(false);
	}
	return {
		value: enteredValue,
		handleBlur,
		handleChange,
		hasError: blurEdit && !valueIsValid,
	};
}
