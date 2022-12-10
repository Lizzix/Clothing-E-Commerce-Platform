import {
	Stack,
	Flex,
	Text,
	Heading,
	Image,
	Center,
	Button,
	Link,
	useColorModeValue} from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import Lost from '../assets/undraw_faq_re_31cw.svg';

export default function Custom404() {
	const headingStyle = {
		fontSize: '6xl',
		fontWeight: 'bold',
	};

	return (
		<Flex
			pt={20}
			minH={'100vh'}
			align={'begin'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}>
			<Stack>
				<Stack spacing={1} align={'center'}>
					<Heading style={headingStyle}>404</Heading>
					<Text>This page could not be found.</Text>
				</Stack>
				<Stack>
					<Center>
						<Image src={Lost.src} alt='Page Not Found' boxSize='300px' />
					</Center>
					<Button bg={'blue.400'} _hover={{bg: 'blue.500'}} as={NextLink} href='/'>Go to front page</Button>
				</Stack>
			</Stack>
		</Flex>
	);
}
