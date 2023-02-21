import { nord } from "./themes.mjs";

import { remarkCodeHike } from "@code-hike/mdx";
import remarkMdxMermaid from "mdx-mermaid";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkGithub from "remark-github";

export const remarkPlugins = [
  remarkFrontmatter,
  // [remarkReadingTime, { attribute: "reading" }],
  // remarkReadingTimeMDX,
  // remarkImages,
  //  remarkMdxImages,
  // remarkUnwrapImages,
  // gatsbyRemarkCopyImages,
  remarkGfm,
  remarkGithub,
  remarkMdxMermaid,
  // [remarkCopyLinkedFiles, {destinationDir: path.resolve("public/content/img")}],
  [remarkCodeHike, { theme: nord, autoImport: false, showExpandButton: true, showCopyButton: true }],
];

export const rehypePlugins = [
  // [rehypeImgSize, {dir: "public"}],
  rehypeStringify,
];
