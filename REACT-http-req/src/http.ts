import { type Place } from './types/Places';

type AvailablePlacesResponse = {
	places: Place[];
};
type UpdateUserPlacesResponse = {
	method: string;
	headers: Record<string, string>;
	body: string;
};

export async function fetchAvailablePlaces(url: string): Promise<Place[]> {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const responseData = (await response.json()) as AvailablePlacesResponse;
	return responseData.places;
}

export async function updateUserPlaces(
	url: string,
	places: Place[],
): Promise<string> {
	// `Record<string, string>` oznacza obiekt/mapę, gdzie klucze są typu `string`
	// a wartości też są `string`. To wygodny sposób w TypeScript na opisanie
	// nagłówków HTTP, np. { 'Content-Type': 'application/json' }.

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};

	const response = await fetch(url, {
		method: 'PUT',
		headers,
		body: JSON.stringify({ places }),
	});

	if (!response.ok) {
		const errorText = await response.text();
		const errorMessage =
			errorText || response.statusText || 'Unknown error occurred';

		throw new Error(
			`HTTP error! status: ${response.status}, message: ${errorMessage}`,
		);
	}
	const responseData = (await response.json()) as { message: string };

	return responseData.message;
}
