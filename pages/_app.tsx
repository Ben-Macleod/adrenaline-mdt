import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

// Style Imports
import '../styles/css/index.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{
				fetcher: (resource, init) =>
					fetch(resource, init).then((res) => res.json()),
			}}
		>
			<ChakraProvider resetCSS theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</SWRConfig>
	);
}

export default MyApp;
