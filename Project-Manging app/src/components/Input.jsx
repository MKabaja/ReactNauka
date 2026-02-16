export default function Input({ label, isTextArea = false, ...props }) {
	return (
		<div>
			<label>
				{label}
				{isTextArea ? <textarea {...props} /> : <input {...props} />}
			</label>
		</div>
	);
}
