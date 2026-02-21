import { useContext } from 'react';
import { initialState } from '../utils/NotificationStore.jsx';

export default function NotificationList() {
	const { notifications, removeNotification } = useContext(initialState);
	// Tutaj docelowo będzie .map()
	return (
		<ul id='notif-list'>
			{notifications.map((n) => {
				return (
					<li key={n.id}>
						<span>{n.text}</span>
						<button
							onClick={() => removeNotification(n.id)}
							className='delete-btn'
						>
							Usuń
						</button>
					</li>
				);
			})}
		</ul>
	);
}
