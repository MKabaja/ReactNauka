type Opinion = {
	id: number;
	userName: string;
	title: string;
	body: string;
	votes?: number;
};
export type OpinionDTO = Omit<Opinion, 'id' | 'votes'>;

async function fetchData<T>(
	endpoint: string,
	config?: RequestInit,
): Promise<T> {
	const response = await fetch(endpoint, {
		headers: {
			'Content-Type': 'application/json',
		},
		...config,
	});
	if (!response.ok) {
		const error = await response.json();
		throw new Error(
			error.message || 'An error occurred while fetching data.',
		);
	}
	return response.json();
}

export const getOpinions = () =>
	fetchData<Opinion[]>('http://localhost:3000/opinions');

export const postOpinion = (opinion: OpinionDTO) =>
	fetchData<Opinion>('http://localhost:3000/opinions', {
		method: 'POST',
		body: JSON.stringify(opinion),
	});
