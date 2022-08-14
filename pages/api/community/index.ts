import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import ErrorService from '../../../lib/services';
import errorFactory from '../../../lib/services';

const prisma = new PrismaClient();

// Endpoint handler.
const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const method = req.method;

	// Handle which method the incoming request should be directed too.
	switch (method) {
		case 'POST':
			return POST(req, res);
		default:
			console.error('Unknown method reach at [/api/community].');
			throw new Error('Unknow error reached at [/api/community].');
	}
};

// POST handler.
// Contains the logic for generating a new community.

const newCommunitySchema = z.object({
	communityId: z.string().transform((value) => value.toLocaleUpperCase()),
	name: z.string().transform((value) => value.toLocaleLowerCase()),
});

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
	const { communityId, name } = newCommunitySchema.parse(req.body);

	// Reqiure that name & communityId be passed.
	if (!communityId && !name) {
		const { error } = new ErrorService(404, 1004);

		return res
			.status(404)
			.json(
				error(
					'Missing parameters for this request, please fix and resubmit.'
				)
			);
	}

	// Create the new community through prisma.
	const newCommunity = await prisma.system_communities.create({
		data: {
			name,
			community_id: communityId,
		},
	});

	// If there was an error creating the community catch the response here.
	if (!newCommunity) {
		const { error } = new ErrorService(500, 2001);

		return res
			.status(500)
			.json(
				error(
					'An error occured while creating new community, please try again.'
				)
			);
	}

	res.status(200).json({
		isSuccess: Boolean(newCommunity),
		community: { ...newCommunity },
	});
};

export default handler;
