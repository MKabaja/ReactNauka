import Navbar from './components/Navbar';
import Controls from './components/Controls';
import NotificationList from './components/NotificationList';
import NotificationProvider from './utils/NotificationStore.jsx';

export default function App() {
	return (
		<NotificationProvider>
			<Navbar />
			<main>
				<Controls />
				<NotificationList />
			</main>
		</NotificationProvider>
	);
}
