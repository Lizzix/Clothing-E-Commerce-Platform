import {
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Link,
} from '@chakra-ui/react';

export default function OrderTable(props) {
	const orders = props.orders;
	if (props.variant) {
		return (
			<TableContainer>
				<Table variant='simple' minWidth={'330px'}>
					{orders?.map(order => (
						<>
							<Thead>
								<Tr key={order.id}>
									<Th fontSize={'md'} bgColor={'gray.100'}>Order #{order.id}</Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr key={String(order.id) + '-body'}>
									<Th>NT$ {order.totalPrice}</Th>
								</Tr>
								<Tr key={String(order.status) + '-body'}>
									<Th>{order.status}</Th>
								</Tr>
								<Tr key={String(order.updatedAt) + '-body'}>
									<Th>{order.updatedAt.split('T')[0]}</Th>
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
			<Table variant='simple' minWidth={'lg'}>
				<Thead>
					<Tr key={'table-head'}>
						<Th fontSize={'sm'} bgColor={'gray.100'}>Detail</Th>
						<Th fontSize={'sm'} bgColor={'gray.100'}>Price</Th>
						<Th fontSize={'sm'} bgColor={'gray.100'}>Status</Th>
						<Th fontSize={'sm'} bgColor={'gray.100'}>Last Update</Th>
					</Tr>
				</Thead>
				<Tbody>
					{orders?.map(order => (
						<Tr key={order.id}>
							<Td fontSize={'sm'}><Link href={'/order/' + String(order.id)}>Click Me</Link></Td>
							<Td fontSize={'sm'}>NT$ {order.totalPrice}</Td>
							<Td fontSize={'sm'}>{order.status}</Td>
							<Td fontSize={'sm'}>{order.updatedAt.split('T')[0]}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
