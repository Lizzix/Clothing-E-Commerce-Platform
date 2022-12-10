import type {AppProps} from 'next/app';
import {ChakraProvider} from '@chakra-ui/react';
import '../styles/global.css';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from '../lib/store';
import Layout from '../components/layout';

export default function App({Component, pageProps}: AppProps) {
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
