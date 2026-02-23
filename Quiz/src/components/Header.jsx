import logo from '../assets/quiz-logo.png';
export default function Header() {
	return (
		<header>
			<img
				src={logo}
				alt='Quiz label on paper sheets'
			/>
			<h1>reactquiz</h1>
		</header>
	);
}
