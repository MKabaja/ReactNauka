import type { orderAddressSchema } from '../types/order';
import type { z } from 'zod';

type FieldErrors = Record<string, string[] | undefined>;
export type ActionState =
	| { success: false; errors: FieldErrors; message?: string }
	| { success: true; errors?: never; message?: string };
