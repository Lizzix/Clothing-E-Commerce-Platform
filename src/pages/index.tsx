import {Flex, useColorModeValue} from '@chakra-ui/react';

export default function Home() {
	return (
		<Flex direction={{base: 'column', md: 'row'}} justify={'center'} align={'center'} minH={'100vh'} bg={useColorModeValue('gray.100', 'gray.800')}>
			<h1>home</h1>
		</Flex>

	);
}
