// const blogPost = {
//     title: null,
//     originalUrl: null,
//     newUrl: null,
//     sourceFilepath: null,
//     published: null,
//     openGraphImage: null,
//     openGraphDescription: null,
// };

import * as fs from "node:fs";

import glob from "glob";
import matter from 'gray-matter';

const obsidianNotesDirPath = "/Users/simonplend/Documents/Notes";

const globPatterns = [
    "Blog posts/Published/*.md",
    "Quick tips/Published/*.md",
    "Whats new in Node.js core/Features/**/Blog\ post.md",
];

let postFilepaths = [];
for (const pattern of globPatterns) {
    postFilepaths = [...postFilepaths, ...glob.sync(`${obsidianNotesDirPath}/${pattern}`)];
}

console.log(postFilepaths);

console.log({ 'postFilepaths.length': postFilepaths.length });

for (const filepath of postFilepaths) {
  const postMarkdown = fs.readFileSync(filepath, { encoding: "utf-8" });
  // console.log({ postMarkdown });

  console.log(matter(postMarkdown).data)
}

// console.log(file);