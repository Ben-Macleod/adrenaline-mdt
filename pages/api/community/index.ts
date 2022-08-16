import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { CommunityService, ErrorService } from "../../../lib/services";

// Endpoint handler.
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  // Handle which method the incoming request should be directed too.
  switch (method) {
    case "GET":
      return GET(req, res);
    case "POST":
      return POST(req, res);
    default:
      console.error("Unknown method reach at [/api/community].");
      throw new Error("Unknow method reached at [/api/community].");
  }
};

// GET handler.
// Handles the logic for getting a community.

const communityGetSchema = z.object({
  communityId: z.string().transform((value) => value.toLocaleUpperCase()),
});

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { communityId } = communityGetSchema.parse(req.query);

  // Return an error if their isn't a community id.
  if (!communityId) {
    const { error } = new ErrorService({ internalCode: "2001" });

    return res
      .status(404)
      .json(error("Could not find a community id to search for."));
  }

  try {
    const { getCommunityById } = new CommunityService({ communityId });
    const community = await getCommunityById();

    // Return an error if the community wasn't found.
    if (!community) {
      const { error } = new ErrorService({ internalCode: "2002" });

      return res
        .status(404)
        .json(
          error(
            "An error occured while finding new community",
            "ApiCommunity_PrismaError"
          )
        );
    }

    res.status(200).json({ data: { community } });
  } catch (error) {
    res.status(500).json({ error });
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
    const { error } = new ErrorService({ internalCode: "2001" });

    return res
      .status(404)
      .json(error("Missing parameters for this request, please fix and resubmit."));
  }

  // Attempt to create new new community.
  // Response with error if one is caught.
  try {
    const { create } = new CommunityService({});
    const newCommunity = await create(communityId, name);

    // Respond the JSON of the new comminty.
    res.status(200).json({
      isSuccess: Boolean(newCommunity),
      data: { ...newCommunity },
    });
  } catch (error: any) {
    res.status(500).json({ isSuccess: false, error });
  }
};

export default handler;
