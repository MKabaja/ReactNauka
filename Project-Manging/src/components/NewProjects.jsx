import Button from './Button.jsx';
import Input from './Input.jsx';
import { useState } from 'react';
export default function NewProject({ onCloseOverlay, onAdd }) {
	const initialData = {
		title: '',
		description: '',
		date: '',
	};
	const [projectData, setProjectData] = useState(initialData);
	const [errors, setErrors] = useState({});

	function handleChange(e) {
		const { name, value } = e.target;
		const updatedProjectData = {
			...projectData,
			[name]: value,
		};

		setProjectData(updatedProjectData);
		if (errors[name]) {
			setErrors((prevErrors) => {
				const newErrors = { ...prevErrors };
				delete newErrors[name];
				return newErrors;
			});
		}
	}
	function handleBlur(e) {
		const { name, value } = e.target;
		const errorMsg = getErrorForField(name, value);
		if (errorMsg) {
			setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
		}
	}

	function handleSubmit() {
		const newErrors = {};
		Object.entries(projectData).forEach(([name, value]) => {
			const errorMsg = getErrorForField(name, value);
			if (errorMsg) {
				newErrors[name] = errorMsg;
			}
		});
		setErrors(newErrors);
		if (Object.keys(newErrors).length > 0) {
			return;
		}

		onAdd({
			title: projectData.title,
			description: projectData.description,
			date: projectData.date,
		});
		setProjectData(initialData);
	}
	return (
		<div className='bg-stone-50  w-2/3 px-4'>
			<ul className=' flex  gap-4 flex-row-reverse'>
				<li>
					<Button
						variant='secondary'
						text='Zapisz'
						onClick={handleSubmit}
					></Button>
				</li>

				<li>
					<Button
						variant='cancel'
						text='Anuluj'
						onClick={onCloseOverlay}
					></Button>
				</li>
			</ul>
			<div className=' flex flex-col space-y-2.5'>
				<Input
					label='Nazwa'
					name='title'
					id='title'
					error={errors.title}
					value={projectData.title}
					onChange={handleChange}
					onBlur={handleBlur}
					type='text'
					required
				></Input>
				<Input
					label='opis'
					isTextArea={true}
					error={errors.description}
					name='description'
					id='description'
					value={projectData.description}
					onChange={handleChange}
					onBlur={handleBlur}
					required
				></Input>
				<Input
					label='Data'
					type='date'
					id='date'
					error={errors.date}
					name='date'
					value={projectData.date}
					onChange={handleChange}
					onBlur={handleBlur}
					required
				></Input>
			</div>
		</div>
	);

	function getErrorForField(name, value) {
		if (name === 'title') {
			return validateInput(value, 5);
		}
		if (name === 'description') {
			return validateInput(value, 10);
		}
		if (name === 'date') {
			if (value.trim().length === 0) {
				return 'Wybierz datę';
			}
		}

		return null;
	}

	function validateInput(value, len) {
		const trimmedValue = value.trim();

		switch (true) {
			case trimmedValue.length === 0:
				return 'Pole wymagane';
			case trimmedValue.length < len:
				return ` Pole musi mieć conajmniej ${len} znaków`;
			case /^(.)\1+$/.test(trimmedValue):
				return 'Tytuł zawiera niedozwolony ciąg znaków';
			default:
				return '';
		}
	}
}
