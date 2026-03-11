import Places from './Places';
import { useEffect, useState } from 'react';
import Issue from './Error';
import { sortPlacesByDistance } from '../loc';
import { fetchAvailablePlaces } from '../http';
import { type Place } from '../types/Places';

type AvailablePlacesProps = {
	onSelectPlace: (place: Place) => void;
};

type AvailablePlacesState = (Place | null)[];

export type ErrorState = {
	message: string;
};

export default function AvailablePlaces({
	onSelectPlace,
}: AvailablePlacesProps) {
	//Gdy Obslugujemy Data fetching,
	// Dobrą praktyka jest posiadanie trzech stanów:

	//  isFetching,
	const [isFetching, setIsFetching] = useState<boolean>(false);
	//data,
	const [availablePlaces, setAvailablePlaces] =
		useState<AvailablePlacesState>([]);
	//oraz error,
	const [error, setError] = useState<ErrorState | null>(null);

	useEffect(() => {
		async function fetchPlaces(url: string) {
			setIsFetching(true);
			try {
				const places = await fetchAvailablePlaces(url);

				navigator.geolocation.getCurrentPosition((p) => {
					const sortedPlaces: AvailablePlacesState =
						sortPlacesByDistance(
							places,
							p.coords.latitude,
							p.coords.longitude,
						);
					setAvailablePlaces(sortedPlaces);
				});
			} catch (error: unknown) {
				if (error instanceof Error) {
					setError({
						message: error.message || 'Unknown error occurred',
					});
					console.error('Error fetching places:', error);
				}
			} finally {
				setIsFetching(false);
			}
		}
		fetchPlaces('http://localhost:3000/places');
	}, []);
	// Dzięki temu możemy odpowiednio zarządzać różnymi etapami procesu
	// pobierania danych i zapewnić lepsze doświadczenie użytkownika.

	if (error) {
		return (
			<Issue
				title='Error Fetching Places'
				message={error.message}
			/>
		);
	}
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
