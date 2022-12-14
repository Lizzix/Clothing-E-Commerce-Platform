import {url} from 'node:inspector';
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Image,
	Button,
	Heading,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import {useDispatch} from 'react-redux';
import {
	login,
	updateBuyerCoupons,
	updateSellerCoupons,
	updateUser,
	updateBuyerOrders,
	updateSellerOrders,
} from '../lib/user-slice';
import Launching from '../assets/undraw_launching_re_tomg.svg';

export default function SignIn() {
	const toast = useToast();
	const router = useRouter();
	const dispatch = useDispatch();
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

	const {trigger} = useSWRMutation('api/users/signIn', fetcher);

	async function getUserData() {
		await fetch('api/users/me', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		})
			.then(async response => response.json())
			.then(json => {
				dispatch(updateUser({
					id: json.data.id,
					name: json.data.name,
					email: json.data.email,
					phone: json.data.phone,
				}));
			});
	}

	async function getUserCoupons() {
		await fetch('api/buyers/me/coupons', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		})
			.then(async response => response.json())
			.then(json => {
				dispatch(updateBuyerCoupons({
					buyerCoupons: json.data,
				}));
			});
		await fetch('api/sellers/me/coupons', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		})
			.then(async response => response.json())
			.then(json => {
				dispatch(updateSellerCoupons({
					sellerCoupons: json.data,
				}));
			});
	}

	async function getUserOrders() {
		await fetch('api/buyers/me/orders', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		})
			.then(async response => response.json())
			.then(json => {
				dispatch(updateBuyerOrders({
					buyerOrders: json.data,
				}));
			});
		await fetch('api/sellers/me/orders', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		})
			.then(async response => response.json())
			.then(json => {
				dispatch(updateSellerOrders({
					sellerOrders: json.data,
				}));
			});
	}

	const handleSuccess = async (data: {id: any; name: any; email: any; phone: any; token: any}) => {
		dispatch(
			login({
				id: data.id,
				token: data.token,
			}),
		);
		await getUserData();
		await getUserCoupons();
		await getUserOrders();
		router.push('/');
	};

	const onFormSubmit = async values => {
		await trigger(values, {
			async onSuccess(response) {
				if (response.status === 0) {
					toast({
						description: 'Sign in successfully!',
						status: 'success',
						duration: 5000,
						isClosable: true,
						position: 'bottom',
					});
					await handleSuccess(response.data);
				} else {
					toast({
						description: 'This email address is not registered, or the password is incorrect.',
						status: 'error',
						duration: 5000,
						isClosable: true,
						position: 'bottom',
					});
				}
			},
			onError() {
				toast({
					description: 'Sign in failed! Please try again later.',
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
			<Stack align={'center'} spacing={0} mx={'auto'} minW={'sm'} py={12} px={6}>
				<Heading fontSize={'4xl'}>Sign in</Heading>
				<Image src={Launching.src} alt='launching' boxSize='280px' />
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}>
					<form onSubmit={handleSubmit(onFormSubmit)}>
						<Stack spacing={4} minWidth={'340px'}>
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
							<FormControl id='password' isInvalid={errors?.password?.message?.length === 0}>
								<FormLabel>Password</FormLabel>
								<Input type='password' id='password'
									{...register('password', {
										required: 'required',
										minLength: {value: 5, message: 'Password must be at least 5 characters long'},
									})}/>
							</FormControl>
							<Stack spacing={10}>
								<Stack
									direction={{base: 'column', sm: 'row'}}
									align={'start'}
									justify={'space-between'}>
									<Checkbox>Remember me</Checkbox>
								</Stack>
								<Button
									type='submit'
									mt={5}
									bg={'blue.400'}
									color={'white'}
									_hover={{
										bg: 'blue.500',
									}}
									isLoading={isSubmitting}>
                                Sign in
								</Button>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
}
