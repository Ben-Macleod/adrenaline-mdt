import { Prisma, PrismaClient } from "@prisma/client";
import ErrorService from "./error.service";
import TokenService from "./token.service";

class Community {
  communityId?: string;
  private readonly relationalId?: number;
  private readonly db: PrismaClient;

  // Initalize the Community service.
  constructor({ communityId, relationalId }: Community.CommunityConstructor) {
    this.communityId = communityId || undefined;
    this.relationalId = relationalId || undefined;
    this.db = new PrismaClient();
  }

  /**
   * Create a new community and all it's information.
   * @param communityId custom community id created by the user.
   * @param name Name of the new community.
   * @returns The new community along with their api access token.
   */
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
      const { error } = new ErrorService({ internalCode: "2002" });
      throw error(
        "An error occured while creating new community.",
        "ApiCommunity_PrismaError"
      );
    }

    // Create the new Api access token.
    // Extract this to a token service in the future.

    const { createToken } = new TokenService();
    const newToken = await createToken(newCommunity);

    if (!newToken) {
      throw new Error("bruh");
    }

    const communityApiToken = await this.db.system_community_tokens.create({
      data: {
        token_type: "API_ACCESS",
        token_value: newToken.token,
        community_rid: newCommunity.id,
      },
    });

    // Make sure the token generated and was successfully.
    if (!communityApiToken) {
      const { error } = new ErrorService({ internalCode: "2001" });
      throw error(
        "An error occured while generating access token.",
        "ApiCommunity_TokenCreation"
      );
    }

    // Return the new community object after logic executed.
    return {
      accessToken: communityApiToken.token_value,
      community: newCommunity,
    };
  };

  /**
   * Find a community by it's unique 10 character string.
   * @param id Community id of the community it's trying to find.
   * @returns community if it's found if not false.
   */
  getCommunityById = async (id?: string) => {
    // default id to communityId passed in through constructor.
    let _communityId = this.communityId;

    // If id does exist that will trump the default.
    if (id) {
      _communityId = id;
    }

    const community = await this.db.system_communities.findUnique({
      where: {
        community_id: _communityId,
      },
    });

    return community || false;
  };
}

export default Community;
