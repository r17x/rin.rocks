import { getLayout, ListPosts } from "../../components";
import { getAllPosts } from "../../src";

import { Flex, Heading, Stack } from "@chakra-ui/react";

export const getStaticProps = () =>
  getAllPosts((a) => a.filter((b) => Boolean(b.date))).then((posts) => ({ props: { posts } }));

const Posts = ({ posts }) => {
  return (
    <Stack>
      <Flex borderBottomWidth="medium" borderColor="whiteAlpha.500" pb="2">
        <Heading as="h2">Posts</Heading>
      </Flex>
      <ListPosts posts={posts} />
    </Stack>
  );
};

export default Posts;

Posts.getLayout = getLayout;
