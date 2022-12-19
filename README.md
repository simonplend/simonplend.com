# simonplend.com - 🚧 UNDER CONSTRUCTION 🚧

## Features

### Required features

- [X] Deploy to Netlify
- [X] Support for MDX so I can embed components
- [X] Automatic jump links/table of contents from headings
- [X] Code syntax highlighting
  - Built in to Astro
- [X] Support for Open Graph images and description
  - [X] Check how it's set up in this theme
- [~] ConvertKit form integration
	- [ ] Weird empty error message in production
- [~] Post tags and tag pages
  - [ ] Tidy up the layout
- [X] Embed YouTube videos
- [X] Embed Vimeo videos
  - Getting a 404 response from Vimeo (oEmbed)
  - https://developer.vimeo.com/api/oembed/videos
- [~] RSS feed
  - [ ] Check what's currently being generated for simonplend.com
    - https://simonplend.com/feed/ - includes full posts
  - [ ] Check what's being generated by this Astro site
  - Docs: https://docs.astro.build/en/guides/rss/
- [~] Sitemap
- [ ] Add a Creative Commons license
  - https://creativecommons.org/licenses/by/4.0/
  - <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons Licence" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
- [ ] Add site analytics with Plausible
  - [ ] Copy and paste in their script tag
  - [ ] Only render in production build
- [ ] Enable HTTPS on Netlify

### Nice to have features

- [ ] Render a banner across the top when in development
- [ ] Add IndieWeb features
  - [ ] Web mentions
  - [ ] What else?!
- [ ] Links to Edit page [on GitHub]
- [ ] Page Last updated
- [ ] Page version history
  - Generate automatically from git log?
- [ ] Heading anchors
 - [ ] Automatically convert headers to links
 - [ ] Show a # to the left on hover or focus
- [ ] Dynamically generate Open Graph images
  - [ ] Try out Vercel's OG library - https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images
	- [ ] Try out with Cloudinary
- [ ] Estimated post reading time
  - [ ] Is this helpful?
- [ ] Support for line highlighting in code blocks
  - https://github.com/shikijs/shiki/pull/259
  - https://github.com/withastro/astro/pull/2587
- [ ] Site search
- [ ] Light mode / Dark mode
- [ ] Easy to embed StackBlitz

## TODO

- [ ] Backwards plan launching a new version of simonplend.com
  - Migrate existing blog posts
    - Get URLs from https://simonplend.com/sitemap_index.xml
    - Explore original posts:
      - ~/Documents/Notes/Blog\ posts/Published/*.md
      - ~/Documents/Notes/Quick\ tips/Published/*.md
      - ~/Documents/Notes/Whats\ new\ in\ Node.js\ core/Features/**/Blog\ post.md
  - Set up 301 redirects for old URLs
    - https://docs.netlify.com/routing/redirects/
  - What are good ways to avoid losing Google juice?

```typescript
type BlogPosts = Array<{
  title: string;
  originalUrl: string;
  newUrl: string;
  sourceFilepath: string;
  published: string;
  openGraphImage: string;
  openGraphDescription: string;
}>
```

## Blog inspiration

- https://ted.dev/
- https://daveceddia.com/

## Astro blog templates

- [Astro Starter Kit: Blog](https://github.com/withastro/astro/tree/main/examples/blog)
- [Charca/astro-blog-template](https://github.com/Charca/astro-blog-template)
- [AstroPaper](https://github.com/satnaing/astro-paper)

## Astro integrations

### Site structure

- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Astro SEO](https://github.com/jonasmerlin/astro-seo) - Meta and Open Graph tags
- [astro-robots-txt](https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt)
- [@astrojs/image](https://docs.astro.build/en/guides/integrations-guide/image/)
- [@astrojs/prefetch](https://docs.astro.build/en/guides/integrations-guide/prefetch/)

### Content

- [astro-icon](https://github.com/natemoo-re/astro-icon)
- [Astro ImageTools](https://github.com/RafidMuhymin/astro-imagetools)
- [@astro-community/astro-embed-youtube](https://github.com/astro-community/astro-embed/tree/main/packages/astro-embed-youtube)
- [@astro-community/astro-embed-vimeo](https://github.com/astro-community/astro-embed/tree/main/packages/astro-embed-vimeo)

## Markdown plugins

- Astro uses `remark-gfm` and `remark-smartypants` by default
- [remark plugins](https://github.com/remarkjs/awesome-remark)
- [rehype plugins](https://github.com/rehypejs/awesome-rehype)
- [remark-toc](https://www.npmjs.com/package/remark-toc) - Table of contents
- [rehype-accessible-emojis](https://www.npmjs.com/package/rehype-accessible-emojis) - Not sure if it's for MDX only?
- [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor)
