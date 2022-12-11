import type {AppProps} from 'next/app';
import {ChakraProvider} from '@chakra-ui/react';
import '../styles/global.css';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
// Import {useRouter} from 'next/router';
// import {useEffect, useState} from 'react';
import store, {persistor} from '../lib/store';
import Layout from '../components/layout';
// Import Loading from '../components/loading';

export default function App({Component, pageProps}: AppProps) {
	// Const router = useRouter();
	// const [isLoading, setIsLoading] = useState(false);

	// useEffect(() => {
	// 	const user = JSON.parse(localStorage?.getItem('persist:root'));
	// 	if (router.pathname !== '/login' && !user.LoggedIn) {
	// 		setIsLoading(true);
	// 		router.replace('/login', undefined, {shallow: true});
	// 	} else {
	// 		setIsLoading(false);
	// 	}
	// }, []);

	// if (isLoading) {
	// 	return (
	// 		<ReduxProvider store={store}>
	// 			<PersistGate loading={null} persistor={persistor}>
	// 				<ChakraProvider>
	// 					<Layout>
	// 						<Loading />
	// 					</Layout>
	// 				</ChakraProvider>
	// 			</PersistGate>
	// 		</ReduxProvider>
	// 	);
	// }
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ChakraProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ChakraProvider>
			</PersistGate>
		</ReduxProvider>
	);
}
