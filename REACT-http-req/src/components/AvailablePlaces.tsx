import Places from './Places.jsx';
import { useEffect, useState } from 'react';

type AvailablePlacesProps = {
	onSelectPlace: (place: Place) => void;
};
export type Place = {
	id: string;
	title: string;
	image: {
		src: string;
		alt: string;
	};
	lat: number;
	lon: number;
};
type AvailablePlacesState = Place[] | null[];
type AvailablePlacesResponse = {
	places: Place[];
};

export default function AvailablePlaces({
	onSelectPlace,
}: AvailablePlacesProps) {
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [availablePlaces, setAvailablePlaces] =
		useState<AvailablePlacesState>([]);

	useEffect(() => {
		async function fetchPlaces(url: string) {
			setIsFetching(true);
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const responseData: AvailablePlacesResponse = await response.json();
			setAvailablePlaces(responseData.places);
			setIsFetching(false);
		}
		fetchPlaces('http://localhost:3000/places');
	}, []);

	return (
		<Places
			title='Available Places'
			places={availablePlaces}
			loadingText='Loading places...'
			isLoading={isFetching}
			fallbackText='No places available.'
			onSelectPlace={onSelectPlace}
		/>
	);
}
