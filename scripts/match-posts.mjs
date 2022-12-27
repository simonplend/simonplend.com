import { createLogger } from "./lib/logger.mjs";

import postsSource from "./data/posts-source.json" assert { type: "json" };
import postsLive from "./data/posts-live.json" assert { type: "json" };

const logger = createLogger({ loggerLevel: "info" });

const postsLiveUrls = postsLive.map((post) => post.url);
// logger.info(postsLiveUrls);
logger.info(`Live posts count: ${postsLiveUrls.length}`);

const postsSourceUrls = postsSource.map((post) => post.url).filter(url => url);
// logger.info(postsSourceUrls);
logger.info(`Source posts count: ${postsSourceUrls.length}`);

const sourcePostNotFound = postsLiveUrls.filter(liveUrl => !postsSourceUrls.includes(liveUrl));
logger.info("Live posts with source posts not found:\n\n" + sourcePostNotFound.join("\n"));

const livePostNotFound = postsSourceUrls.filter(liveUrl => !postsLiveUrls.includes(liveUrl));
logger.info("Source posts with live posts not found:\n\n" + livePostNotFound.join("\n"));