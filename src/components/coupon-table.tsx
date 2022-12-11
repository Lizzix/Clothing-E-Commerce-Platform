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
	const coupons = props.coupon;
	if (props.variant) {
		return (
			<TableContainer>
				<Table variant='simple' minWidth={'330px'}>
					{coupons.map(coupon => (
						<>
							<Thead>
								<Tr key={coupon.id}>
									<Th fontSize={'md'} bgColor={'gray.100'}>{coupon.name}</Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr>
									<Th>{coupon.type}</Th>
								</Tr>
								<Tr>
									<Th>{coupon.scope}</Th>
								</Tr>
								<Tr>
									<Th>{coupon.endAt.split('T')[0]}</Th>
								</Tr>
							</Tbody>
						</>
					))}
				</Table>
			</TableContainer>
		);
	}

	return (
		<TableContainer>
			<Table variant='simple'>
				<Thead>
					<Tr>
						<Th fontSize={'sm'} bgColor={'gray.100'}>Coupon Name</Th>
						<Th fontSize={'sm'} bgColor={'gray.100'}>Type</Th>
						<Th fontSize={'sm'} bgColor={'gray.100'}>Scope</Th>
						<Th fontSize={'sm'} bgColor={'gray.100'}>Expiry Date</Th>
					</Tr>
				</Thead>
				<Tbody>
					{coupons.map(coupon => (
						<Tr key={coupon.id}>
							<Th>{coupon.name}</Th>
							<Th>{coupon.type}</Th>
							<Th>{coupon.scope}</Th>
							<Th>{coupon.endAt.split('T')[0]}</Th>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
