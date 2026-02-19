import NewProject from './components/NewProjects.jsx';
import NoSelected from './components/NoSelected.jsx';
import Sidebar from './components/Sidebar.jsx';
import Project from './components/Project.jsx';

import { useState } from 'react';

function App() {
	const [projectState, setProjectState] = useState({
		selectedProjectId: undefined,
		projects: [],
		tasks: [],
		isAdding: false,
	});

	function handleAddProject(projectData) {
		setProjectState((prev) => {
			const newProject = {
				...projectData,
				id: Math.random().toString(),
			};

			return {
				...prev,
				selectedProjectId: undefined,
				isAdding: false,
				projects: [...prev.projects, newProject],
			};
		});
	}
	function handleAddTask(task) {
		if (task.trim().length === 0) {
			return console.log('pusty input');
		}
		setProjectState((prevState) => {
			const prevTasks = prevState.tasks;
			const newTask = {
				text: task,
				id: Math.random().toString(),
				projectId: prevState.selectedProjectId,
			};

			return {
				...prevState,
				tasks: [...prevTasks, newTask],
			};
		});
	}

	function handleDeleteTask(taskID) {
		setProjectState((prevState) => {
			return {
				...prevState,

				tasks: prevState.tasks.filter((task) => task.id !== taskID),
			};
		});
	}

	function handleOpenOverlay() {
		setProjectState((prev) => ({
			...prev,
			selectedProjectId: undefined,
			isAdding: true,
		}));
	}
	function handleCloseOverlay() {
		setProjectState((prev) => ({
			...prev,
			isAdding: false,
			selectedProjectId: undefined,
		}));
	}
	function handleSelectProject(projectID) {
		setProjectState((prev) => ({
			...prev,
			isAdding: false,
			selectedProjectId: projectID,
		}));
	}

	function handleDeleteProject(ProjectID) {
		setProjectState((prevState) => {
			return {
				...prevState,
				selectedProjectId: undefined,
				projects: prevState.projects.filter(
					(project) => project.id !== ProjectID,
				),
				tasks: prevState.tasks.filter(
					(task) => task.projectId !== ProjectID,
				),
			};
		});
	}

	let content = <NoSelected onOpenOverlay={handleOpenOverlay} />;

	if (projectState.isAdding) {
		content = (
			<NewProject
				onCloseOverlay={handleCloseOverlay}
				onAdd={handleAddProject}
			/>
		);
	}
	if (
		typeof projectState.selectedProjectId === 'string' &&
		!projectState.isAdding
	) {
		content = (
			<Project
				projectData={projectState.projects.find(
					(project) => project.id === projectState.selectedProjectId,
				)}
				tasks={projectState.tasks.filter(
					(task) => task.projectId === projectState.selectedProjectId,
				)}
				onDeleteProject={handleDeleteProject}
				onAddtask={handleAddTask}
				onDeleteTask={handleDeleteTask}
			/>
		);
	}

	return (
		<>
			<main className='flex pt-6 h-screen my-8 gap-8 bg-stone-50'>
				<Sidebar
					onOpenOverlay={handleOpenOverlay}
					projectList={projectState.projects}
					onSelectProject={handleSelectProject}
				/>
				{content}
			</main>
		</>
	);
}

export default App;
