import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
// TODO: Remove
import react from "@astrojs/react";
import remarkToc from "remark-toc";
// import remarkCollapse from "remark-collapse";
import remarkOembedExports from "@agentofuser/remark-oembed";
const remarkOembed = remarkOembedExports.default;
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://simonplend.com/",
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    // TODO: Remove this
    react(),
    sitemap(),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      [
        remarkToc,
        {
          heading: "Jump links",
        },
      ],
      // TODO: Remove this and the npm dependency?
      // remarkOembed,
      // TODO: Remove this and the npm dependency?
      // [
      //   remarkCollapse,
      //   {
      //     test: "Table of contents",
      //   },
      // ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
});
