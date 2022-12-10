import {Box, Spinner, useColorModeValue} from '@chakra-ui/react';

export default function Loading(prop) {
	return (
		<Box h='100vh' bg={useColorModeValue('gray.100', 'gray.800')}>
			<center>
				<Spinner thickness='3px' size='lg' color='teal.400' />
			</center>
		</Box>
	);
}
