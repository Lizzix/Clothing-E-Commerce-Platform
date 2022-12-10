import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
  } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './user-slice';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

let mainReducer;
if (typeof window !== "undefined") {
	mainReducer = persistedReducer;
} else {
	mainReducer = userReducer;
}
const store = configureStore({
	reducer: {
		user: mainReducer,
	},
	middleware: (getDefaultMiddleware) =>
	getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});

setupListeners(store.dispatch);
const persistor = persistStore(store);
export {persistor};
export default store;
