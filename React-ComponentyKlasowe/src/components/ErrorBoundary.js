/*
	Error Boundary (granica błędów)

	To specjalny komponent React (najczęściej klasowy), który "łapie" błędy JavaScript
	występujące w dowolnym miejscu w drzewie komponentów znajdującym się poniżej niego.
	Zamiast dopuścić do całkowitego awarii aplikacji, Error Boundary pozwala wyświetlić
	zapasowy interfejs (np. komunikat o błędzie) i utrzymać aplikację w działaniu.

	Ważne w prostych słowach:
	- reaguje na błędy w metodach render, lifecycle i konstruktorach komponentów potomnych,
		używając metody `componentDidCatch`.
	- nie zastępuje try/catch w event handlerach ani błędów asynchronicznych (np. w setTimeout
		czy obietnicach) — te trzeba obsługiwać osobno.

	Ten plik implementuje prosty Error Boundary, który ustawia flagę stanu po wykryciu błędu
	i wyświetla komunikat zastępczy.
*/

import { Component, Fragment } from 'react';

export default class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = { hasError: false };
	}
	componentDidCatch(error) {
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return <p>Something went wrong!</p>;
		}
		return this.props.children;
	}
}
