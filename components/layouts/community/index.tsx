import { Container, Flex, Text } from '@chakra-ui/react';
import Head from 'next/head';
import * as React from 'react';
import Header from './components/header';

interface CommunityHomepageProps {
	pageTitle?: string;
}

const CommunityHomepage: React.FunctionComponent<
	React.PropsWithChildren<CommunityHomepageProps>
> = ({ children, pageTitle = 'MDT' }) => {
	return (
		<React.Fragment>
			<Head>
				<title>{pageTitle || 'MDT'}</title>
			</Head>
			<Flex flexDir={'column'} w='full' h='100vh'>
				<Header />
				<Container flexGrow={1} maxW='container.xl'>
					{children}
				</Container>
				<Flex w='full' minH='16' bg='gray.700'></Flex>
			</Flex>
		</React.Fragment>
	);
};

export default CommunityHomepage;
