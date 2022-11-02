import "@code-hike/mdx/dist/index.css";

import { getLayoutPosts } from "../../components";
import { getBySlug, getContentName, getContents } from "../../src";

import { Heading, SkeletonText, Stack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Image from "next/image";
// eslint-disable-next-line
import { useRouter } from "next/router";
import { MDXRemote } from "next-mdx-remote";
import { NextSeo } from "next-seo";
import { Mermaid } from "mdx-mermaid/lib/Mermaid"

const Giscus = dynamic(() => import("@giscus/react"), { ssr: false });

const toPaths = (paths) => ({ paths, fallback: true });
const toProps = ({ meta, content }) => ({ props: { content, meta } });
const toNotfound = (_) => ({ notFound: true });

export const getStaticPaths = () =>
  getContents("./content/posts/")
    .then((files) => files.map((f) => ({ params: { slug: getContentName(f) } })))
    .then(toPaths);

export const getStaticProps = ({ params: { slug } }) => getBySlug(String(slug)).then(toProps).catch(toNotfound);

const Post = ({ content, meta }) => {
  const router = useRouter();

  if (router.isFallback || !content || !meta) {
    return <SkeletonText noOfLines={5} />;
  }

  const seoProps = {
    title: meta.title,
    description: meta.description || "",
    openGraph: {
      type: "website",
      title: meta.title,
      description: meta.description || "",
      url: `/posts/${meta.slug}`,
      images: [
        {
          url: `/api/og?title=${meta.title}`,
          width: 800,
          height: 600,
          alt: meta.title,
        },
      ],
    },
  };

  const img = ({ src, ...props }) => (
    <Image
      alt={src}
      loader={(src_) => {
        return src_.src;
      }}
      sizes="responsive"
      src={require(`../../content/posts/${meta.slug}${src.replace("./", "/")}`)}
      {...props}
    />
  );

  const components = { Mermaid, img };

  return (
    <>
      <NextSeo {...seoProps} />
      <Heading pb={4} size="2xl">
        {meta.title}
      </Heading>
      <Stack spacing="3">
        <MDXRemote {...content} components={components} />
        <Giscus
          category="Q&A"
          categoryId="MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyODg3MTc0"
          emitMetadata="0"
          inputPosition="top"
          lang="en"
          loading="lazy"
          mapping="title"
          reactionsEnabled="1"
          repo="r17x/rin.rocks"
          repoId="MDEwOlJlcG9zaXRvcnkyMDM2MDM4NzM="
          strict="0"
          theme="preferred_color_scheme"
        />
      </Stack>
    </>
  );
};

Post.defaultProps = {
  content: null,
  meta: null,
};

Post.getLayout = getLayoutPosts;

export default Post;
