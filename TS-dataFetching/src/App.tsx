import { get } from './util/http';
import { type ReactNode, useState, useEffect } from 'react';
import BlogPosts, { type BlogPost } from './components/BlogPosts';
import fetchingImg from './assets/data-fetching.png';
import ErrorMessage from './components/ErrorMessage';

type RawDataBlogPost = {
	// To jest typ danych "surowych" z API (DTO).
	// Często różni się on od typu używanego w komponentach (np. 'body' vs 'text').
	// Dobrą praktyką jest definiowanie go osobno.
	id: number;
	userId: number;
	title: string;
	body: string;
};

function App() {
	// Używamy Generics (<BlogPost[]>), aby poinformować TS,
	// że ten stan będzie przechowywał tablicę postów lub undefined (początkowo).
	const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	useEffect(() => {
		async function fetchPosts() {
			setIsFetching(true);
			try {
				// Asercja typu (Type Assertion).
				// Funkcja get() zwraca `unknown`. Tutaj "ręczymy" przed kompilatorem,
				// że otrzymane dane to na pewno tablica RawDataBlogPost.
				// To miejsce potencjalnie niebezpieczne (runtime error, jeśli API zwróci co innego).
				const data = (await get(
					'https://jsonplaceholder.typicode.com/pos',
				)) as RawDataBlogPost[];

				// Transformacja danych (Mapowanie).
				// Konwertujemy typ z API (RawDataBlogPost) na typ komponentu (BlogPost).
				const blogPost: BlogPost[] = data.map((rawPost) => {
					return {
						id: rawPost.id,
						title: rawPost.title,
						text: rawPost.body,
					};
				});
				setFetchedPosts(blogPost);
			} catch (error) {
				// W bloku catch 'error' jest typu 'unknown'.
				// Musimy użyć Type Guard (instanceof), aby bezpiecznie dostać się do .message.
				if (error instanceof Error) {
					// Tutaj TS już wie, że error to Error.
					// Rzutowanie (error as Error) jest tu technicznie nadmiarowe, ale poprawne.
					setError((error as Error).message);
				}
			} finally {
				setIsFetching(false);
			}
		}
		fetchPosts();
	}, []);

	let content: ReactNode;
	if (error) {
		content = <ErrorMessage text={error}></ErrorMessage>;
	}
	if (fetchedPosts) {
		content = <BlogPosts posts={fetchedPosts}></BlogPosts>;
	} else if (isFetching) {
		content = <p id='loading-fallback'>Loading...</p>;
	}

	return (
		<main>
			<img
				src={fetchingImg}
				alt='Computer fetch Data'
			/>
			{content}
		</main>
	);
}

export default App;
