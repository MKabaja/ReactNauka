import { z } from 'zod';
import { CartItem } from './cart';

/**
 * Zod schema for validating customer address in the order form.
 * All fields are required. Email must be valid.
 * Used for both client-side and server-side validation.
 *
 * Example usage:
 *   orderAddressSchema.parse({
 *     name: 'Jan Kowalski',
 *     email: 'jan@example.com',
 *     street: 'Kwiatowa 5',
 *     postalCode: '00-123',
 *     city: 'Warszawa',
 *   });
 */

export const orderAddressSchema = z.object({
	/** Full name of the customer (min. 4 characters) */
	name: z.string().min(4, 'Full name is required'),
	/** Email address of the customer (must be valid email) */
	email: z.string().email('Invalid email address'),
	/** Street address (min. 3 characters) */
	street: z.string().min(3, 'Street is required'),
	/** Postal code (min. 6 characters, e.g. 00-123) */
	postalCode: z.string().min(6, 'Postal code is required'),
	/** City name (min. 4 characters) */
	city: z.string().min(4, 'City is required'),
});

/**
 * TypeScript type for customer address, inferred from Zod schema.
 * Ensures type safety and consistency with validation rules.
 *
 * @property name - Full name of the customer
 * @property email - Email address
 * @property street - Street address
 * @property postalCode - Postal code
 * @property city - City name
 */
export type OrderAddress = z.infer<typeof orderAddressSchema>;

/**
 * Structure of an order sent to the backend.
 * Contains validated customer address and list of cart items.
 *
 * @property customer - Validated address and contact info
 * @property items - List of products in the cart
 *
 * Example usage:
 *   const order: Order = {
 *     customer: { name: 'Jan', email: 'jan@x.pl', street: 'ul. Testowa', postalCode: '00-000', city: 'Miasto' },
 *     items: [{ id: 'm1', quantity: 2, price: 12.99 }],
 *   };
 */
export interface Order {
	readonly customer: OrderAddress;
	readonly items: CartItem[];
}
