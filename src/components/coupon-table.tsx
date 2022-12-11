import {TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Flex,
} from '@chakra-ui/react';
import useSWR from 'swr';

export default function CouponTable(props) {
	const coupons = props.coupon.buyerCoupons;
	const url = props.url;

	return (
		// <TableContainer>
		<Flex></Flex>
	);
}
