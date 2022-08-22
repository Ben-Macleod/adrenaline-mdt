import * as React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';

interface HeroTextProps {}

const HeroText: React.FunctionComponent<HeroTextProps> = ({}) => {
	return (
		<Flex>
			{' '}
			<Flex flexDir={'column'}>
				<Heading fontSize='7xl'>
					Advanced &{' '}
					<Text
						display={'inline'}
						bgClip='text'
						bgGradient='linear(to-r, blue.500, green.400)'
					>
						Easy to use
					</Text>
				</Heading>
				<Heading fontSize='7xl'>Mobile Data Terminal</Heading>
				<Heading fontSize='7xl'>
					For{' '}
					<Text
						display={'inline'}
						bgClip='text'
						bgGradient='linear(to-r, green.400, blue.500)'
					>
						Fivem Roleplay.
					</Text>
				</Heading>
			</Flex>
		</Flex>
	);
};

export default HeroText;
