import { createPortal } from 'react-dom';
import {
	type ReactNode,
	type ComponentPropsWithoutRef,
	useEffect,
	useRef,
} from 'react';

type ModalProps = ComponentPropsWithoutRef<'dialog'> & {
	isOpen: boolean;
	onClose?: () => void;
	className?: string;
	children: ReactNode;
};

export default function Modal({
	children,
	isOpen,
	onClose,
	className = '',
}: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog?.showModal();
		} else {
			dialog?.close();
		}
	}, [isOpen]);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog || !onClose) return;
		const handleClose = () => onClose();

		dialog.addEventListener('close', handleClose);
		return () => {
			dialog.removeEventListener('close', handleClose);
		};
	}, [onClose]);
	return createPortal(
		<dialog
			ref={dialogRef}
			className={`modal ${className}`}
		>
			{children}
		</dialog>,
		document.getElementById('modal') as HTMLElement,
	);
}
