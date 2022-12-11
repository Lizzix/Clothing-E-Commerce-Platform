import {createSlice} from '@reduxjs/toolkit';

export const productSlice = createSlice({
	name: 'user',
	initialState: {
		product_list: null,
	},
	reducers: {
		loadProduct(state, action) {
			state.product_list = action.payload;
		},
	},
});

export const {
	loadProduct,
} = productSlice.actions;

export const selectProducts = (state) => state.user.product_list;
export default productSlice.reducer;
