import Button from './Button.jsx';

export default function Sidebar({ onAddProject }) {
	return (
		<aside className='p-8 flex bg-stone-900 flex-col rounded-tr-xl'>
			<h2 className=' font-bold text-white font-main text-2xl mb-4'>
				Twoje Projekty
			</h2>
			<Button
				text='+ Dodaj Projekt'
				onClick={onAddProject}
			></Button>
		</aside>
	);
}
