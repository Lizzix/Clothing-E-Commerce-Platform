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

type MyUser = {
	id: String;
	name: String;
	email: String;
	phone: String;
	token: String;
}
type LoginState = boolean;

export const {login, logout, updateData} = userSlice.actions;
export const selectUser = (state: { user: { user: MyUser; }; }) => state.user.user as MyUser;
export const selectLoggedIn = (state: { user: { loggedIn: boolean; }; }) => state.user.loggedIn as LoginState;

export default userSlice.reducer;
