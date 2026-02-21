import { useContext } from 'react';
import { initialState } from '../utils/NotificationStore.jsx';

export default function Navbar() {
	const { notifications } = useContext(initialState);

	return (
		<header id='header'>
			<h1>DevNotif</h1>
			<div>
				Powiadomienia{' '}
				<span id='notif-badge'>{notifications.length}</span>
			</div>
		</header>
	);
}
