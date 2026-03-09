import { type Place } from './types/Places';

type AvailablePlacesResponse = {
	places: Place[];
};

export async function fetchAvailablePlaces(url: string): Promise<Place[]> {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const responseData = (await response.json()) as AvailablePlacesResponse;
	return responseData.places;
}
