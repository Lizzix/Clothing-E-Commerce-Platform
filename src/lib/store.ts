import {configureStore, combineReducers} from '@reduxjs/toolkit';
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
import productReducer from './product-slice';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
};

const rootReducer = combineReducers({
	user: userReducer,
	product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let mainReducer;
if (typeof window !== "undefined") {
	mainReducer = persistedReducer;
} else {
	mainReducer = rootReducer;
}
const store = configureStore({
	reducer: {
		user: mainReducer,
		product: mainReducer,
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
