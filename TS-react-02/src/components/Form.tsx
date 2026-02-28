import {
	type ComponentPropsWithoutRef,
	type FormEvent,
	useImperativeHandle,
	useRef,
	forwardRef,
} from 'react';

export type FormHandle = {
	clear: () => void;
};
type FormProps = ComponentPropsWithoutRef<'form'> & {
	onSave: (value: unknown) => void;
};

const Form = forwardRef<FormHandle, FormProps>(function Form(
	{ onSave, children, ...otherProps },
	ref,
) {
	const formRef = useRef<HTMLFormElement>(null);

	useImperativeHandle(ref, () => {
		return {
			clear() {
				formRef.current?.reset();
			},
		};
	});
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData);
		onSave(data);
	}
	return (
		<form
			onSubmit={handleSubmit}
			{...otherProps}
			ref={formRef}
		>
			{children}
		</form>
	);
});
export default Form;
