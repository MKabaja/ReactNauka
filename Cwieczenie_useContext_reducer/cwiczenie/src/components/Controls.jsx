import { useContext } from 'react';
import { initialState } from '../utils/NotificationStore.jsx';
export default function Controls() {
	const { notifications, addNotification, clear } = useContext(initialState);

	const notificationMessages = [
		'Twoja wiadomość została wysłana pomyślnie!',
		'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.',
		'Produkt został dodany do koszyka.',
		'Zmiany zostały zapisane.',
		'Twoja sesja wygaśnie za 5 minut.',
		'Nowa aktualizacja jest dostępna do pobrania.',
		'Hasło zostało zmienione poprawnie.',
		'Nie udało się połączyć z serwerem.',
	];

	return (
		<section id='controls'>
			<button
				onClick={() =>
					addNotification(getRandomMessage(notificationMessages))
				}
			>
				Symuluj Alert
			</button>
			<button
				onClick={clear}
				disabled={!notifications.length}
				style={{ backgroundColor: '#e67e22' }}
			>
				Wyczyść wszystko
			</button>
		</section>
	);

	function getRandomMessage(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}
}
