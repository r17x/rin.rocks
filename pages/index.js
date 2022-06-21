import { getLayout } from "../components";
import { getAllPosts } from "../src";

import { Code, Flex, Heading, Link, List, ListItem, Stack, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { NextSeo } from "next-seo";

export const getStaticProps = () =>
  getAllPosts((a) => a.filter((b) => Boolean(b.date))).then((posts) => ({ props: { posts } }));

const Posts = ({ posts }) => (
  <List>
    {posts.map((post) => (
      <ListItem key={post.slug}>
        <NextLink href={"/posts/".concat(post.slug)}>{post.title}</NextLink>
      </ListItem>
    ))}
  </List>
);

const Description = () => (
  <VStack align="start" py="35vh" spacing="3">
    <Heading as="h1" color="whiteAlpha.700">
      {"ri7{x}"}
    </Heading>
    <Heading as="h2">
      a <Code>Software Engineer</Code>, Interest in topic (φ + Losophy), (λ + μετα-Programming), D.x (Developer
      Experience), & Web Tech.
    </Heading>
    <Text>
      Thinkering open source projects at{" "}
      <Link
        color="purple.400"
        fontWeight="bold"
        href="https://evilfactorylabs.org"
        target="_blank"
        textDecoration="underline"
      >
        Evilfactorylabs.org
      </Link>
      {" & "}
      <Link color="purple.400" fontWeight="bold" href="https://koding.ninja" target="_blank" textDecoration="underline">
        KodingNinja
      </Link>
      {" . "}
    </Text>
    <Text>
      Inquiries via email at <Code>hi@rin.rocks</Code> or via Twitter at <Code> @__r17x </Code>
    </Text>
  </VStack>
);

const Home = ({ posts }) => (
  <>
    <NextSeo title="r17x - if you know, you know" />
    <Stack>
      <Description />
      <Flex
        alignItems="center"
        borderBottomWidth="medium"
        borderColor="whiteAlpha.500"
        justifyContent="space-between"
        pb="2"
      >
        <Heading as="h2">Recent Posts</Heading>
        <Link href="/posts">see all posts</Link>
      </Flex>
      <Posts posts={posts} />
    </Stack>
  </>
);

Home.getLayout = getLayout;

export default Home;
