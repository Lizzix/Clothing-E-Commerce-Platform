import {
	Heading,
	Image,
	Stack,
	Box,
	Flex,
	useColorModeValue,
	useMediaQuery,
	Button,
	FormControl,
	FormLabel,
	Input,
	useToast,
	Text,
	Center,
} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import Reading from '../assets/undraw_reading_time_re_phf7.svg';

export default function ProfileInfomation({user}) {
	const [isSmallerThan500] = useMediaQuery('(max-width: 500px)');
	const infoVariant = isSmallerThan500 ? 5 : 0;
	const headingStyle = {
		fontFamily: 'Raleway',
		fontSize: '4em',
		fontWeight: 'bold',
	};
	const toast = useToast();
	const router = useRouter();
	type MyInputTypes = {
		name: string;
		email: string;
		phone: string;
	};
	const {
		handleSubmit,
		register,
		formState: {errors, isSubmitting},
	} = useForm<MyInputTypes>();
	const [viewState, setViewState] = useState(true);

	async function fetcher(url: string, data: any) {
		return fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data.arg),
		}).then(async response => response.json());
	}

	const {trigger} = useSWRMutation('api/users/me', fetcher);
	// TODO: Add Info useEffect
	const onFormSubmit = async values => {
		await trigger(values, {
			onSuccess(response) {
				if (response.message === 'success') {
					toast({
						description: 'Update successfully!',
						status: 'success',
						duration: 5000,
						isClosable: true,
						position: 'bottom',
					});
					router.push('/my/account');
				}
			},
			onError() {
				toast({
					description: 'Update failed! Please try again later.',
					status: 'error',
					duration: 5000,
					isClosable: true,
					position: 'bottom',
				});
			},
		});
	};

	return (
		<Center>
			<Stack py='10' align={{base: 'center', md: 'start'}} mx={infoVariant}>
				<Heading style={headingStyle}>
				Hello, {user === null ? 'Username' : user.name}.
				</Heading>
				<Text>Travel, explore, or just enjoy your life in <Text as='mark' bgColor={'yellow.200'} fontFamily={'Raleway'}><i>&lt;Cozy Space /&gt;.</i></Text></Text>

				<Flex
					direction={'row'}
					wrap={'wrap'}
					mt={5}
					justifyContent={{base: 'center', md: 'start'}}
					grow='true'>
					<Flex
						align={{base: 'center', md: 'start'}}
						mt={{sm: '5'}}
						minW='250px'
						rounded={'lg'}
						bg={useColorModeValue('white', 'gray.700')} py={6} px={6}>
						<form onSubmit={ event => {
							event.preventDefault();
							setViewState(!viewState);
							if (viewState) {
								handleSubmit(onFormSubmit);
							}
						}}>
							<Stack spacing={4} maxWidth={'xs'}>
								<FormControl id='email' isInvalid={errors?.email?.message?.length === 0}>
									<FormLabel>Email address</FormLabel>
									<Input type='email' id='email' placeholder={user?.email} _placeholder={{opacity: 1, color: 'black'}} variant='filled' isDisabled/>
								</FormControl>
								<FormControl id='name' isInvalid={errors?.name?.message?.length === 0}>
									<FormLabel>Name</FormLabel>
									<Input type='text' id='name' placeholder={user?.name} _placeholder={{opacity: 1, color: 'black'}} variant='filled' isDisabled={viewState}
										{...register('name', {
											required: 'required',
											minLength: {value: 3, message: 'Name must be at least 3 characters long'},
										})}/>
								</FormControl>
								<FormControl id='phone' isInvalid={errors?.phone?.message?.length === 0}>
									<FormLabel>Phone</FormLabel>
									<Input type='number' id='phone' placeholder={user?.phone} _placeholder={{opacity: 1, color: 'black'}} variant='filled' isDisabled={viewState}
										{...register('phone', {
											required: 'required',
											minLength: {value: 10, message: 'Invalid phone number'},
											maxLength: {value: 10, message: 'Invalid phone number'},
										})}/>
								</FormControl>
								<Stack spacing={10}>
									<Button
										type='submit'
										mt={5}
										bg={viewState ? 'blue.400' : 'pink.300'}
										color={'white'}
										_hover={
											viewState ? {
												bg: 'blue.500',
											} : {
												bg: 'pink.400',
											}}
										isLoading={isSubmitting}>
										{viewState ? 'Edit' : 'Save'}
									</Button>
								</Stack>
							</Stack>
						</form>
					</Flex>
					<Box>
						<Image src={Reading.src} alt='enjoy yourlife' boxSize='sm' />
					</Box>
				</Flex>
			</Stack>
		</Center>
	);
}
