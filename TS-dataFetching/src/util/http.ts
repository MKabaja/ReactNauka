/**
 * Pobiera dane z podanego adresu URL.
 *
 * Zwraca typ `unknown`, ponieważ `response.json()` domyślnie zwraca `any`, co wyłącza sprawdzanie typów.
 * Rzutowanie na `unknown` wymusza na programiście sprawdzenie typu danych (np. za pomocą Zod)
 * lub jawne rzutowanie (asercję) w miejscu użycia funkcji, co zwiększa bezpieczeństwo aplikacji.
 */
export async function get(url: string) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Nie udało się pobrać danych.');
	}

	const data = (await response.json()) as unknown;
	return data;
}
