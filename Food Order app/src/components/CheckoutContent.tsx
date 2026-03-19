import Field from './Field';
import Form from './Form';
import { checkoutAction } from '../actions/checkoutActions';
import { useActionState } from 'react';
import { useCartContext } from '../context/CartContext';
import { type ActionState } from '../types/actions';

const initialState: ActionState = {
	success: false,
	errors: {},
};

type CheckoutContentProps = {
	totalPrice: number;
	close: () => void;
};
export default function CheckoutContent({
	totalPrice,
	close,
}: CheckoutContentProps) {
	const {
		cart: { items },
	} = useCartContext();
	const [formState, formAction] = useActionState(
		(prevState: ActionState, formData: FormData) =>
			checkoutAction(prevState, formData, items),
		initialState,
	);
	return (
		<>
			<h2>Twoje Zamowienie</h2>
			<p>Wartość zamówienia: {totalPrice} zł</p>
			<Form
				onCancel={close}
				submitLabel='Zamów'
				cancelLabel='Anuluj'
				isLoading={false}
				action={formAction}
			>
				<Field
					label='Imię i nazwisko'
					id='name'
					error={formState.errors?.name?.[0] || ''}
				>
					<input
						type='text'
						id='name'
						name='name'
					/>
				</Field>
				<Field
					label='Adres e-mail'
					id='email'
					error={formState.errors?.email?.[0] || ''}
				>
					<input
						type='email'
						id='email'
						name='email'
					/>
				</Field>
				<Field
					label='Adres dostawy'
					id='street'
					error={formState.errors?.street?.[0] || ''}
				>
					<input
						type='text'
						id='street'
						name='street'
					/>
				</Field>
				<div className='control-row'>
					<Field
						label='Kod pocztowy'
						id='postalCode'
						error={formState.errors?.postalCode?.[0] || ''}
					>
						<input
							type='text'
							id='postalCode'
							name='postalCode'
						/>
					</Field>
					<Field
						label='Miasto'
						id='city'
						error={formState.errors?.city?.[0] || ''}
					>
						<input
							type='text'
							id='city'
							name='city'
						/>
					</Field>
				</div>
			</Form>
		</>
	);
}
