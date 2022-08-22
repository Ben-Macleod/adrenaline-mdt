import { NextApiRequest, NextApiResponse } from 'next';

// Handler for the route `/api/community/:communityId`
const handler = (req: NextApiRequest, res: NextApiResponse) => {
	res.status(200).json({ ...req.query });
};

export default handler;
