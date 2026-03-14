import logo from '../assets/logo.jpg';

export default function Header() {
	return (
		<header id='main-header'>
			<div id='title'>
				<h1>Fajne Posiłki</h1>
				<img
					src={logo}
					alt='Talerz z sztućcami, oraz winem.'
				/>
			</div>
			<button className='text-button'>Koszyk(0)</button>
		</header>
	);
}
