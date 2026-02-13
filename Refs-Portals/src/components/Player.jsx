import { useState, useRef } from 'react';
//
export default function Player() {
	const inputRef = useRef();

	const [enteredName, setEnteredName] = useState('');

	function handleClick() {
		setEnteredName(inputRef.current.value);
		inputRef.current.value = '';
	}

	return (
		<section id='player'>
			<h2>Welcome {enteredName ?? 'unknown entity'} </h2>
			<p>
				<input
					ref={inputRef}
					type='text'
				/>
				<button onClick={handleClick}>Set Name</button>
			</p>
		</section>
	);
}
