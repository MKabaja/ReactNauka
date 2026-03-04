import logo from '../assets/quiz-logo.png';

function Header() {
	return (
		<header>
			<img
				src={logo}
				alt='Kartki papieru z Tabelą do Quizu'
			/>
			<h1>Quiz z Reacta!</h1>
		</header>
	);
}

export default Header;
