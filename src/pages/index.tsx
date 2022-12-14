import {
	Flex,
	useColorModeValue,
	Stack,
	Heading,
	Icon,
} from '@chakra-ui/react';
import useSWR from 'swr';
import {GiSpaceship} from 'react-icons/gi';
import CaptionCarousel from '../components/caption-carousel';
import Footer from '../components/footer';
import ProductCard from '../components/product-card';
import Loading from '../components/loading';

export default function Home() {
	const fetcher = async (url: RequestInfo | URL) => fetch(url).then(async response => response.json());
	const {data, isLoading} = useSWR('/api/products/all', fetcher);
	const products = data?.data;
	if (isLoading) {
		return (<Loading />);
	}

	return (
		<Flex direction={'column'} align={'center'} minH={'100vh'} bg={useColorModeValue('gray.100', 'gray.800')}>
			<CaptionCarousel />
			<Stack align={'center'} pt={'10'} pb={'20'} spacing={'5'}>
				<Icon as={GiSpaceship} boxSize={6} />
				<Heading as='ins'>New Arrival</Heading>
				<Flex align={'start'} justify={'center'} flexWrap={'wrap'}>
					{products?.map(product => (<ProductCard product={product} />))}
				</Flex>
				<Icon as={GiSpaceship} boxSize={6} />
				<Heading as='ins'>Best Selling</Heading>
				<Flex align={'start'} justify={'center'} flexWrap={'wrap'}>
					{products?.map(product => (<ProductCard product={product} />))}
				</Flex>
				<Icon as={GiSpaceship} boxSize={6} />
				<Heading as='ins'>Fresh Restocks</Heading>
				<Flex align={'start'} justify={'center'} flexWrap={'wrap'}>
					{products?.map(product => (<ProductCard product={product} />))}
				</Flex>
			</Stack>
			<Footer />
		</Flex>
	);
}
