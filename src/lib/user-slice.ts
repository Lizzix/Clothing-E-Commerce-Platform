import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		loggedIn: false,
	},
	reducers: {
		login(state, action) {
			state.user = action.payload;
			state.loggedIn = true;
		},
		logout(state) {
			state.user = null;
			state.loggedIn = false;
		},
		updateData(state, action) {
			state.user = action.payload;
		},
	},
});

export const {login, logout, updateData} = userSlice.actions;
export const selectUser = state => state.user.user as string;

export default userSlice.reducer;
