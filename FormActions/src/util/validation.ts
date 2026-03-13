export type Validator = (value: string) => boolean;
export type MinLengthValidator = (value: string, minLength: number) => boolean;
export type EqualValidator = (value: string, otherValue: string) => boolean;

export const isEmail: Validator = (value: string): boolean => {
	return value.includes('@');
};

export const isNotEmpty: Validator = (value: string): boolean => {
	return value.trim() !== '';
};

export const hasMinLength: MinLengthValidator = (
	value: string,
	minLength: number,
): boolean => {
	return value.length >= minLength;
};

export const isEqualToOtherValue: EqualValidator = (
	value: string,
	otherValue: string,
): boolean => {
	return value === otherValue;
};
