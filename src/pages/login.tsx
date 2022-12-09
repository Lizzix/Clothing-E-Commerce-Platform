import {Flex, useColorModeValue} from '@chakra-ui/react';
import Layout from '../components/layout';
import SignIn from '../components/signin';
import SignUp from '../components/signup';

export default function Login() {
	return (
		<Layout>
			<Flex direction={{base: 'column', md: 'row'}} justify={'center'} align={'center'} minH={'100vh'} bg={useColorModeValue('gray.100', 'gray.800')}>
				<SignIn />
				<SignUp />
			</Flex>
		</Layout>
	);
}
