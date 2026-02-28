import { type ComponentPropsWithRef, forwardRef } from 'react';

type InputProps = {
	label: string;
	id: string;
} & ComponentPropsWithRef<'input'>;

/**
 * 📘 NOTATKA EDUKACYJNA (forwardRef):
 *
 * Używamy `forwardRef`, aby rodzic (App) mógł uzyskać dostęp do elementu DOM (input) wewnątrz tego komponentu.
 *
 * 1. Dlaczego forwardRef?
 *    W React < 19 `ref` nie jest zwykłym propem - jest "wycinany" z propsów i nie przechodzi niżej.
 *    `forwardRef` tworzy "tunel", który pozwala przekazać ref z góry na dół.
 *
 * 2. Składnia `forwardRef<T, P>`:
 *    - T (HTMLInputElement): Typ elementu DOM, na którym zapniemy ref. To musi pasować do `useRef<T>` u rodzica.
 *    - P (InputProps): Typ propsów naszego komponentu.
 *    ⚠️ UWAGA: W generyku najpierw podajemy typ Refa, a potem Propsów.
 *
 * 3. Argumenty funkcji:
 *    Funkcja wewnątrz otrzymuje `(props, ref)`. Ref musimy ręcznie przypisać do elementu HTML (`ref={ref}`).
 */
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ label, id, ...props },
	ref,
) {
	return (
		<p>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				name={id}
				{...props}
				ref={ref}
			/>
		</p>
	);
});

export default Input;
