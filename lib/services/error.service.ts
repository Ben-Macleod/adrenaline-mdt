class ErrorService {
	httpCode: number;
	internalCode: number;

	constructor(httpCode: number, internalCode: number) {
		this.httpCode = httpCode;
		this.internalCode = internalCode;
	}

	/**
	 * Generate a consistent error object across the Api.
	 * @param message Human readable message for the error.
	 * @param eType The type of the error which is optional defaults to null.
	 * @returns Returns an object of the error.
	 */
	error = (message: string, eType?: string) => {
		return {
			error: {
				httpsCode: this.httpCode,
				code: this.internalCode,
				message: message,
				type: eType || null,
			},
		};
	};
}

export default ErrorService;
