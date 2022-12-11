import {
	Flex,
	Image,
	Stack,
	Text,
	Heading,
	Select,
	Button,
} from '@chakra-ui/react';

export default function ItemDetailCard(props) {
	const variant = props.variant;
	const item = props.item;
	const variation = item?.inventories;
	return (
		<Flex direction={variant ? 'column' : 'row'} align={variant ? 'center' : 'start'}>
			<Image src={item.picture} alt='item image' boxSize={'xs'} m={5}/>
			<Stack>
				<Heading>{item.name}</Heading>
				<Text>NT$ {item.price}</Text>
				<Text>{item.description}</Text>
				{item.availible ? (
					<>
						<Text whiteSpace={'nowrap'}>In stock</Text>
						<Flex direction={'row'} align={'center'} justify={'start'}>
							<Select placeholder='option' size={'sm'} maxWidth={'200'}>
								{variation.map(v => (
									<option value={v.id}>{v.color}, {v.size}</option>
								))}
							</Select>
							<Button
								ml={'3'}
								size={'sm'}
								type='submit'
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}>add to cart</Button>
						</Flex>
					</>
				) : (
					<Text>Out of stock</Text>
				)}

				<Text>post date: {item.startAt.split('T')[0]}</Text>
			</Stack>
		</Flex>
	);
}
