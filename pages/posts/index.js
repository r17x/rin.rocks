import { getLayout } from "../../components";
import { getAllPosts } from "../../src";

import { List, ListItem } from "@chakra-ui/react";
import Link from "next/link";

export const getStaticProps = () => getAllPosts().then((posts) => ({ props: { posts } }));

const Posts = ({ posts }) => {
  return (
    <List>
      {posts.map((post) => (
        <ListItem key={post.slug}>
          <Link href={"/posts/".concat(post.slug)}>{post.title}</Link>
        </ListItem>
      ))}
    </List>
  );
};

export default Posts;

Posts.getLayout = getLayout;
