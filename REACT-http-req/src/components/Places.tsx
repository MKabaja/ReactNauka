import { type Place } from '../types/Places';

type PlacesProps = {
	title: string;
	places: (Place | null)[];
	fallbackText: string;
	onSelectPlace: (place: Place) => void;
	isLoading: boolean;
	loadingText: string;
};

export default function Places({
	title,
	places,
	fallbackText,
	onSelectPlace,
	isLoading,
	loadingText,
}: PlacesProps) {
	console.log(places);
	return (
		<section className='places-category'>
			<h2>{title}</h2>
			{isLoading && <p className='fallback-text'>{loadingText}</p>}
			{!isLoading && places.length === 0 && (
				<p className='fallback-text'>{fallbackText}</p>
			)}
			{!isLoading && places.length > 0 && (
				<ul className='places'>
					{places.map((place) => (
						<li
							key={place?.id}
							className='place-item'
						>
							{place && (
								<button onClick={() => onSelectPlace(place)}>
									<img
										src={`http://localhost:3000/${place.image.src}`}
										alt={place.image.alt}
									/>
								</button>
							)}
							<h3>{place?.title}</h3>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
