# Blog posts data

## Type

```typescript
type BlogPosts = Array<{
  title: string;
  url: string;
  sourceFilepath: string;
  published: string;
  openGraphImage: string;
  openGraphDescription: string;
}>
```

## Source posts frontmatter

### Keys to set and normalise

```
published = published, Published
blogUrl = url, ebomb_url, Ebomb URL
twitterUrl = tweet_url, Tweet URL
devToUrl = url_dev, dev_post, dev_url, DEV URL, DEV post
redditUrl = reddit_post, Reddit URL, Reddit post
tags = tags, Tags
openGraphDescription = opengraph_description
openGraphImage = TODO: Where is this data?
notes = TODO: Combine: original, notes, todo
changelog:
  - date: July 27, 2022 (last_updated)
    description: "This is a description of what changed"
  - date: ...
    description: ...
```

### To drop

From Notion, unused.

```
format
Format

status
Status
```

## Current sitemaps

- Index sitemap: https://simonplend.com/sitemap_index.xml
- Blog posts: https://simonplend.com/post-sitemap.xml
- Blog pages: https://simonplend.com/page-sitemap.xml
- Blog categories: https://simonplend.com/category-sitemap.xml
- Blog tags: https://simonplend.com/post_tag-sitemap.xml
- Blog authors: https://simonplend.com/author-sitemap.xml

Sitemap structure: `<urlset><url>...</url></urlset>`

## Blog posts on simonplend.com

Stored in JSON format as [`posts-live.json`](./posts-live.json).

```bash
curl -s https://simonplend.com/post-sitemap.xml | grep ''

# Manually strip out <loc>...</loc> in an editor
```

### URLs

```
https://simonplend.com/how-can-i-handle-common-checks-across-different-endpoints-in-an-express-application/
https://simonplend.com/how-to-use-fetch-to-post-form-data-as-json-to-your-api/
https://simonplend.com/how-to-build-filtering-into-your-rest-api/
https://simonplend.com/how-to-fix-those-confusing-cors-errors-when-calling-your-express-api/
https://simonplend.com/what-is-a-good-directory-structure-for-a-monorepo-with-a-node-js-back-end-and-react-front-end/
https://simonplend.com/week-notes-1/
https://simonplend.com/week-notes-2/
https://simonplend.com/week-notes-3/
https://simonplend.com/notes-from-nodeconf-remote-2020/
https://simonplend.com/week-notes-4/
https://simonplend.com/week-notes-5/
https://simonplend.com/week-notes-6/
https://simonplend.com/how-to-create-an-error-handler-for-your-express-api/
https://simonplend.com/node-js-now-supports-named-imports-from-commonjs-modules-but-what-does-that-mean/
https://simonplend.com/are-you-using-promises-and-async-await-safely-in-node-js/
https://simonplend.com/talk-at-js-monthly-london-make-the-most-of-modern-javascript-with-fastify/
https://simonplend.com/using-object-shorthand-when-debugging/
https://simonplend.com/how-to-generate-a-stack-trace-in-node-js/
https://simonplend.com/curl-download-file-command/
https://simonplend.com/dont-install-body-parser-its-already-bundled-with-express/
https://simonplend.com/format-javascript-objects-and-arrays-in-debug-output/
https://simonplend.com/save-your-git-stashes-with-helpful-descriptions/
https://simonplend.com/how-to-review-your-changes-with-git-piece-by-piece/
https://simonplend.com/use-the-github-cli-to-help-reduce-context-switching/
https://simonplend.com/display-the-internal-express-logs-to-help-you-debug-your-application/
https://simonplend.com/ditch-double-bang-and-try-boolean-instead/
https://simonplend.com/how-to-output-the-contents-of-a-file-in-reverse/
https://simonplend.com/how-to-restore-changes-which-youve-reverted-from-your-main-git-branch/
https://simonplend.com/what-are-the-express-req-and-res-objects/
https://simonplend.com/name-your-functions-for-better-stack-traces/
https://simonplend.com/how-to-list-npm-run-scripts-for-a-project/
https://simonplend.com/express-uses-finalhandler-for-the-default-error-handler/
https://simonplend.com/only-use-dotenv-in-development/
https://simonplend.com/try-a-standard-format-for-api-error-responses/
https://simonplend.com/try-out-command-line-tools-with-npx/
https://simonplend.com/how-to-speed-up-npm-install-in-your-node-js-builds/
https://simonplend.com/notes-from-cityjs-conference-2021/
https://simonplend.com/how-to-use-the-nullish-coalescing-operator/
https://simonplend.com/background-a-process-in-the-terminal/
https://simonplend.com/5-best-practices-for-building-a-modern-api-with-express/
https://simonplend.com/how-to-send-consistent-error-responses-from-your-express-api/
https://simonplend.com/how-to-securely-call-an-authenticated-api-from-your-front-end/
https://simonplend.com/what-you-need-to-know-about-es-modules-in-node-js/
https://simonplend.com/how-does-middleware-work-in-express/
https://simonplend.com/tips-for-migrating-from-express-to-fastify/
https://simonplend.com/generate-v4-uuids-without-needing-the-uuid-library/
https://simonplend.com/cancel-async-operations-with-abortcontroller/
https://simonplend.com/guidelines-for-choosing-a-node-js-framework/
https://simonplend.com/talk-improving-your-applications-with-abortcontroller/
https://simonplend.com/2021-year-in-review/
https://simonplend.com/take-advantage-of-promise-based-apis-in-node-js/
https://simonplend.com/whats-new-in-node-js-core-september-2021/
https://simonplend.com/make-your-imports-clearer-with-the-node-protocol/
https://simonplend.com/automatically-cancel-async-operations-with-abortsignal-timeout/
https://simonplend.com/the-fetch-api-in-node-js/
https://simonplend.com/import-json-in-es-modules/
https://simonplend.com/provide-context-with-abortsignal-reason/
https://simonplend.com/avoid-boilerplate-code-when-handling-abort-signals/
https://simonplend.com/deep-clone-values-with-structuredclone/
https://simonplend.com/whats-new-in-node-js-core-march-2022-edition/
https://simonplend.com/how-to-cancel-an-http-request-in-node-js/
https://simonplend.com/trying-out-http-toolkit-with-fastify-http-proxy/
https://simonplend.com/learning-fastify-part-4-create-a-proxy-server-for-api-authentication/
https://simonplend.com/learning-fastify-how-to-migrate-your-app-from-express-to-fastify/
https://simonplend.com/workshop-recording-get-started-with-fastify/
https://simonplend.com/use-fastify-hooks-to-set-headers-on-every-response/
https://simonplend.com/how-to-handle-request-validation-in-your-express-api/
https://simonplend.com/send-awesome-structured-error-responses-with-express/
https://simonplend.com/get-started-with-validation-in-node-js/
https://simonplend.com/deploying-a-node-app-and-postgres-database-to-fly-io/
https://simonplend.com/command-line-argument-parsing-with-node-js-core/
```