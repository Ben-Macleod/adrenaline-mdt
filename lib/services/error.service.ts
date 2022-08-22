interface ErrorType {
	message: string;
	type: string;
	codes: {
		internal: string;
		https: string;
	};
}

class ErrorService {
	httpCode: string;
	internalCode: string;

	constructor({
		httpCode,
		internalCode,
	}: {
		httpCode?: number;
		internalCode?: number | string;
	}) {
		this.httpCode = String(httpCode) || '000';
		this.internalCode = String(internalCode) || '0000';
	}

	/**
	 * Generate a consistent error object across the Api.
	 * @param message Human readable message for the error.
	 * @param eType The type of the error which is optional defaults to null.
	 * @returns Returns an object of the error.
	 */
	error = (message: string, eType?: string): { error: ErrorType } => {
		const errorStruct: ErrorType = {
			message: message,
			type: eType || 'UnknowErrorType',
			codes: {
				https: this.httpCode,
				internal: this.internalCode,
			},
		};

		return { error: errorStruct };
	};
}

export default ErrorService;
