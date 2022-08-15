declare namespace Community {
	type communityId = string;
	type relationalId = number;

	// Type for the Community service constructor.
	type CommunityConstructor = {
		communityId?: communityId;
		relationalId?: relationalId;
	};
}
