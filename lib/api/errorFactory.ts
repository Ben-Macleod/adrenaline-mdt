const errorFactory = (
	statusCode: number,
	statusMessage = 'An error occured while attemping this action.',
	statusPayload?: any
) => ({ statusCode, statusMessage, ...statusPayload });

export default errorFactory;
