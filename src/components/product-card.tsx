import {
	Card,
	CardBody,
	Heading,
	Image,
	Flex,
	Button,
	Link,
	Text,
	Center,
	Spacer,
	CardFooter,
} from '@chakra-ui/react';

export default function ProductCard(props) {
	const product = props.product;
	return (
		<Card mx={'2'} my={'5'} bg={'white'} maxW={'350'} minW={'350'} maxH={'sm'} minH={'sm'} shadow={'lg'}>
			<CardBody>
				<Center>
					<Image src={product.picture} alt={product.name} borderRadius={'md'} boxSize={'200'}/>
				</Center>
				<Flex direction={'column'} pt={'4'} minH={'230'}>
					<Heading size='md'><Link href={'/product/' + String(product.id)}>{product.name}</Link></Heading>
					<Spacer />
					<Flex direction={'row'}>
						<Text color='blue.600' fontSize='2xl'>NT${product.price}</Text>
						<Spacer />
						<Button size={'sm'} colorScheme='blue'>Add to cart</Button>
					</Flex>
				</Flex>
			</CardBody>
			<CardFooter>
			</CardFooter>
		</Card>
	);
}
