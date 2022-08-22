import * as React from 'react';
import { Flex, Text, Button, InputGroup, Input } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';

const initialValue = {
	communityName: '',
};

interface GetStartedProps {}

const GetStarted: React.FunctionComponent<GetStartedProps> = ({}) => {
	const { push } = useRouter();

	const onFormSubmit = (
		values: typeof initialValue,
		props: FormikHelpers<typeof initialValue>
	) => {
		if (!values.communityName) {
			props.setErrors({ communityName: 'Community Name is missing.' });
			return;
		}

		push(`/get-started?name=${values.communityName}`);
	};

	return (
		<Flex flexDir={'column'} mt='8' gap={1}>
			<Text fontWeight={'semibold'} fontSize='xl' color='gray.200'>
				Enter community name to get started!
			</Text>
			<Formik initialValues={initialValue} onSubmit={onFormSubmit}>
				{(props) => {
					return (
						<Flex gap={3} as={Form}>
							<InputGroup maxW='container.sm'>
								<Input
									isInvalid={Boolean(
										props.errors.communityName
									)}
									py='7'
									placeholder='Community Name...'
									variant={'filled'}
									fontSize='lg'
									_placeholder={{
										fontSize: 'lg',
									}}
									_focusVisible={{ outline: 'none' }}
									value={props.values.communityName}
									onChange={(e) =>
										props.setFieldValue(
											'communityName',
											e.target.value
										)
									}
								/>
							</InputGroup>
							<Button colorScheme='blue' h='full' type='submit'>
								Get Started
							</Button>
						</Flex>
					);
				}}
			</Formik>
		</Flex>
	);
};

export default GetStarted;
