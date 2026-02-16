import { NewProject } from './components/NewProjects';
import NoSelected from './components/NoSelected';
import Sidebar from './components/Sidebar';

import { useRef, useState } from 'react';

function App() {
	const [toggled, setToggled] = useState(false);
	const [projectList, setProjectList] = useState([]);

	function handleAddProject(projectData) {
		setProjectList((prev) => {
			const newProject = {
				...projectData,
				id: Math.random().toString(),
			};
			return [...prev, newProject];
		});
	}

	return (
		<>
			<main className='flex pt-6 h-screen my-8 gap-8 bg-stone-50'>
				<Sidebar
					onOpenOverlay={() => setToggled(true)}
					projectList={projectList}
				/>
				{toggled ? (
					<NewProject
						onCloseOverlay={() => setToggled(false)}
						onAdd={handleAddProject}
					/>
				) : (
					<NoSelected />
				)}
			</main>
		</>
	);
}

export default App;
