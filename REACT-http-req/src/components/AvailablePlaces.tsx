import Places from './Places.jsx';
import { useEffect, useState } from 'react';

type AvailablePlacesProps = {
	onSelectPlace: (placeId: string) => void;
};
const places = localStorage.getItem('places');

export default function AvailablePlaces({
	onSelectPlace,
}: AvailablePlacesProps) {
	const [availablePlaces, setAvailablePlaces] = useState(places);
	return (
		<Places
			title='Available Places'
			places={[]}
			fallbackText='No places available.'
			onSelectPlace={onSelectPlace}
		/>
	);
}
