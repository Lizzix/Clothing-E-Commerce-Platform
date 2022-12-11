import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	InputLeftAddon,
	InputGroup,
	Button,
	Heading,
	Text,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import useSWRMutation from 'swr/mutation';

export default function SignUp() {
	const toast = useToast();
	const router = useRouter();
	type MyInputTypes = {
		name: string;
		email: string;
		phone: string;
		password: string;
	};
	const {
		handleSubmit,
		register,
		formState: {errors, isSubmitting},
	} = useForm<MyInputTypes>();

	async function fetcher(url: string, data: any) {
		return fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data.arg),
		}).then(async response => response.json());
	}

	const {trigger} = useSWRMutation('api/users', fetcher);

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
		<Flex
			align={'center'}
			justify={'center'}
			mx={'10'}>
			<Stack spacing={8} mx={'auto'} maxW={'sm'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Create an account</Heading>
					<Text align={'center'} fontSize={'lg'} color={'gray.600'}>
					to check out faster & keep track of your orders ✌️
					</Text>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}>
					<form onSubmit={handleSubmit(onFormSubmit)}>
						<Stack spacing={4} minWidth={'340px'}>
							<FormControl id='name' isInvalid={errors?.name?.message?.length === 0}>
								<FormLabel>Name</FormLabel>
								<Input type='text' id='name'
									{...register('name', {
										required: 'required',
										minLength: {value: 3, message: 'Name must be at least 3 characters long'},
									})}/>
							</FormControl>
							<FormControl id='email' isInvalid={errors?.email?.message?.length === 0}>
								<FormLabel>Email address</FormLabel>
								<Input type='email' id='email'
									{...register('email', {
										required: 'required',
										pattern: {
											value: /^[\w.%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/i,
											message: 'Invalid email address',
										},
									})} />
							</FormControl>
							<FormControl id='phone' isInvalid={errors?.phone?.message?.length === 0}>
								<FormLabel>Phone</FormLabel>
								<InputGroup>
									<InputLeftAddon children='+886' />
									<Input type='number' id='phone'
										{...register('phone', {
											required: 'required',
											minLength: {value: 9, message: 'Invalid phone number'},
											maxLength: {value: 10, message: 'Invalid phone number'},
										})}/>
								</InputGroup>
							</FormControl>
							<FormControl id='password' isInvalid={errors?.password?.message?.length === 0}>
								<FormLabel>Password</FormLabel>
								<Input type='password' id='password'
									{...register('password', {
										required: 'required',
										minLength: {value: 5, message: 'Password must be at least 5 characters long'},
									})}/>
							</FormControl>
							<Stack spacing={10}>
								<Button
									type='submit'
									mt={5}
									bg={'blue.400'}
									color={'white'}
									_hover={{
										bg: 'blue.500',
									}}
									isLoading={isSubmitting}>
								Sign up
								</Button>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
}
