declare namespace Api {
	interface Response<T = any> {
		data?: T;
		error?: Api.Error;
	}

	interface Error {
		message: string;
		type: string;
		codes: {
			https: string;
			internal: string;
		};
	}
}
