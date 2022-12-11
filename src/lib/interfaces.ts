export interface User_Coupon {
	discountId: number,
	isUsed: boolean,
	userId: number,
}
export interface Coupon {
	id: number,
	name: string,
	scope: string,
	type: string,
	value: number,
	amount: number,
	startAt: Date,
	endAt: Date,
	productId: number,
	sellerId: number,
}