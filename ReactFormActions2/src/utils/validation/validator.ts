import { ValidationRule } from './rules';

type Schema = Record<string, ValidationRule[]>;

export function validate(formData: FormData, schema: Schema) {
	const errors: Record<string, string> = {};
	const enteredValues: Record<string, string> = {};

	for (const field in schema) {
		const value = formData.get(field)?.toString() ?? '';
		enteredValues[field] = value;

		for (const rule of schema[field]) {
			const error = rule(value);
			if (error) {
				errors[field] = error;
				break; // Stop at the first error for this field
			}
		}
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors,
		enteredValues,
	};
}
