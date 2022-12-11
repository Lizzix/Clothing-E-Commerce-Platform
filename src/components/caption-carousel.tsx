import React from 'react';
import {
	Box,
	IconButton,
	useBreakpointValue,
	Stack,
	Heading,
	Text,
	Container,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import {BiLeftArrowAlt, BiRightArrowAlt} from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';

// Settings for the slider
const settings = {
	dots: true,
	arrows: false,
	fade: true,
	infinite: true,
	autoplay: true,
	speed: 500,
	autoplaySpeed: 5000,
	slidesToShow: 1,
	slidesToScroll: 1,
};

export default function CaptionCarousel() {
// As we have used custom buttons, we need a reference variable to
// change the state
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
	const [slider, setSlider] = React.useState<Slider | undefined>(null);

	// These are the breakpoints which changes the position of the
	// buttons as the screen size changes
	const top = useBreakpointValue({base: '90%', md: '50%'});
	const side = useBreakpointValue({base: '30%', md: '40px'});

	// This list contains all the data for carousels
	// This can be static or loaded from a server
	const cards = [
		{
			title: '2022 F/W Collection',
			text: 'Do not be into trends. Do not make fashion own you, but you decide what you are, what you want to express by the way you dress and the way to live.',
			image: 'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80',
		},
		{
			title: 'Black Friday',
			text: 'Fashion is the armor to survive the reality of everyday life.',
			image: 'https://images.unsplash.com/photo-1558769132-92e717d613cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
		},
		{
			title: 'Warm Winter',
			text: 'Winter is the time for comfort, for good food and warmth, for the touch of a friendly hand and for a talk beside the fire: it is time for home.',
			image: 'https://plus.unsplash.com/premium_photo-1661741344546-8512cc5e4ca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
		},
	];

	return (
		<Box
			position={'relative'}
			height={'600px'}
			width={'full'}
			overflow={'hidden'}>
			{/* CSS files for react-slick */}
			<link
				rel='stylesheet'
				type='text/css'
				charSet='utf8'
				href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
			/>
			<link
				rel='stylesheet'
				type='text/css'
				href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
			/>
			{/* Left Icon */}
			<IconButton
				aria-label='left-arrow'
				variant='ghost'
				position='absolute'
				left={side}
				top={top}
				transform={'translate(0%, -50%)'}
				zIndex={2}
				onClick={() => slider?.slickPrev()}>
				<BiLeftArrowAlt size='40px' />
			</IconButton>
			{/* Right Icon */}
			<IconButton
				aria-label='right-arrow'
				variant='ghost'
				position='absolute'
				right={side}
				top={top}
				transform={'translate(0%, -50%)'}
				zIndex={2}
				onClick={() => slider?.slickNext()}>
				<BiRightArrowAlt size='40px' />
			</IconButton>
			{/* Slider */}
			<Slider {...settings} ref={slider => {
				setSlider(slider);
			}}>
				{cards.map((card, index) => (
					<Box
						key={index}
						height={'6xl'}
						position='relative'
						backgroundPosition='center'
						backgroundRepeat='no-repeat'
						backgroundSize='cover'
						backgroundImage={`url(${card.image})`}>
						{/* This is the block you need to change, to customize the caption */}
						<Container size='container.lg' height='600px' position='relative'>
							<Stack
								spacing={6}
								w={'full'}
								maxW={'lg'}
								position='absolute'
								top='50%'
								transform='translate(0, -50%)'>
								<Heading fontSize={{base: '3xl', md: '4xl', lg: '5xl'}}>
									{card.title}
								</Heading>
								<Text fontSize={{base: 'md', lg: 'lg'}} color='gray.700'>
									{card.text}
								</Text>
							</Stack>
						</Container>
					</Box>
				))}
			</Slider>
		</Box>
	);
}
