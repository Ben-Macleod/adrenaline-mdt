import { Flex, Text } from '@chakra-ui/react';
import { system_communities } from '@prisma/client';
import { useRouter } from 'next/router';
import * as React from 'react';
import useSWR from 'swr';
import CommunityLayout from '../../../components/layouts/community';

interface CommunityHomepageProps {}

const CommunityHomepage: React.FunctionComponent<
	CommunityHomepageProps
> = ({}) => {
	const { query } = useRouter();
	const communityId = query.communityId?.toString();

	const { data } = useSWR<Api.Response<{ community: system_communities }>>(
		`/api/community?communityId=${communityId}`
	);

	return (
		<CommunityLayout pageTitle={data?.data?.community.name || 'MDT'}>
			<pre>
				<Text>{JSON.stringify(data, null, 3)}</Text>
			</pre>
		</CommunityLayout>
	);
};

export default CommunityHomepage;
