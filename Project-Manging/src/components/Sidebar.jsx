import Button from './Button.jsx';

export default function Sidebar({
	onOpenOverlay,
	projectList,
	onSelectProject,
}) {
	const listClasses =
		'transition-all cursor-pointer px-2 py-1  text-stone-200 border-l-4 border-transparent hover:border-stone-300';
	return (
		<aside className='p-8 flex bg-stone-900 flex-col rounded-tr-xl w-1/3'>
			<h2 className=' font-bold text-white font-main text-2xl mb-4'>
				Twoje Projekty
			</h2>
			<Button
				text='+ Dodaj Projekt'
				onClick={onOpenOverlay}
			></Button>
			<ul className=' flex flex-col justify-center  space-y-3 mt-12'>
				{projectList.map((project) => (
					<li key={project.id}>
						<button
							className={listClasses}
							onClick={() => onSelectProject(project.id)}
						>
							{project.title}
						</button>
					</li>
				))}
			</ul>
		</aside>
	);
}
