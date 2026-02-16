import Button from './Button.jsx';

export default function Sidebar({ onOpenOverlay, projectList }) {
	const listClasses = 'bg-neutral-600 px-2 py-1 rounded';
	return (
		<aside className='p-8 flex bg-stone-900 flex-col rounded-tr-xl w-1/3'>
			<h2 className=' font-bold text-white font-main text-2xl mb-4'>
				Twoje Projekty
			</h2>
			<Button
				text='+ Dodaj Projekt'
				onClick={onOpenOverlay}
			></Button>
			<ul className=' flex flex-col justify-center  space-y-3 mt-3'>
				{projectList.map((project) => (
					<li
						key={project.id}
						className={listClasses}
					>
						{project.title}
					</li>
				))}
			</ul>
		</aside>
	);
}
