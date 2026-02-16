import { NewProject } from './components/NewProjects';
import NoSelected from './components/NoSelected';
import Sidebar from './components/Sidebar';

import { useRef } from 'react';

function App() {
	const modalRef = useRef();

	function handleOpenModal() {
		console.log('kliknięto');
		modalRef.current.open();
	}
	return (
		<>
			<main className='flex pt-6 h-screen my-8 gap-8 bg-stone-50'>
				<Sidebar onAddProject={handleOpenModal} />
				{/* <NoSelected /> */}
				<NewProject />
			</main>
		</>
	);
}

export default App;
