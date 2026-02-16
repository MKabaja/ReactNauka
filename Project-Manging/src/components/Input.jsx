export default function Input({ ref, label, isTextArea = false, ...props }) {
	const classes =
		'bg-stone-300 border-b border-gray-500 transition-all hover:-translate-y-1 ';
	return (
		<div>
			<label className='flex flex-col font-semibold text-stone-700 '>
				{label}
				{isTextArea ? (
					<textarea
						className={classes}
						{...props}
						ref={ref}
					/>
				) : (
					<input
						className={classes}
						{...props}
						ref={ref}
					/>
				)}
			</label>
		</div>
	);
}
