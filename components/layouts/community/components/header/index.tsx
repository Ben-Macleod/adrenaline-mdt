import * as React from 'react';
import { Container, Flex, Image, Text } from '@chakra-ui/react';

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = ({}) => {
	return (
		<Flex w='full' minH='16' maxH='16' bg='gray.700' px='20'>
			<Flex w='full' align={'center'}>
				<Image
					src='https://i.imgur.com/AHFKtEZ.png'
					w='auto'
					h='80%'
				/>
				<Flex flexDir={'column'} ml='3.5' gap={0.5}>
					<Text
						fontStyle={'italic'}
						color='blue.400'
						lineHeight='none'
					>
						San Andreas
					</Text>
					<Text
						fontWeight={'semibold'}
						lineHeight='none'
						color='gray.200'
					>
						Mobile Data Terminal
					</Text>
				</Flex>
			</Flex>
			<Container
				as={Flex}
				maxW='container.xl'
				minW='container.xl'
				align='center'
				justify='center'
			>
				Middle
			</Container>
			<Flex w='full' justify={'flex-end'} align='center'></Flex>
		</Flex>
	);
};

export default Header;
