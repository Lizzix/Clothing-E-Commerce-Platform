import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		loggedIn: false,
		readSellerData: false,
		readBuyerData: false,
		sellerCoupons: null,
		sellerOrders: null,
		sellerItems: null,
		buyerCoupons: null,
		buyerOrders: null,
	},
	reducers: {
		login(state, action) {
			state.user = action.payload;
			state.loggedIn = true;
		},
		logout(state) {
			state.user = null;
			state.loggedIn = false;
			state.readSellerData = false;
			state.readBuyerData = false;
			state.sellerCoupons = null;
			state.sellerOrders = null;
			state.sellerItems = null;
			state.buyerCoupons = null;
			state.buyerOrders = null;
		},
		updateUser(state, action) {
			state.user = action.payload;
		},
		updateSellerCoupons(state, action) {
			state.sellerCoupons = action.payload;
		},
		updateBuyerCoupons(state, action) {
			state.buyerCoupons = action.payload;
		},
		updateSellerOrders(state, action) {
			state.sellerOrders = action.payload;
		},
		updateBuyerOrders(state, action) {
			state.buyerOrders = action.payload;
		},
		updateSellerData(state, action) {
			state.readSellerData = true;
			state.sellerCoupons = action.payload.coupons;
			state.sellerItems = action.payload.orders;
		},
		updateBuyerData(state, action) {
			state.readBuyerData = true;
			state.buyerCoupons = action.payload.coupons;
			state.buyerOrders = action.payload.orders;
		}
	},
});

export type MyUser = {
	id: String,
	name: String,
	email: String,
	phone: String,
	token: String,
}
export type LoginState = boolean;

export const {
	login,
	logout,
	updateUser,
	updateSellerCoupons,
	updateBuyerCoupons,
	updateSellerOrders,
	updateBuyerOrders,
	updateSellerData,
	updateBuyerData,
} = userSlice.actions;

export const selectUser = (state) => state.user.user as MyUser;
export const selectLoggedIn = (state) => state.user.loggedIn as LoginState;
export const selectCoupons = (state) =>
{
	return {
		sellers: state.user.sellerCoupons,
		buyers: state.user.buyerCoupons,
	};
}
export const selectOrders = (state) =>
{
	return {
		sellers: state.user.sellerOrders,
		buyers: state.user.buyerOrders,
	};
}

export default userSlice.reducer;
