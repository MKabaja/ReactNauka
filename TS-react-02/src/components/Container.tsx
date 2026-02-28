import {
	type ReactNode,
	type ElementType,
	type ComponentPropsWithoutRef,
} from 'react';

/**
 * 📘 NOTATKA EDUKACYJNA (Polymorphic Component):
 *
 * Ten komponent to generyczny kontener, który może renderować DOWOLNY tag HTML lub inny komponent,
 * zachowując przy tym pełne bezpieczeństwo typów.
 *
 * 1. <T extends ElementType>:
 *    Definiujemy parametr typu `T`. `ElementType` to wbudowany typ Reacta, który obejmuje
 *    wszystkie poprawne tagi HTML (np. 'div', 'span') oraz komponenty Reacta.
 *
 * 2. ComponentPropsWithoutRef<T>:
 *    To kluczowy moment. Pobieramy propsy właściwe dla elementu `T`.
 *    Jeśli T='button', TS pozwoli na props `disabled`. Jeśli T='a', pozwoli na `href`.
 *
 * ✅ PLUSY: Wysoka elastyczność (DRY), poprawna semantyka HTML, IntelliSense podpowiada atrybuty pasujące do tagu.
 * ❌ MINUSY: Złożona składnia typów. Ta wersja NIE obsługuje `ref` (wymagałoby to `forwardRef` i jeszcze trudniejszych typów).
 */

type ContainerProps<T extends ElementType> = {
	as?: T; // Opcjonalny prop 'as', który determinuje, co renderujemy.
	children: ReactNode;
} & ComponentPropsWithoutRef<T>;

// <C extends ElementType>: Funkcja też musi być generyczna, żeby "złapać" to, co ktoś poda w propsie `as`.
export default function Container<C extends ElementType>({
	as,
	children,
	...props
}: ContainerProps<C>) {
	// W JSX tagi dynamiczne muszą zaczynać się z Wielkiej Litery.
	// Jeśli `as` nie jest podane, domyślnie renderujemy 'div'.
	const Component = as || 'div';
	return <Component {...props}>{children}</Component>;
}
