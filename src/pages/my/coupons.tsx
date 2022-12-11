import {Stack, useColorModeValue, Heading} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import CouponTable from '../../components/coupon-table';
import {selectUser, selectCoupons} from '../../lib/user-slice';

export default function Coupons() {
	const user = useSelector(selectUser);
	const {sellers, buyers} = useSelector(selectCoupons);

	return (
		<Stack direction={'column'} justify={'center'} align={'center'} minH={'100vh'} bg={useColorModeValue('gray.100', 'gray.800')}>
			<Heading>As a Buyer</Heading>
			<CouponTable coupon={buyers} url={'api/buyers/me/coupons'} />
			<Heading>As a Seller</Heading>
			{/* <CouponTable coupon={sellers} /> */}
		</Stack>
	);
}
