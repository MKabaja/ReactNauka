import logo from '../assets/logo.png';

export default function Header() {
	return (
		<header className='flex flex-col mt-8  md-8 md:mb-16 items-center'>
			<img
				className='mb-8 w-44 h-44 object-contain'
				src={logo}
				alt='A canvas'
			/>
			<h1 className=' font-title text-xl md:text-4xl font-semibold tracking-widest text-center uppercase text-amber-800'>
				ReactArt
			</h1>
			<p className=' text-stone-500'>
				A community of artists and art-lovers.
			</p>
		</header>
	);
}
