import Button from './Button';
import Input from './Input';
import { useRef, useState } from 'react';
export default function Project({
	projectData,
	onDeleteProject,
	onAddtask,
	onDeleteTask,
	tasks,
}) {
	const { title, description, date, id } = projectData;
	const listClasses =
		' flex justify-between items-center ransition-all cursor-pointer px-2 py-3 bg-stone-200';
	const inputRef = useRef();

	function handleAddtask() {
		onAddtask(inputRef.current.value);
		inputRef.current.value = '';
	}

	return (
		<section className='w-2/3 pr-12 '>
			<header className=' pt-10 flex justify-between items-center'>
				<h2 className='heading'>{title}</h2>
				<Button
					variant='cancel'
					text='Usuń Projekt'
					onClick={() => onDeleteProject(id)}
				/>
			</header>
			<main className='border-b border-stone-300  pb-10'>
				<div className='flex flex-col'>
					<p className=' text-xs text-stone-400'>{date}</p>
					<span className='mt-4 leading-relaxed font-main text-slate-900 text-sm'>
						{description}
					</span>
				</div>
			</main>
			<footer className='mt-8'>
				<h3 className='heading mb-4'>Tasks</h3>
				<div className='flex gap-4 items-center'>
					<Input ref={inputRef} />
					<Button
						variant='cancel'
						text='Dodaj zadanie'
						onClick={handleAddtask}
					/>
				</div>
				{tasks.length === 0 ? (
					<div className='mt-4'>
						<p className='text-sm'>
							Ten Projekt nie ma żadnych zadań.
						</p>
					</div>
				) : (
					<div>
						<ul className=' flex flex-col space-y-4'>
							{tasks.map((task, index) => (
								<li
									key={index}
									id={task.id}
									className={listClasses}
								>
									<p>{task.text}</p>
									<button
										onClick={() => onDeleteTask(task.id)}
										className='text-stone-500 cursor-pointer hover:text-stone-950'
									>
										Wyczyść
									</button>
								</li>
							))}
						</ul>
					</div>
				)}
			</footer>
		</section>
	);
}
