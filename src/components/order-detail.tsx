import {
	Stack,
	HStack,
	Button,
	Heading,
	TableContainer,
	Tbody,
	Tr,
	Td,
	Table,
	Flex,
	Spacer,
	ButtonGroup,
	Box,
} from '@chakra-ui/react';
import ItemBriefCard from './item-brief-card';

export default function OrderDetail(props) {
	const variant = props.variant;
	const order = props.order;

	return (
		<Stack align={'start'} justify={'center'}>
			<Heading>Order #{order.id} detail</Heading>
			<TableContainer>
				<Table variant={'unstyled'} size='sm'>
					<Tbody>
						<Tr key={'status'}>
							<Td>Status:</Td>
							<Td>{order.status}</Td>
						</Tr>
						<Tr key={'price'}>
							<Td>Price:</Td>
							<Td>NT$ {order.totalPrice}</Td>
						</Tr>
						<Tr key={'created-on'}>
							<Td>Created on:</Td>
							<Td>{order.createdAt.split('T')[0]}</Td>
						</Tr>
						<Tr key={'last-update'}>
							<Td>Last Update:</Td>
							<Td>{order.updatedAt.split('T')[0]}</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
			<Flex minWidth='max-content' alignItems='center' gap='4'>
				<Spacer />
				<ButtonGroup gap='1'>
					<Button size={'sm'} colorScheme={'linkedin'}>cancel order</Button>
					<Button size={'sm'} colorScheme={'linkedin'}>refund</Button>
				</ButtonGroup>
			</Flex>
			<Heading py={'2'} fontSize={'2xl'}>Ordered items</Heading>
			{order.items.map(item => (
				<ItemBriefCard item={item} variant={variant} />
			))}
		</Stack>
	);
}
