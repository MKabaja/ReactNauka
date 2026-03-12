import { useEffect, useState } from 'react';
import { ErrorState } from '../components/AvailablePlaces';
import { Place } from '../types/Places';

type FetchFunction = (url: string) => Promise<Place[]>;

export function useFetch(URL: string, msg: string, fetchFN: FetchFunction) {
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [fetchedData, setFetchedData] = useState<Place[]>([]);
	const [error, setError] = useState<ErrorState | null>(null);

	useEffect(() => {
		async function fetchData() {
			setIsFetching(true);
			try {
				const data = await fetchFN(URL);
				setFetchedData(data);
			} catch (error) {
				if (error instanceof Error) {
					setError({
						message: error.message || msg,
					});
				}
			} finally {
				setIsFetching(false);
			}
		}
		fetchData();
	}, [fetchFN]);
	return { isFetching, fetchedData, error, setFetchedData };
}
