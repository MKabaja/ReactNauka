import { log } from '../../log.js';
import { memo } from 'react';
import {
	ReactNode,
	type ComponentType,
	type ButtonHTMLAttributes,
} from 'react';

type IconButtonProps = {
	children: ReactNode;
	icon: ComponentType<{ className?: string }>; //oznacza: "Prop icon musi być komponentem React, który można wywołać z propsami { className?: string }".
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = memo(function IconButton({
	children,
	icon,
	...props
}: IconButtonProps) {
	log('<IconButton /> rendered', 2);

	const Icon = icon;
	return (
		<button
			{...props}
			className='button'
		>
			<Icon className='button-icon' />
			<span className='button-text'>{children}</span>
		</button>
	);
});
export default IconButton;
