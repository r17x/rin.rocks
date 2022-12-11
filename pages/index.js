import { getLayout, ListPosts } from "../components";
import { getAllPosts, getSponsors } from "../src";

import { Github, Link as LinkIcon } from "@chakra-icons/bootstrap";
import {
  Avatar,
  AvatarGroup,
  ButtonGroup,
  Code,
  Divider,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { NextSeo } from "next-seo";

export const getStaticProps = () =>
  Promise.all([getAllPosts((a) => a.filter((b) => Boolean(b.date))), getSponsors("r17x")]).then(
    ([posts, { data: sponsors }]) => ({ props: { posts, sponsors }, fallback: true}),
  ).catch(() => ({
    props: {posts: [], sponsors: {
      user: {sponsors: []}
    }}
  }));

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

const Sponsors = ({ sponsors, total, ...props }) => (
  <VStack {...props}>
    <Heading as="h2" fontSize="xxx-large" mb="5" textDecoration="underline" textDecorationColor="purple.500">
      Sponsors
      <span aria-label="sponsors" role="img">
        ❤️
      </span>
    </Heading>
    <Text fontWeight="black" letterSpacing="wider" lineHeight="10">
      look at the happy faces of those who sponsoring me{" "}
      <span aria-label="thank you" role="img">
        🚀
      </span>
    </Text>
    <AvatarGroup max={sponsors.length || 0}>
      {sponsors.map(({ login, name, avatarUrl }) => (
        <Avatar key={login} name={name} size="xl" src={avatarUrl} />
      ))}
      {Array.from({ length: total - sponsors.length }, (_, i) => i + 1).map((_, index) => (
        <Avatar key={index} name="Private Sponsors" size="xl" />
      ))}
    </AvatarGroup>
    <Code fontWeight="black" letterSpacing="wider" lineHeight="10">
      If you want to be seen here,{" "}
      <NextLink href="https://github.com/sponsors/r17x" passHref>
        <Link>Support me</Link>
      </NextLink>{" "}
      at <Github /> Github.
    </Code>
  </VStack>
);

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

const Home = ({
  posts,
  sponsors = {
    user: {
      sponsors: [],
    },
  },
}) => (
  <>
    <NextSeo title="r17x - if you know, you know" />
    <Stack shouldWrapChildren>
      <Description socialLinks={_socialLinks} />
      <Sponsors
        bgColor="blackAlpha.100"
        borderRadius="md"
        boxShadow="2xl"
        mb="20"
        px="5"
        py="10"
        spacing="7"
        sponsors={sponsors?.user?.sponsors ?? []}
        textAlign="center"
        total={sponsors.user.sponsorsCount}
      />
      <Flex alignItems="center" justifyContent="space-between" pb="2">
        <Heading as="h2">Recent Posts</Heading>
        <NextLink href="/posts">
          <Link color="white">see all posts</Link>
        </NextLink>
      </Flex>
      <Divider borderBottomWidth="medium" orientation="horizontal" />
      <ListPosts posts={posts} />
    </Stack>
  </>
);

Home.getLayout = getLayout;

export default Home;
