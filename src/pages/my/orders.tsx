import {
	Stack,
	useColorModeValue,
	Heading,
	useMediaQuery,
	Flex,
} from '@chakra-ui/react';
import {useSelector, useDispatch} from 'react-redux';
import useSWR from 'swr';
import {updateBuyerOrders, updateSellerOrders, selectOrders} from '../../lib/user-slice';

export default function Orders() {
	// Const dispatch = useDispatch();
	// const fetcher = async (url: string) => fetch(url).then(async r => r.json());
	// const {data, error} = useSWR('../api/buyers/me/orders', fetcher);
	// console.log(data);

	// const {sellers, buyers} = useSelector(selectOrders);
	// Const [isSmallerThan750] = useMediaQuery('(max-width: 750px)');
	// const variant = isSmallerThan750 ? 'xs' : 'xl';
	// console.log(buyers);
	return (
		<Flex py={'6'} direction={'column'} justify={'start'} align={'center'} minH={'100vh'} bg={useColorModeValue('gray.100', 'gray.800')}>

		</Flex>
	);
}
