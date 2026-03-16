import { use, useEffect, useState } from 'react';
import { type OpinionDTO } from '../http/http';

type FetchFunction = () => Promise<OpinionDTO>;

export const useFetch = (fetchFunction: FetchFunction) => {
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [fetchedData, setFetchedData] = useState<OpinionDTO[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			setIsFetching(true);
			try {
				const data = await fetchFunction();
				setFetchedData([data]);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
				console.error('Error fetching data:', error);
			} finally {
				setIsFetching(false);
			}
		}
		fetchData();
	}, [fetchFunction]);
	return { isFetching, fetchedData, error, setFetchedData };
};
