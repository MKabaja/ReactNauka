import { validate } from '../utils/validation/validator';
import {
	isRequired,
	minLength,
	maxLength,
	containsOnlyLetters,
} from '../utils/validation/rules';

type OpinionData = {
	userName: string;
	title: string;
	body: string;
};

type OpinionFormState = {
	errors: Record<string, string> | null;
	enteredValues?: OpinionData;
};

type OpinionAction = (
	prevState: OpinionFormState,
	formData: FormData,
) => OpinionFormState;

const opinionAction: OpinionAction = (prevState, formData) => {
	const Schema = {
		userName: [isRequired, minLength(3), containsOnlyLetters],
		title: [isRequired, minLength(5)],
		body: [isRequired, minLength(10), maxLength(500)],
	};

	const { isValid, errors, enteredValues } = validate(formData, Schema);

	if (!isValid) {
		return { errors };
	}

	// Here you would typically send the data to a server or update your state
	console.log('Opinion submitted:', enteredValues);

	return {
		errors: null,
		enteredValues: enteredValues as OpinionData,
	};
};

export default opinionAction;
