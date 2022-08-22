import * as React from 'react';
import Link from 'next/link';

// Chakra Imports
import {
	Box,
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

// Icons
import { FaDiscord, FaGithub, FaSearch } from 'react-icons/fa';
import { MdOfflineBolt } from 'react-icons/md';
import { BRAND_NAME } from '../../../lib/constants';

interface LandingLayoutProps {}

const LandingLayout: React.FunctionComponent<
	React.PropsWithChildren<LandingLayoutProps>
> = ({ children }) => {
	return (
		<Flex flexDir={'column'} w='100vw' h='100vh' px='6'>
			<Flex as='nav' align={'center'}>
				<Link href={'/'}>
					<Flex
						w='full'
						h='16'
						align={'center'}
						gap={2}
						cursor='pointer'
					>
						<Icon
							as={MdOfflineBolt}
							color='blue.400'
							fontSize={'3xl'}
						/>
						<Text
							fontSize={'xl'}
							lineHeight='none'
							fontWeight={'semibold'}
						>
							{BRAND_NAME} MDT
						</Text>
					</Flex>
				</Link>
				<Container
					as={Flex}
					maxW='container.md'
					h='full'
					justify='center'
					align='center'
				>
					<Flex
						bg='blackAlpha.400'
						p='2'
						px='3.5'
						w='xs'
						align={'center'}
						rounded='md'
						color='gray.200'
						cursor={'pointer'}
					>
						<Icon as={FaSearch} mr='4' />
						<Text fontWeight={'semibold'}>
							Search Community...
						</Text>
					</Flex>
				</Container>
				<Flex
					gap={2}
					w='full'
					h='full'
					justify={'flex-end'}
					align='center'
				>
					<IconButton
						as='a'
						aria-label='discord-link'
						icon={<FaDiscord />}
						fontSize='md'
						size='sm'
						variant={'ghost'}
						href={process.env.DISCORD_LINK}
						target='_blank'
						rel='noreferrer'
					/>
					<IconButton
						as='a'
						aria-label='discord-link'
						icon={<FaGithub />}
						fontSize='md'
						size='sm'
						variant={'ghost'}
						href={process.env.GITHUB_LINK}
						target='_blank'
						rel='noreferrer'
					/>
				</Flex>
			</Flex>
			{children}
		</Flex>
	);
};

export default LandingLayout;
