import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user-slice';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user'],
};
const persisitedReducer = persistReducer(persistConfig, userReducer);
const store = configureStore({
	reducer: {
		user: persisitedReducer,
	},
});

setupListeners(store.dispatch);

const persistor = persistStore(store);
export {persistor};
export default store;
