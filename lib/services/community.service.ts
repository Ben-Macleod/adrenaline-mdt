import { Prisma, PrismaClient } from '@prisma/client';
import ErrorService from './error.service';

class Community {
	communityId?: string;
	private readonly relationalId?: number;
	private readonly db: PrismaClient;

	// Initalize the Community service.
	constructor({
		communityId,
		relationalId,
	}: Community.CommunityConstructor) {
		this.communityId = communityId || undefined;
		this.relationalId = relationalId || undefined;
		this.db = new PrismaClient();
	}

	// Create the new community, does not relay on constructor data.
	create = async (communityId: string, name: string) => {
		const communityData = {
			community_id: communityId,
			name,
		};

		// Create the newCommunity in the database and return what was create.
		const newCommunity = await this.db.system_communities.create({
			data: communityData,
		});

		// If the new commuity or relational id wasn't made throw error.
		if (!newCommunity || !newCommunity.id) {
			const { error } = new ErrorService({ internalCode: '2001' });
			throw error(
				'An error occured while creating new community.',
				'ApiCommunity_PrismaError'
			);
		}

		// Create the new Api access token.
		// Extract this to a token service in the future.
		const communityApiToken = await this.db.system_community_tokens.create(
			{
				data: {
					token_type: 'API_ACCESS',
					token_value: 'New Token Value',
					community_rid: newCommunity.id,
				},
			}
		);

		// Make sure the token generated and was successfully.
		if (!communityApiToken) {
			const { error } = new ErrorService({ internalCode: '2001' });
			throw error(
				'An error occured while generating access token.',
				'ApiCommunity_TokenCreation'
			);
		}

		// Return the new community object after logic executed.
		return {
			accessToken: communityApiToken.token_value,
			community: newCommunity,
		};
	};
}

export default Community;
