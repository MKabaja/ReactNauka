import Button from './UI/Button.tsx';
import { useTimersContext } from '../timers-contex.tsx';

export default function Header() {
	const { isRuning } = useTimersContext();

	return (
		<header>
			<h1>ReactTimer</h1>

			<Button>{isRuning ? 'Stop' : 'Start'} Timers</Button>
		</header>
	);
}
