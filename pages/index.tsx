import {
	Button,
	chakra,
	Container,
	Flex,
	Heading,
	Icon,
	IconButton,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Text,
} from '@chakra-ui/react';
import * as React from 'react';
import type { NextPage } from 'next';
import { MdOfflineBolt } from 'react-icons/md';
import Link from 'next/link';
import { FaDiscord, FaGithub, FaSearch } from 'react-icons/fa';
import { BRAND_NAME, LANDING_DESCRIPTION } from '../lib/constants';
import LandingLayout from '../components/layouts/landing';
import HeroText from '../components/landing/hero-text';
import GetStarted from '../components/landing/get-started';

const Home: NextPage = () => {
	return (
		<LandingLayout>
			<Flex
				maxW='container.xl'
				w='full'
				mt='20'
				mx='auto'
				flexDir={'column'}
			>
				<HeroText />
				<Text
					maxW='container.md'
					color='gray.200'
					mt='12'
					fontSize={'xl'}
				>
					{LANDING_DESCRIPTION}
				</Text>
				<GetStarted />
			</Flex>
		</LandingLayout>
	);
};

export default Home;
