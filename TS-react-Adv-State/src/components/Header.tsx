import Button from './UI/Button.tsx';
import { useTimersContext } from '../store/timers-contex.tsx';

export default function Header() {
	const { isRuning, startTimers, stopTimers } = useTimersContext();

	return (
		<header>
			<h1>ReactTimer</h1>

			<Button onClick={isRuning ? stopTimers : startTimers}>
				{isRuning ? 'Stop' : 'Start'} Timers
			</Button>
		</header>
	);
}
