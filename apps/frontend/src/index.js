import { rehypePlugins, remarkPlugins } from "../config.mjs";

import fs from "fs/promises";
import { globby } from "globby";
import { serialize as mdxSerialize } from "next-mdx-remote/serialize";
// import { bundleMDX } from "mdx-bundler";
import path from "path";
import * as R from "ramda";

/** @type (source: string) => Promise<string[]> */
export const getContents = (source) =>
  globby(source, {
    gitignore: true,
    expandDirectories: {
      extensions: ["md", "mdx"],
    },
  });

/** @type (source: string) => Promise<string[]> */
export const readContent = (source) => fs.readFile(source, { encoding: "utf8" });

export const serialize = (source) =>
  readContent(source).then((content) =>
    mdxSerialize(content, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins,
        rehypePlugins,
        useDynamicImport: true,
        format: "mdx",
      },
    }),
  );

/** 
  * When using `mdx-bundler` but have some problem right now, so back to use mdx-next-remote
  const serialize = await (source)
  bundleMDX({
    source: await readContent(source),
    cwd: path.resolve(`${path.dirname(source)}`),
    esbuildOptions(options) {
      // Set the `outdir` to a public location for this bundle.
      options.outdir = path.resolve(`public/img/${path.dirname(source)}`);
      options.loader = {
        ...options.loader,
        // Tell esbuild to use the `file` loader for pngs
        ".png": "file",
      };
      // Set the public path to /img/about
      options.publicPath = `/img/${path.dirname(source)}`;

      // Set write to true so that esbuild will output the files.
      options.write = true;

      return options;
    },
    mdxOptions(options) {
      options.remarkPlugins = (options.remarkPlugins || []).concat(remarkPlugins);
      options.rehypePlugins = (options.rehypePlugins || []).concat(rehypePlugins);
      options.format = "mdx";
      return options;
    },
  });
*/

const log = (a) => {
  if (process.env.NODE_ENV === "development") console.log(a);
  return a;
};

const jsonSerialize = R.compose(JSON.parse, JSON.stringify);
const getFrontmatter = R.prop("frontmatter");

/** @type (source: string) => string */
export const getContentName = (source) => {
  const name = path.basename(source);
  if (["index.md", "index.mdx"].includes(name)) return path.basename(path.dirname(source));
  return path.parse(name).name;
};

export const getMeta = (source) =>
  serialize(source)
    .then(getFrontmatter)
    .then(jsonSerialize)
    .then((a) => ({ ...a, slug: getContentName(source) }));

const noFilter = (fn) => (process.env.NODE_ENV === "development" ? (x) => x : fn);

export const sortByContentDate = (arr) => arr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
export const filterByContentDate = (a) => a.filter((b) => Boolean(b.date));

const findBySlug = (slug) => (arr) => arr.find((slug_) => slug_.match(slug));

/** @type <A>(...fns: A[]) => <B>(x: B) => B */
const compose =
  (...fns) =>
  (x) =>
    fns.reduce((g, f) => f(g), x);

const _getAllPosts = (...args) =>
  getContents("./content/posts/")
    .then((files) => Promise.all(files.map(async (f) => getMeta(f))))
    .then(compose(...args));

export const getAllPosts = () => _getAllPosts(noFilter(filterByContentDate), sortByContentDate);

export const getBySlug = (slug) =>
  getContents("./content/posts/")
    .then(findBySlug(slug))
    .then(serialize)
    .then(log)
    .then(jsonSerialize)
    .then((content) => ({
      content,
      meta: jsonSerialize({ ...content.frontmatter, slug }),
    }));

export const getSponsors = (username) => {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://${process.env.PUBLIC_URL || process.env.NEXT_PUBLIC_VERCEL_URL}`;
  return fetch(`${url}/api/sponsors?username=${username}`)
    .then((r) => r.json())
    .catch((_) => ({ data: null }));
};
