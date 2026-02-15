export default function Button({ text, variant = 'primary', onClick }) {
	const variants = {
		primary:
			'bg-stone-700 text-neutral-400 hover:text-neutral-200 hover:bg-stone-600',
		secondary:
			'bg-stone-800 text-neutral-300 hover:text-neutral-100 hover:bg-stone-700',
		cancel: 'bg-stone-50 text-stone-800 hover:border-stone-800 hover:bg-stone-200',
	};
	return (
		<section>
			<button
				onClick={onClick}
				className={`px-4 py-2 rounded-md border-2 border-transparent transition-all ${variants[variant]}`}
			>
				{text}
			</button>
		</section>
	);
}
