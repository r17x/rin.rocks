import { remarkCodeHike } from "@code-hike/mdx";
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
  // [remarkCopyLinkedFiles, {destinationDir: path.resolve("public/content/img")}],
  [remarkCodeHike, { autoImport: false, showExpandButton: true, showCopyButton: true }],
];

export const rehypePlugins = [
  // [rehypeImgSize, {dir: "public"}],
  rehypeStringify,
];
