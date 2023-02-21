import { rehypePlugins, remarkPlugins } from "./config.mjs";

import _withMDX from "@next/mdx";
// import { createRequire } from "module";
// import * as url from "url";
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
// const require = createRequire(import.meta.url);

/** @type <A>(...fns: A[]) => <B>(x: B) => B */
const compose =
  (...fns) =>
  (x) =>
    fns.reduce((g, f) => f(g), x);

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
  experimental: {
    swcPlugins: [["fetch.macro/swc"]],
  },
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
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
