import { Flex, Input, Spinner, Tag } from '@chakra-ui/react';
import * as React from 'react';
import type { NextPage } from 'next';
import useDebounce from '../lib/hooks/use-debounce';
import useSWR from 'swr';

const Home: NextPage = () => {
	const [stringId, setStringId] = React.useState<string>('');
	const debouncedStringId = useDebounce<typeof stringId>(stringId);

	const { isValidating, data } = useSWR(
		`/api/community?stringId=${debouncedStringId}`
	);

	return (
		<Flex>
			<Input
				value={stringId}
				onChange={(event) => setStringId(event.target.value)}
			/>
			{data && data.isValid ? <Tag>Taken</Tag> : <Tag>Not Taken</Tag>}
			{JSON.stringify(data)}
		</Flex>
	);
};

export default Home;
