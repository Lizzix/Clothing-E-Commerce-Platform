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
	InputGroup,
	Center,
} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import PersonalInformation from '../assets/personal_information.svg';

function handleEditInfo() {
// TODO: 編輯資料功能
}

export default function ProfileInfomation({user}) {
	const [isSmallerThan500] = useMediaQuery('(max-width: 500px)');
	const variant = isSmallerThan500 ? 5 : 5;
	const infoVariant = isSmallerThan500 ? 0 : 5;
	const headingStyle = {
		fontFamily: 'Raleway',
		fontSize: '5em',
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
	// TODO:
	const onFormSubmit = async values => {
		await trigger(values, {
			onSuccess(response) {
				if (response.message === 'user already exists') {
					toast({
						description: 'User already exists!',
						status: 'error',
						duration: 5000,
						isClosable: true,
						position: 'bottom',
					});
				} else {
					toast({
						description: 'Sign up successfully! Redirecting to front page.',
						status: 'success',
						duration: 5000,
						isClosable: true,
						position: 'bottom',
					});
					router.push('/');
				}
			},
			onError() {
				toast({
					description: 'Registration failed! Please try again later.',
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
			<Stack pb='10' align={'start'}>
				<Heading fontSize={'9xl'} style={headingStyle}>
				Hello, {user === null ? 'Username' : user.name}.
				</Heading>
				<Flex
					direction={'row'}
					wrap={'wrap'}
					mt={variant}
					grow='true'>
					<Flex
						align={'start'}
						mt={{sm: '5'}}
						minW='250px'
						rounded={'lg'}
						bg={useColorModeValue('white', 'gray.700')} py={6} px={6}>
						<form onSubmit={ event => {
							event.preventDefault();
							setViewState(!viewState);
						}}>
							<Stack spacing={4} maxWidth={'xs'}>
								<FormControl id='email' isInvalid={errors?.email?.message?.length === 0}>
									<FormLabel>Email address</FormLabel>
									<Input type='email' id='email' placeholder={user?.email} _placeholder={{opacity: 1, color: 'black'}} variant='filled' isInvalid/>
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
						<Image src={PersonalInformation.src} alt='Happy News' boxSize='200px' />
					</Box>
				</Flex>
			</Stack>
		</Center>
	);
}
