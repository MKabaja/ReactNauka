interface ErrorCases {
	[key: string]: string;
}

export type ValidationRule = (value: string) => string | null;

const ERRORS: ErrorCases = {
	FIELD_IS_EMPTY: 'Field is empty',
	FIELD_IS_TOO_LONG: 'Field is too long',
	FIELD_IS_TOO_SHORT_3: 'Field must be at least 3 characters long',
	FIELD_IS_TOO_SHORT_5: 'Field must be at least 5 characters long',
	FIELD_IS_TOO_SHORT_10: 'Field must be at least 10 characters long',
	FIELD_CONTAINS_INVALID_CHARACTERS: 'Field contains invalid characters',
	FIELD_EMAIL: 'Field must be a valid email address',
};

export const isRequired: ValidationRule = (value) =>
	value ? null : ERRORS.FIELD_IS_EMPTY;

export const isEmail: ValidationRule = (value) =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : ERRORS.FIELD_EMAIL;

export const minLength =
	(min: number): ValidationRule =>
	(value) =>
		value.length >= min
			? null
			: ERRORS[`FIELD_IS_TOO_SHORT_${min}`] ||
				ERRORS.FIELD_IS_TOO_SHORT_3;

export const maxLength =
	(max: number): ValidationRule =>
	(value) =>
		value.length <= max
			? null
			: ERRORS[`FIELD_IS_TOO_LONG_${max}`] || ERRORS.FIELD_IS_TOO_LONG;

export const containsOnlyLetters: ValidationRule = (value) =>
	/^[A-Za-z]+$/.test(value) ? null : ERRORS.FIELD_CONTAINS_INVALID_CHARACTERS;
