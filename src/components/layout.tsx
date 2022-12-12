import React, {useCallback, type MouseEventHandler, useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Icon,
	Link,
	Image,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
	useToast,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	Center,
	Avatar,

} from '@chakra-ui/react';
import {
	HamburgerIcon,
	CloseIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	Search2Icon,
} from '@chakra-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {FaUserAstronaut} from 'react-icons/fa';
import {RiShoppingBag3Fill, RiCoupon3Fill, RiLogoutBoxFill} from 'react-icons/ri';
import {logout, selectUser, selectLoggedIn} from '../lib/user-slice';
import Logo from '../assets/logo.png';

type Props = {
	onToggle?: MouseEventHandler;
};

export default function Layout(props) {
	const {isOpen, onToggle} = useDisclosure();
	const toast = useToast();
	const router = useRouter();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const login_state = useSelector(selectLoggedIn);
	const [isLoggedin, setLoggedin] = useState(login_state);
	useEffect(() => {
		setLoggedin(login_state);
	}, [login_state]);

	const handleAccountPage = useCallback(
		async () => router.push('/my/account'),
		[router],
	);
	const handleOrderPage = useCallback(
		async () => router.push('/my/orders'),
		[router],
	);
	const handleCouponPage = useCallback(
		async () => router.push('/my/coupons'),
		[router],
	);

	const handleLogout = async () => {
		dispatch(logout());
		toast({
			description: 'Logged out successfully.',
			status: 'info',
			duration: 3000,
			isClosable: true,
			position: 'bottom',
		});
		await router.push('/');
	};

	let menu: JSX.Element;
	if (props.auth) {
		menu = (
			<ul className='navbar-nav me-auto mb-2 mb-md-0'>
				<li className='nav-item'>
					<a href='#' className='nav-link active' onClick={handleLogout}>Logout</a>
				</li>
			</ul>
		);
	} else {
		menu = (
			<ul className='navbar-nav me-auto mb-2 mb-md-0'>
				<li className='nav-item'>
					<Link href='/login'>
						<a className='nav-link active'>Login</a>
					</Link>
				</li>
				<li className='nav-item'>
					<Link href='/register'>
						<a className='nav-link active'>Register</a>
					</Link>
				</li>
			</ul>
		);
	}

	return (
		<>
			<Box>
				<Flex
					bg={useColorModeValue('white', 'gray.800')}
					color={useColorModeValue('gray.600', 'white')}
					minH={'60px'}
					py={{base: 2}}
					px={{base: 4}}
					borderBottom={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.900')}
					align={'center'}>
					<Flex
						flex={{base: 1, md: 'auto'}}
						ml={{base: -2}}
						display={{base: 'flex', md: 'none'}}>
						<IconButton
							onClick={onToggle}
							icon={
								isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
							}
							variant={'ghost'}
							aria-label={'Toggle Navigation'}
						/>
					</Flex>
					<Flex display={{base: 'flex', md: 'none'}}>
						<Image src={Logo.src} alt='logo of cozy space' />
					</Flex>
					<Flex flex={{base: 1}} align='center' justify={{base: 'center', md: 'start'}}>
						<Link
							href='/'
							className='navbar-logo'
							textAlign={useBreakpointValue({base: 'center', md: 'left'})}
							fontFamily={'heading'}
							color={useColorModeValue('gray.800', 'white')}
							display={{base: 'none', md: 'flex'}}>
							&lt;Cozy Space /&gt;
						</Link>
						<Flex display={{base: 'none', md: 'flex'}} ml={10}>
							<DesktopNav />
						</Flex>
					</Flex>

					<Stack
						direction={'row'}
						display={{base: 'none', md: 'flex'}}
						flex={{base: 1, md: 0}}
						justify={'flex-end'}>
							//TODO: search
						<IconButton icon={<Search2Icon />} variant={'ghost'} aria-label={'Search database'} />
						{user ? (
							<Flex>
								<Menu>
									<MenuButton
										as={Button}
										rounded={'full'}
										variant={'link'}
										cursor={'pointer'}
										minW={0}>
										<Avatar size={'xs'} bg='gray.400'/>
									</MenuButton>
									<MenuList alignContent={'center'}>
										<Center >{user === null ? 'Username' : ('Hi, ' + String(user.name) + '!')}</Center>
										<MenuDivider />
										<MenuItem icon={<FaUserAstronaut />} onClick={handleAccountPage}>My Account</MenuItem>
										<MenuItem icon={<RiShoppingBag3Fill />} onClick={handleOrderPage}>My Orders</MenuItem>
										<MenuItem icon={<RiCoupon3Fill />} onClick={handleCouponPage}>My Coupons</MenuItem>
										<MenuItem icon={<RiLogoutBoxFill />} onClick={handleLogout}>Logout</MenuItem>
									</MenuList>
								</Menu>
							</Flex>
						) : (
							<Button
								as={'a'}
								fontSize={'sm'}
								fontWeight={400}
								variant={'link'}
								href={'/login'}>
								{/* CHECK: handle routing on upper level */}
							Sign In
							</Button>
						)}
					</Stack>
				</Flex>

				<Collapse in={isOpen} animateOpacity>
					<MobileNav isLoggedin={isLoggedin} />
				</Collapse>
			</Box>
			<main className='form-signin'>
				{props.children}
			</main>
		</>
	);
}

const DesktopNav = () => {
	const linkColor = useColorModeValue('gray.600', 'gray.200');
	const linkHoverColor = useColorModeValue('gray.800', 'white');
	const popoverContentBgColor = useColorModeValue('white', 'gray.800');

	return (
		<Stack direction={'row'} spacing={4}>
			{NAV_ITEMS.map(navItem => (
				<Box key={navItem.label}>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							<Link
								p={2}
								href={navItem.href ?? '#'}
								fontSize={'sm'}
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: 'none',
									color: linkHoverColor,
								}}>
								{navItem.label}
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={'xl'}
								bg={popoverContentBgColor}
								p={4}
								rounded={'xl'}
								minW={'sm'}>
								<Stack>
									{navItem.children.map(child => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({label, href, subLabel}: NavItem) => (
	<Link
		href={href}
		role={'group'}
		display={'block'}
		p={2}
		rounded={'md'}
		_hover={{bg: useColorModeValue('pink.50', 'gray.900')}}>
		<Stack direction={'row'} align={'center'}>
			<Box>
				<Text
					transition={'all .3s ease'}
					_groupHover={{color: 'pink.400'}}
					fontWeight={500}>
					{label}
				</Text>
				<Text fontSize={'sm'}>{subLabel}</Text>
			</Box>
			<Flex
				transition={'all .3s ease'}
				transform={'translateX(-10px)'}
				opacity={0}
				_groupHover={{opacity: '100%', transform: 'translateX(0)'}}
				justify={'flex-end'}
				align={'center'}
				flex={1}>
				<Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
			</Flex>
		</Stack>
	</Link>
);
const UserMobileNavItem: NavItem[] = [
	{
		label: 'My',
		children: [
			{
				label: 'My Account',
				href: '/my/account',
			},
			{
				label: 'My Orders',
				href: '/my/orders',
			},
			{
				label: 'My Coupons',
				href: '/my/coupons',
			},
		]},
	{
		label: 'Logout',
		href: '/',
	},
];

function MobileNav(props) {
	const {isLoggedin} = props;
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.800')}
			p={4}
			display={{md: 'none'}}>
			{NAV_ITEMS.map(navItem => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
			{
				(isLoggedin) ? (
					UserMobileNavItem.map(navItem => (
						<MobileNavItem key={navItem.label} {...navItem} />))
				) : (
					<MobileNavItem key='signin' label='Sign in' href='/login' />
				)
			}
		</Stack>
	);
}

const MobileNavItem = ({label, children, href}: NavItem) => {
	const {isOpen, onToggle} = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={Link}
				href={href ?? '#'}
				justify={'space-between'}
				align={'center'}
				_hover={{
					textDecoration: 'none',
				}}>
				<Text
					fontWeight={600}
					color={useColorModeValue('gray.600', 'gray.200')}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={'all .25s ease-in-out'}
						transform={isOpen ? 'rotate(180deg)' : ''}
						w={6}
						h={6}/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{marginTop: '0!important'}}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align={'start'}>
					{children?.map(child => (
						<Link key={child.label} py={2} href={child.href}>
							{child.label}
						</Link>
					))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

type NavItem = {
	label: string;
	subLabel?: string;
	children?: NavItem[];
	href?: string;
};

// TODO: navbar items
const NAV_ITEMS: NavItem[] = [
	{
		label: 'What\'s New',
		children: [
			{
				label: 'Explore Design Work',
				subLabel: 'Trending Design to inspire you',
				href: '#',
			},
			{
				label: 'New & Noteworthy',
				subLabel: 'Up-and-coming Designers',
				href: '#',
			},
		],
	},
	{
		label: 'Clothing',
		children: [
			{
				label: 'Hot Right Now',
				subLabel: 'Find your dream outfit',
				href: '#',
			},
			{
				label: 'Exclusive Collection',
				subLabel: 'An exclusive list for cool kids like you',
				href: '#',
			},
		],
	},
	{
		label: 'Coupon',
		href: '#',
	},
	{
		label: 'Sale',
		href: '#',
	},
];
