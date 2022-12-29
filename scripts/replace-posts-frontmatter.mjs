import * as fs from "node:fs";
import matter from "gray-matter";
import { createLogger } from "./lib/logger.mjs";
import posts from "./data/posts-source.json" assert { type: "json" };

const logger = createLogger({ loggerLevel: "info" });

for (const { sourceFilepath, frontmatter } of posts) {
    logger.debug({ sourceFilepath, frontmatter });

    const postMarkdown = fs.readFileSync(sourceFilepath, { encoding: "utf-8" });

    const { content } = matter(postMarkdown);
    const updatedPost = matter.stringify(content, frontmatter);

    logger.debug("\n" + updatedPost);

    fs.writeFileSync(sourceFilepath, updatedPost);

    logger.info(`Updated ${sourceFilepath}`);
}