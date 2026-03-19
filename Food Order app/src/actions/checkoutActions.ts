import { type ActionState } from '../types/actions';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';

import { orderAddressSchema, type Order } from '../types/order';
import { CartItem } from '@/types/cart';

type CheckoutAction = (
	prevState: ActionState,
	formData: FormData,
	items: readonly CartItem[],
) => Promise<ActionState>;

type OrderPayload = {
	order: {
		customer: Record<string, string>;
		items: readonly CartItem[];
	};
};

const checkoutAction: CheckoutAction = async (prevState, formData, items) => {
	const formValues = Object.fromEntries(formData.entries());
	const validationResult = orderAddressSchema.safeParse(formValues);
	const ORDER_URL = `${API_BASE_URL}${API_ENDPOINTS.ORDERS}`;

	if (!validationResult.success) {
		return {
			success: false,
			errors: validationResult.error.flatten().fieldErrors,
			message: 'Popraw błędy w formularzu',
		};
	}
	const { postalCode, ...rest } = validationResult.data;
	const customer = { ...rest, 'postal-code': postalCode };
	const payload: OrderPayload = {
		order: {
			customer,
			items,
		},
	};

	try {
		const response = await fetch(ORDER_URL, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('Błąd podczas składania zamówienia');
		}
	} catch (error) {
		return {
			success: false,
			message: (error as Error).message,
			errors: {
				general: [
					'Nie można złożyć zamówienia, spróbuj ponownie później.',
				],
			},
		};
	}
	return { success: true };
};
export { checkoutAction };
