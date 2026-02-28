import { ComponentPropsWithoutRef } from 'react';

/**
 * 📘 NOTATKA EDUKACYJNA (TS & React Patterns):
 *
 * Ten komponent to tzw. "Polymorphic Component" - renderuje <button> LUB <a> zależnie od propsów.
 *
 * 1. **Discriminated Union (Rozłączna Unia)**:
 *    - `ButtonProps` ma `href?: never`. To kluczowe! Mówi TS: "Jeśli to przycisk, NIE MOŻE mieć href".
 *    - `AnchorProps` ma `href?: string`.
 *    Dzięki temu TS wie, że obecność `href` automatycznie przełącza typ na `AnchorProps`.
 *
 * 2. **Type Predicate (Predykat Typu)**:
 *    Funkcja `isAnchorProps` ma typ zwrotny `props is AnchorProps`.
 *    To instrukcja dla kompilatora: "Jeśli ta funkcja zwróci true, traktuj zmienną `props` wewnątrz bloku if jako `AnchorProps`".
 *    Bez tego TS zgłaszałby błąd wewnątrz if-a, bo `props` (jako unia) nie gwarantuje istnienia pól z <a>.
 *
 * ✅ PLUSY: Świetny Developer Experience (DX) - jeden komponent do wszystkiego, pełne bezpieczeństwo typów (IntelliSense podpowiada właściwe atrybuty).
 * ❌ MINUSY: Wymaga napisania "Type Guarda" (`isAnchorProps`) i nieco bardziej skomplikowanej definicji typów na start.
 */

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
	href?: never;
};

type AnchorProps = ComponentPropsWithoutRef<'a'> & {
	href?: string;
};

function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
	return 'href' in props;
}

export default function Button(props: ButtonProps | AnchorProps) {
	if (isAnchorProps(props)) {
		return (
			<a
				className='button'
				{...props}
			></a>
		);
	}

	return (
		<button
			className='button'
			{...props}
		></button>
	);
}
