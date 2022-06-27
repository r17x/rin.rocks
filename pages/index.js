import { getLayout } from "../components";
import { getAllPosts } from "../src";

import { Github, Link as LinkIcon } from "@chakra-icons/bootstrap";
import {
  ButtonGroup,
  Code,
  Flex,
  Heading,
  IconButton,
  Link,
  List,
  ListItem,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { NextSeo } from "next-seo";

export const getStaticProps = () =>
  getAllPosts((a) => a.filter((b) => Boolean(b.date))).then((posts) => ({ props: { posts } }));

const Posts = ({ posts }) => (
  <List>
    {posts.map((post) => (
      <ListItem key={post.slug}>
        <NextLink href={"/posts/".concat(post.slug)}>
          <Link colorScheme="whiteAlpha">{post.title}</Link>
        </NextLink>
      </ListItem>
    ))}
  </List>
);

/** @typedef
type SocialLink = {
  label: string;
  url: string;
  icon: string
};
*/

const getSocialLinkIcon = ({ icon }) => {
  switch (icon) {
    case "github":
      return <Github />;
    default:
      return <LinkIcon />;
  }
};

const _socialLinks = [
  {
    name: "Github: r17x",
    url: "https://github.com/r17x",
    icon: "github",
  },
];

const Description = ({ socialLinks }) => (
  <VStack align="start" py="30vh" spacing="3" transform="translateY(-70px)">
    <Heading as="h1" color="whiteAlpha.700">
      {"r17{x}"}
    </Heading>
    <Heading as="h2">
      a <Code>Software Engineer</Code>, Interest in topic (φ + Losophy), (λ + μετα-Programming), D.x (Developer
      Experience), & Web Tech.
    </Heading>
    <Text>
      Thinkering open source projects at{" "}
      <Link fontWeight="bold" href="https://evilfactorylabs.org" target="_blank" textDecoration="underline">
        Evilfactorylabs.org
      </Link>
      {" & "}
      <Link fontWeight="bold" href="https://koding.ninja" target="_blank" textDecoration="underline">
        KodingNinja
      </Link>
      {" . "}
    </Text>
    <Text>
      Inquiries via email at <Code>hi@rin.rocks</Code> or via Twitter at <Code> @__r17x </Code>
    </Text>
    <ButtonGroup>
      {socialLinks.map((social) => (
        <NextLink key={social.url} href={social.url} passHref>
          <Link rel="noopener noreferrer" target="_blank">
            <IconButton
              aria-label={social.label}
              colorScheme="currentColor"
              icon={getSocialLinkIcon(social)}
              rounded="full"
              size="md"
              variant="outline"
            />
          </Link>
        </NextLink>
      ))}
    </ButtonGroup>
  </VStack>
);

const Home = ({ posts }) => (
  <>
    <NextSeo title="r17x - if you know, you know" />
    <Stack>
      <Description socialLinks={_socialLinks} />
      <Flex
        alignItems="center"
        borderBottomWidth="medium"
        borderColor="whiteAlpha.500"
        justifyContent="space-between"
        pb="2"
      >
        <Heading as="h2">Recent Posts</Heading>
        <NextLink href="/posts">
          <Link color="white">see all posts</Link>
        </NextLink>
      </Flex>
      <Posts posts={posts} />
    </Stack>
  </>
);

Home.getLayout = getLayout;

export default Home;
