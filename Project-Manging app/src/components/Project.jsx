import img from '../assets/no-projects.png';
import Button from './Button.jsx';
export default function Project() {
	return (
		<section className=' flex flex-col mx-auto justify-center items-center space-y-4'>
			<img
				className=' h-20 w-20'
				src={img}
				alt='Tablica na dokumenty, razem z piórem'
			/>
			<h2 className=' font-bold font-main text-stone-800 text-xl'>
				Brak Wybranych Projektów
			</h2>
			<p className=' font-main text-stone-500'>
				Wybierz projekt, lub dodaj nowy.
			</p>
			<Button
				text='Stwórz nowy Projekt'
				variant='secondary'
			></Button>
		</section>
	);
}
