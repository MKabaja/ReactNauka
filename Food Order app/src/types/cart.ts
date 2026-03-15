export interface CartItem {
	readonly id: string;
	readonly quantity: number;
}
export interface Cart {
	readonly items: readonly CartItem[];
}
