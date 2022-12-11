import {
	Flex,
	Image,
	Stack,
	Text,
	Heading,
	TableContainer,
	Table,
	Tr,
	Tbody,
	Td,
	useColorModeValue,
} from '@chakra-ui/react';

export default function ItemBriefCard(props) {
	const variant = props.variant;
	const item = props.item;
	return (
		<Flex direction={variant ? 'column' : 'row'} align={variant ? 'center' : 'start'}
			rounded={'lg'}
			bg={useColorModeValue('white', 'gray.700')}
			boxShadow={'lg'}
			p={3}
			minW={variant ? '380' : '2xl'}
			maxW={variant ? '380' : '2xl'}>
			<Image src={item.picture} alt='item image' minWidth={'150'} maxWidth={'150'} m={5}/>
			<Stack align={'start'} justify={'start'}>
				<Heading pl={'3'} fontSize={'2xl'}>{item.name}</Heading>
				<TableContainer>
					<Table variant={'unstyled'} size={'sm'} width={'inherit'}>
						<Tbody>
							<Tr>
								<Td>price:</Td>
								<Td>NT$ {item.price}</Td>
							</Tr>
							<Tr>
								<Td>amount:</Td>
								<Td>{item.amount}</Td>
							</Tr>
							<Tr>
								<Td>color:</Td>
								<Td>{item.color}</Td>
							</Tr>
							<Tr>
								<Td>size:</Td>
								<Td>{item.size}</Td>
							</Tr>
						</Tbody>
					</Table>
				</TableContainer>
			</Stack>
		</Flex>
	);
}
