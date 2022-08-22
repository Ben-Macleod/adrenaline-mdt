import { Flex, Input, InputGroup } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as React from 'react';
import LandingLayout from '../components/layouts/landing';

interface GetStartedProps {}

const GetStarted: React.FunctionComponent<GetStartedProps> = ({}) => {
	const { query } = useRouter();
	return <Flex></Flex>;
};

export default GetStarted;
