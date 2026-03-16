import { validate } from '../utils/validation/validator';
import {
	isRequired,
	minLength,
	maxLength,
	containsOnlyLetters,
} from '../utils/validation/rules';
import { OpinionDTO, postOpinion } from '../http/http';

type OpinionData = {
	userName: string;
	title: string;
	body: string;
};

type OpinionFormState = {
	errors: Record<string, string> | null;
	enteredValues?: OpinionData;
	success?: boolean;
};

type OpinionAction = (
	prevState: OpinionFormState,
	formData: FormData,
) => Promise<OpinionFormState>;

const opinionAction: OpinionAction = async (prevState, formData) => {
	const Schema = {
		userName: [isRequired, minLength(3), containsOnlyLetters],
		title: [isRequired, minLength(5)],
		body: [isRequired, minLength(10), maxLength(500)],
	};

	const { isValid, errors, enteredValues } = validate(formData, Schema);

	if (!isValid) {
		return { errors };
	}
	try {
		await postOpinion(enteredValues as OpinionDTO);
		return {
			errors: null,
			enteredValues: enteredValues as OpinionData,
			success: true,
		};
	} catch (error) {
		console.error('Error submitting opinion:', error);
		return {
			errors: {
				server:
					error instanceof Error
						? error.message
						: 'An unexpected error occurred while submitting your opinion.',
			},
			enteredValues: enteredValues as OpinionData,
			success: false,
		};
	}
};

export default opinionAction;
