import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { parseArgs } from "node:util";

import glob from "glob";
import matter from "gray-matter";

import { createLogger } from "./lib/logger.mjs";

function formatDate(dateValue, fallback) {
  if (typeof dateValue === "string") {
    dateValue = (new Date(`${dateValue} GMT`));
  }
  if (dateValue) {
    // Format: 2021-09-07
    // dateValue = dateValue.toISOString().split("T")[0];

    // Format: September 7, 2021
    const [month, day, year] = [
      new Intl.DateTimeFormat("en-GB", { month: "long" }).format(dateValue),
      dateValue.getDate(),
      dateValue.getFullYear(),
    ];
    dateValue = `${month} ${day} ${year}`;
  } else {
    dateValue = fallback;
  }

  return dateValue;
}

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
      default: "./data/posts-source.json"
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

const logger = createLogger({ loggerLevel });

const obsidianNotesDirPath = `${os.homedir()}/dev/test-blog-posts`;

// WARNING: THIS IS THE PATH TO THE ORIGINAL SOURCE POSTS
// const obsidianNotesDirPath = `${os.homedir()}/Documents/Notes`;

const globPatterns = [
    "Blog posts/Published/*.md",
    "Quick Tips/Published/*.md",
    "Videos/Published/*.md",
    "Whats new in Node.js core/**/Blog\ post.md",
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
  let rawFrontmatter, postContent;

  try {
    const { data, content } = matter(postMarkdown);
    rawFrontmatter = data;
    postContent = content;
  } catch (error) {
    logger.debug(`Error parsing post: ${filepath}`);
    logger.debug(error);

    failedPosts.push(filepath);

    continue;
  }

  logger.debug({ filepath, rawFrontmatter });

  const title = /# (?<title>.+)/.exec(postContent).groups?.title;

  const url = rawFrontmatter["url"] || rawFrontmatter["ebomb_url"] || rawFrontmatter["Ebomb URL"] || "";

  let published = rawFrontmatter["published"] || rawFrontmatter["Published"] || null;
  let lastUpdated = rawFrontmatter["last_updated"] || null;
  logger.debug({ filepath, published, lastUpdated });
  published = formatDate(published, "MISSING");  
  lastUpdated = formatDate(lastUpdated, "");

  let tags = rawFrontmatter["tags"] || rawFrontmatter["Tags"] || "";
  if (tags) {
    tags = tags.toLowerCase().split(",").map(tag => {
      return tag.trim().replaceAll(" ", "-");
    });
  } else {
    tags = [];
  }

  const post = {
      title,
      url,
      sourceFilepath: filepath,
      frontmatter: {
        // Fields required by blog: title, description, datetime, slug, tags
        // Optional fields used by blog: featured, draft, ogImage, author
        title, // TODO: Decide whether to set this in frontmatter, currently required by blog
        description: rawFrontmatter["opengraph_description"] || "",
        datetime: published, // TODO: Change back to `published`
        slug: url.split("/").at(-2),
        tags,
        // Fields to add in later:
        // lastUpdated,
        // blogUrl: url,
        // twitterUrl: rawFrontmatter["tweet_url"] || rawFrontmatter["Tweet URL"] || "",
        // devToUrl: rawFrontmatter["url_dev"] || rawFrontmatter["dev_post"] || rawFrontmatter["dev_url"] || rawFrontmatter["DEV URL"] || rawFrontmatter["DEV post"] || "",
        // redditUrl: rawFrontmatter["reddit_post"] || rawFrontmatter["Reddit URL"] || rawFrontmatter["Reddit post"] || "",
        // openGraphImage: null, // TODO:
        // notes: null // TODO:
      },
      rawFrontmatter,
  };

  posts.push(post);
  logger.debug({ post });

  const frontmatterKeys = Object.keys(rawFrontmatter);
  foundFrontmatterKeys.push(...frontmatterKeys);
  logger.debug({ filepath, frontmatterKeys });
}

// TODO: Sort posts by `published`

// De-dupe and sort found frontmatter keys
foundFrontmatterKeys = [...new Set(foundFrontmatterKeys)];
foundFrontmatterKeys.sort();

logger.debug(`Found frontmatter keys: ${foundFrontmatterKeys.join(", ")}`);

if (failedPosts.length > 0) {
  logger.error(`Posts with parsing errors (${failedPosts.length}):`);
  logger.error(failedPosts);
}

fs.writeFileSync(path.resolve(options.out), JSON.stringify(posts, null, 2));

logger.info(`Posts data written to ${options.out}`);

// TODO: Refactor this into a standalone script e.g. explore-posts.mjs --field tags
const outputKey = "tags";
const values = posts.map((post) => post.frontmatter[outputKey]);
logger.debug(`posts[].frontmatter.${outputKey} values:\n\n${values.join("\n")}`);