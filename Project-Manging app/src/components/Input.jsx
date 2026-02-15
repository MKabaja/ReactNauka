export default function Input({ label, isTextArea = false, ...props }) {
	return (
		<label>
			{label}
			{isTextArea ? <textarea {...props} /> : <input {...props} />}
		</label>
	);
}
