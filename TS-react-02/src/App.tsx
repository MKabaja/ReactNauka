import Input from './components/Input.tsx';
import Button from './components/Button.tsx';
import Container from './components/Container.tsx';
import { useRef } from 'react';
import Form, { type FormHandle } from './components/Form.tsx';

function App() {
	const customRef = useRef<FormHandle>(null);

	function handleSave(data: unknown) {
		const extractedData = data as { name: string; age: string };
		console.log(extractedData);
		customRef.current?.clear();
	}
	return (
		<main>
			<Form
				onSave={handleSave}
				ref={customRef}
			>
				<Input
					type='text'
					label='Nazwa'
					id='name'
				></Input>
				<Input
					type='number'
					label='Wiek'
					id='age'
				></Input>
				<p>
					<Button type='submit'>Zapisz</Button>
				</p>
			</Form>
		</main>
	);
}

export default App;
