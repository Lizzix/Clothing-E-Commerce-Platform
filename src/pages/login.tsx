import {Flex, useColorModeValue} from '@chakra-ui/react';
import SignIn from '../components/signin';
import SignUp from '../components/signup';

export default function Login() {
	return (
		<Flex direction={{base: 'column', md: 'row'}} justify={'center'} align={'center'} minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
			<SignIn />
			<SignUp />
		</Flex>
	);
}
