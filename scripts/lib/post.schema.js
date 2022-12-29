export const postSchema = {
    type: "object",
    // TODO: Make all properties required
    required: ["published"],
    properties: {
        published: {
        type: "string"
        // TODO: Add regex
        },
        lastUpdated: {
        type: "string"
        // TODO: Add regex
        },
        slug: {
        type: "string"
        // TODO: Add regex
        },
        blogUrl: {
        type: "string"
        // TODO: Add "format": "url"
        },
        twitterUrl: {
        type: "string"
        // TODO: Add "format": "url"
        },
        devToUrl: {
        type: "string"
        // TODO: Add "format": "url"
        },
        redditUrl: {
        type: "string"
        // TODO: Add "format": "url"
        },
        tags: {
        type: "array",
        items: {
            type: "string",
            // TODO: Add regex
        }
        },
        description: {
        type: "string"
        },
        // openGraphImage: {
        //   type: "string"
        // },
        // notes: {
        //   type: "array",
        //   items: {
        //     type: "string"
        //   }
        // },
    },
    additionalProperties: false,
};