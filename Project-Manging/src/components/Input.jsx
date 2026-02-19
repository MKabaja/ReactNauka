import { forwardRef } from 'react';
const Input = forwardRef(function Input(
	{
		error,
		label,
		isTextArea = false,

		...props
	},
	ref,
) {
	console.log('ref w inpucie: ', ref);
	const classes = `bg-stone-300 border-b  transition-all hover:-translate-y-1 ${error ? 'border-red-400' : 'border-stone-700'}`;

	const errorId = `${props.id}-error`;
	return (
		<div>
			<label className='flex flex-col font-semibold text-stone-700 '>
				{label}
				{isTextArea ? (
					<textarea
						ref={ref}
						className={classes}
						id={props.id}
						aria-describedby={error ? errorId : undefined}
						{...props}
					/>
				) : (
					<input
						className={classes}
						ref={ref}
						id={props.id}
						aria-describedby={error ? errorId : undefined}
						{...props}
					/>
				)}
			</label>
			{error && (
				<p
					id={errorId}
					className='text-xs text-red-400  absolute'
				>
					{error}
				</p>
			)}
		</div>
	);
});

export default Input;
