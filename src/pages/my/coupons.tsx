import {
	Stack,
	useColorModeValue,
	Heading,
	useMediaQuery,
	Flex,
} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import CouponTable from '../../components/coupon-table';
import {selectCoupons} from '../../lib/user-slice';

export default function Coupons() {
	const {sellers, buyers} = useSelector(selectCoupons);
	const [isSmallerThan750] = useMediaQuery('(max-width: 750px)');
	const variant = isSmallerThan750 ? 'xs' : 'xl';

	return (
		<Flex py={'6'} direction={'column'} justify={'start'} align={'center'} minH={'100vh'} bg={useColorModeValue('gray.100', 'gray.800')}>
			<Stack spacing={'10'}>
				<Stack spacing={'5'} align={'center'}>
					<Heading>As a Buyer</Heading>
					<Flex
						width={variant}
						justify={'center'}
						rounded={'lg'}
						bg={useColorModeValue('white', 'gray.700')}
						boxShadow={'lg'}
						p={5}>
						<CouponTable coupon={buyers?.buyerCoupons} variant={isSmallerThan750} />
					</Flex>
				</Stack>

				<Stack spacing={'5'} align={'center'}>
					<Heading>As a Seller</Heading>
					<Flex
						width={variant}
						justify={'center'}
						rounded={'lg'}
						bg={useColorModeValue('white', 'gray.700')}
						boxShadow={'lg'}
						p={5}>
						<CouponTable coupon={sellers?.sellerCoupons} variant={isSmallerThan750} />
					</Flex>
				</Stack>
			</Stack>
		</Flex>
	);
}
