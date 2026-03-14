interface ApiEndpoints {
	readonly MEALS: string;
	readonly ORDERS: string;
}
export const API_BASE_URL = 'http://localhost:3000' as const;

export const API_ENDPOINTS: ApiEndpoints = {
	MEALS: '/meals',
	ORDERS: '/orders',
};
