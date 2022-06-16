import { remarkCodeHike } from "@code-hike/mdx";
import _withMDX from "@next/mdx";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkGithub from "remark-github";
import codeHikeThemes from "shiki/themes/nord.json" assert { type: "json" };

/** @type <A>(...fns: A[]) => <B>(x: B) => B */
const compose =
  (...fns) =>
  (x) =>
    fns.reduce((g, f) => f(g), x);

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
  [remarkCodeHike, { theme: codeHikeThemes, autoImport: false, showExpandButton: true, showCopyButton: true }],
];

export const rehypePlugins = [
  // [rehypeImgSize, {dir: "public"}],
  rehypeStringify,
];

const withMDX = _withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins,
    rehypePlugins,
    providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const config = {
  future: {
    webpack5: false,
  },
  images: {
    loader: "custom",
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    nextImageExportOptimizer: {
      imageFolderPath: "public/images",
      exportFolderPath: "out",
      quality: 75,
    },
  },
  env: {
    storePicturesInWEBP: true,
    generateAndUseBlurImages: true,
  },
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

export default compose(withMDX)(config);
