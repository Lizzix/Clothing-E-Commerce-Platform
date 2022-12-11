import {
	Flex,
	useColorModeValue,
	Box,
	useMediaQuery,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import ProductDetailCard from '../../components/product-detail-card';
import Loading from '../../components/loading';

export default function ProductPage() {
	const router = useRouter();
	const [isSmallerThan850] = useMediaQuery('(max-width: 850px)');
	const fetcher = async (url: RequestInfo | URL) => fetch(url).then(async response => response.json());
	const url = '/api/products/' + String(router.query.id);
	const {data, isLoading} = useSWR(url, fetcher);

	if (isLoading) {
		return (<Loading />);
	}

	return (
		<Flex direction={{base: 'column', md: 'row'}} justify={'center'} align={'center'} minH={'100vh'} bg={useColorModeValue('gray.100', 'gray.800')}>
			<Box
				maxW={'2xl'}
				rounded={'lg'}
				bg={useColorModeValue('white', 'gray.700')}
				boxShadow={'lg'}
				py={10}
				px={8}>
				<ProductDetailCard item={data?.data} variant={isSmallerThan850}/>
			</Box>
		</Flex>
	);
}
