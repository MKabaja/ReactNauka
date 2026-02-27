import { type ReactNode } from 'react';

interface HeaderProps {
	image: {
		src: string;
		alt: string;
	};
	children: ReactNode;
}

export default function Header({ image, children }: HeaderProps) {
	const { src, alt } = image;

	return (
		<header>
			<img
				src={src}
				alt={alt}
			/>
			{children}
		</header>
	);
}
