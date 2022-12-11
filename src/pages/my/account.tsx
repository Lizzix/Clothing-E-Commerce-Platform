import {Flex, useColorModeValue} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import ProfileInfomation from '../../components/profile-information';
import {selectUser} from '../../lib/user-slice';

export default function Account() {
	const user = useSelector(selectUser);
	return (
		<Flex direction={{base: 'column', md: 'row'}} justify={'center'} align={'center'} minH={'100vh'} bg={useColorModeValue('gray.100', 'gray.800')}>
			<ProfileInfomation user={user} />
		</Flex>
	);
}
