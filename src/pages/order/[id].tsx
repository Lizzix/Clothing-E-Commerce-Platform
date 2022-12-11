import {
	Flex,
	useMediaQuery,
	useColorModeValue,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import Loading from '../../components/loading';
import OrderDetail from '../../components/order-detail';

export default function OrderPage() {
	const router = useRouter();
	const [isSmallerThan850] = useMediaQuery('(max-width: 850px)');
	const fetcher = async (url: RequestInfo | URL) => fetch(url).then(async response => response.json());
	const {data, isLoading} = useSWR('/api/orders/' + String(router.query.id), fetcher);

	if (isLoading) {
		return (<Loading />);
	}

	return (
		<Flex py={'6'} direction={'column'} justify={'start'} align={'center'} minH={'100vh'} bg={useColorModeValue('gray.100', 'gray.800')}>
			<OrderDetail variant={isSmallerThan850} order={data.data}/>
		</Flex>
	);
}
