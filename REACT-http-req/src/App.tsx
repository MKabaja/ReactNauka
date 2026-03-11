import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces, { type ErrorState } from './components/AvailablePlaces';
import { type Place } from './types/Places';
import { updateUserPlaces, fetchAvailablePlaces } from './http.js';
import Issue from './components/Error.js';
import { useFetch } from './hooks/useFetch.js';

const URL: string = 'http://localhost:3000/user-places';

type ErrorUpdatingState =
	| {
			message: string;
	  }
	| string;

function App() {
	const selectedPlace = useRef<Place | null>(null);

	const [errorUpdating, setErrorUpdating] =
		useState<ErrorUpdatingState | null>(null);

	const [modalIsOpen, setModalIsOpen] = useState(false);

	const {
		isFetching,
		fetchedData: userPlaces,
		error,
	} = useFetch(URL, 'Error fetching user places', fetchAvailablePlaces);

	function handleStartRemovePlace(place: Place) {
		setModalIsOpen(true);
		selectedPlace.current = place;
	}

	function handleStopRemovePlace() {
		setModalIsOpen(false);
	}
	// optimistic update, czyli aktualizacja UI przed potwierdzeniem z serwera,
	// co poprawia UX, ale wymaga obsługi błędów,
	// aby przywrócić poprzedni stan w razie niepowodzenia.
	async function handleSelectPlace(selectedPlace: Place) {
		setUserPlaces((prevPickedPlaces) => {
			if (!prevPickedPlaces) {
				prevPickedPlaces = [];
			}
			if (
				prevPickedPlaces.some((place) => place?.id === selectedPlace.id)
			) {
				return prevPickedPlaces;
			}
			return [selectedPlace, ...prevPickedPlaces];
		});

		try {
			await updateUserPlaces(URL, [selectedPlace, ...userPlaces]);
		} catch (error) {
			setUserPlaces(userPlaces);

			if (error instanceof Error) {
				setErrorUpdating({
					message: error.message || 'Unknown error occurred',
				});
			}
		}
	}

	const handleRemovePlace = useCallback(
		async function handleRemovePlace() {
			setUserPlaces((prevPickedPlaces) =>
				prevPickedPlaces.filter(
					(place) => place?.id !== selectedPlace.current?.id,
				),
			);

			try {
				await updateUserPlaces(
					URL,
					userPlaces.filter(
						(place) => place?.id !== selectedPlace.current?.id,
					),
				);
			} catch (error) {
				setUserPlaces(userPlaces);

				if (error instanceof Error) {
					setErrorUpdating({
						message: error.message || 'Unknown error occurred',
					});
				}
			}
			setModalIsOpen(false);
		},
		[userPlaces],
	);

	function handleError() {
		setErrorUpdating(null);
	}

	return (
		<>
			<Modal
				open={errorUpdating}
				onClose={handleError}
			>
				{errorUpdating && (
					<Issue
						title='An error occured'
						message={
							typeof errorUpdating === 'string'
								? errorUpdating
								: errorUpdating?.message
						}
						onConfirm={handleError}
					/>
				)}
			</Modal>

			<Modal
				open={modalIsOpen}
				onClose={handleStopRemovePlace}
			>
				<DeleteConfirmation
					onCancel={handleStopRemovePlace}
					onConfirm={handleRemovePlace}
				/>
			</Modal>

			<header>
				<img
					src={logoImg}
					alt='Stylized globe'
				/>
				<h1>PlacePicker</h1>
				<p>
					Create your personal collection of places you would like to
					visit or you have visited.
				</p>
			</header>
			<main>
				{error && (
					<Issue
						title='Error'
						message={error.message}
					/>
				)}
				<Places
					title="I'd like to visit ..."
					fallbackText='Select the places you would like to visit below.'
					places={userPlaces}
					isLoading={isFetching}
					loadingText='Fetching your places...'
					onSelectPlace={handleStartRemovePlace}
				/>

				<AvailablePlaces onSelectPlace={handleSelectPlace} />
			</main>
		</>
	);
}

export default App;
