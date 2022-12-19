import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:os";
import { parseArgs } from "node:util";

import glob from "glob";
import matter from 'gray-matter';
import pino from "pino";

const options = parseArgs({
  options: {
    debug: {
      type: "boolean"
    },
    quiet: {
      type: "boolean"
    },
    out: {
      type: "string",
      default: "./posts.json"
    }
  }
}).values;

let loggerLevel = "info";
if (options.debug) {
  loggerLevel = "debug";
}
if (options.quiet) {
  loggerLevel = "silent";
}

const logger = pino({
  level: loggerLevel,
  transport: {
    target: "pino-pretty",
    options: {
      ignore: "time,pid,hostname",
    }
  }
});

const obsidianNotesDirPath = `${os.homedir()}/Documents/Notes`;

const globPatterns = [
    "Blog posts/Published/*.md",
    "Quick Tips/Published/*.md",
    // TODO: Re-enable once I've manually fixed frontmatter
    // "Whats new in Node.js core/Features/**/Blog\ post.md",
];

logger.info("Posts found:");

let postFilepaths = [];
for (const pattern of globPatterns) {
  const fullPattern = `${obsidianNotesDirPath}/${pattern}`;
  logger.debug({ fullPattern });
  const filepaths = glob.sync(fullPattern);
  postFilepaths = [...postFilepaths, ...filepaths];
  
  logger.info(`- ${pattern}: ${filepaths.length}`);
}

logger.info(`Total posts: ${postFilepaths.length}\n`);

logger.debug({ postFilepaths });

const posts = [];
let foundFrontmatterKeys = [];
const failedPosts = [];
for (const filepath of postFilepaths) {
  const postMarkdown = fs.readFileSync(filepath, { encoding: "utf-8" });
  // console.log({ postMarkdown });

  try {
    const rawFrontmatter = matter(postMarkdown).data;

    // Front matter that can't be parsed:
    //   ![[og-provide-context-with-abortsignal-reason.png]]
    //     Fix: Manually edit and remove ![[  ]]

    logger.debug({ filepath, rawFrontmatter });

    const post = {
        title: null,
        originalUrl: null,
        newUrl: null,
        sourceFilepath: filepath,
        published: null,
        openGraphImage: null,
        openGraphDescription: null,
        rawFrontmatter,
    };

    posts.push(post);
    logger.debug({ post });

    const published = rawFrontmatter.Published || rawFrontmatter.published;
    published && logger.debug({ filepath, published });

    const frontmatterKeys = Object.keys(rawFrontmatter);
    foundFrontmatterKeys.push(...frontmatterKeys);
    logger.debug({ filepath, frontmatterKeys });
  } catch (error) {
    logger.debug(`Error parsing post: ${filepath}`);
    logger.debug(error);
    failedPosts.push(filepath);
  }
}

// De-dupe and sort found frontmatter keys
foundFrontmatterKeys = [...new Set(foundFrontmatterKeys)];
foundFrontmatterKeys.sort();

logger.debug(`Found frontmatter keys: ${foundFrontmatterKeys.join(", ")}`);

if (failedPosts.length > 0) {
  logger.error(`Posts with parsing errors (${failedPosts.length}):`);
  logger.error(failedPosts);
}

fs.writeFileSync(options.out, JSON.stringify(posts, null, 2));

logger.info(`Posts data written to ${options.out}`);

/*

CORE KEYS TO ADD/NORMALISE:

url
ebomb_url
Ebomb URL

opengraph_description

published
  - Normalise all to YYYY-MM-DD (THH:MM:SS optional)
  - Many are in format: Sep 29, 2020
Published

last_updated

tags
Tags

url_dev
dev_post
dev_url
DEV URL
DEV post

reddit_post
Reddit URL
Reddit post

tweet_url
Tweet URL

original (optional)
orginal - Manually fix the one blog post with this key

notes (optional)
todo (optional)

----

TO DROP (unused, from Notion):

format
Format

status
Status

*/
