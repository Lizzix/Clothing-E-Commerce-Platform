import {
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Td,
	Tbody,
} from '@chakra-ui/react';

export default function CouponTable(props) {
	const coupons = props.coupons;
	if (props.variant) {
		return (
			<TableContainer>
				<Table variant='simple' minWidth={'330px'}>
					{coupons?.map(coupon => (
						<>
							<Thead>
								<Tr key={String(coupon.name) + '-body'}>
									<Th fontSize={'md'} bgColor={'gray.100'}>{coupon.name}</Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr key={String(coupon.type) + '-body'}>
									<Td>{coupon.type}</Td>
								</Tr>
								<Tr key={String(coupon.scope) + '-body'}>
									<Td>{coupon.scope}</Td>
								</Tr>
								<Tr key={String(coupon.endAt) + '-body'}>
									<Td>{coupon.endAt.split('T')[0]}</Td>
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
					<Tr key={'head'}>
						<Th fontSize={'sm'} bgColor={'gray.100'}>Name</Th>
						<Th fontSize={'sm'} bgColor={'gray.100'}>Type</Th>
						<Th fontSize={'sm'} bgColor={'gray.100'}>Scope</Th>
						<Th fontSize={'sm'} bgColor={'gray.100'}>Expiry Date</Th>
					</Tr>
				</Thead>
				<Tbody>
					{coupons?.map(coupon => (
						<Tr key={coupon.id}>
							<Td fontSize={'sm'}>{coupon.name}</Td>
							<Td fontSize={'sm'}>{coupon.type}</Td>
							<Td fontSize={'sm'}>{coupon.scope}</Td>
							<Td fontSize={'sm'}>{coupon.endAt.split('T')[0]}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
