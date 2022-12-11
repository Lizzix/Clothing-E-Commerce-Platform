import {
	Flex,
	Image,
	Stack,
	Text,
	Heading,
	Select,
	Button,
	Spacer,
} from '@chakra-ui/react';

export default function OrderItemDetailCard(props) {
	const variant = props.variant;
	const item = props.item;

	return (
		<Flex direction={variant ? 'column' : 'row'} align={variant ? 'center' : 'start'}>
			<Image src={item.picture} alt='item image' boxSize={'350'} mx={'5'}/>
			<Spacer />
			<Stack mx={'5'}>
				<Heading>{item.name}</Heading>
				<Text>NT$ {item.price}</Text>
				<Text>{item.description}</Text>
				<Text>posted on: {item.startAt.split('T')[0]}</Text>
			</Stack>
		</Flex>
	);
}
