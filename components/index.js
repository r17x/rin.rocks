import { useEffect, useState } from "react";

import { ArrowLeft } from "@chakra-icons/bootstrap";
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  ChakraProvider,
  Code,
  Container,
  extendTheme,
  Heading,
  HStack,
  IconButton,
  Link,
  List,
  ListItem,
  OrderedList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  theme as baseTheme,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
// eslint-disable-next-line
import { CH } from "@code-hike/mdx/components";
import { MDXProvider } from "@mdx-js/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

const withChildren =
  (Component, props) =>
  // eslint-disable-next-line
  ({ children, ...props_}) =>
    (
      <Component {...props_} {...props}>
        {children}
      </Component>
    );
const components = {
  Test: () => null,
  a: Link,
  h1: withChildren(Heading, { as: "h1", size: "xl", py: 4, letterSpacing: "2%" }),
  h2: withChildren(Heading, {
    as: "h2",
    textDecorationColor: "primary",
    textDecoration: "underline",
    size: "xl",
    letterSpacing: "2%",
    lineHeight: "2em",
  }),
  h3: withChildren(Heading, { as: "h3", size: "md", py: 3 }),
  h4: withChildren(Heading, { as: "h4", size: "sm", py: 3 }),
  p: withChildren(Text, { as: "p", lineHeight: "1.85em" }),
  ul: withChildren(UnorderedList, { pl: 6 }),
  ol: withChildren(OrderedList, { pl: 6 }),
  li: withChildren(ListItem, { pb: 1 }),
// eslint-disable-next-line
  blockquote: ({ children, ...props }) => (
    <Box
      as="blockquote"
      bgColor="blackAlpha.200"
      borderLeftColor="purple.600"
      borderLeftStyle="solid"
      borderLeftWidth="10px"
      fontStyle="italic"
      lineHeight="8"
      my={4}
      p={3}
      {...props}
    >
      {children}
    </Box>
  ),
  code: Code,
  CH,
};

const theme = extendTheme({
  colors: {
    primary: baseTheme.colors.purple,
  },
  components: {
    Link: {
      variants: {
        primary: ({ colorScheme = "purple" }) => ({
          color: colorScheme.concat(".500"),
          _hover: {
            color: colorScheme.concat(".400"),
          },
        }),
      },
      defaultProps: {
        variant: "primary",
      },
    },
  },
});

export const Navigation = () => {
  const router = useRouter();

  const left = (() => {
    switch (router.pathname) {
      case "/":
        return <Button variant="outline">r17x</Button>;
      default:
        return (
          <IconButton
            color="currentcolor"
            icon={<ArrowLeft boxSize="7" />}
            onClick={router.back}
            size="xl"
            variant="link"
          />
        );
    }
  })();

  return (
    <HStack
      alignItems="center"
      backgroundColor="#121820"
      bottom="0"
      boxShadow="3xl"
      justifyContent="space-between"
      mb="16"
      minW={["full", "full", "container.md", "container.md"]}
      position="fixed"
      px="3"
      py="3"
      rounded="md"
      transform="translateY(-1.5em)"
    >
      <HStack alignItems="center">
        <Link>{left}</Link>
      </HStack>
      <HStack alignItems="center">
        <NextLink href="/posts" passHref>
          <Link>Blog</Link>
        </NextLink>
      </HStack>
    </HStack>
  );
};

export const AppProvider = ({ children }) => <ChakraProvider theme={theme}>{children}</ChakraProvider>;

export const Footer = ({ children }) => (
  <VStack borderTop="whitesmoke" mt="10vh" py="10vh">
    <Text pb="5vh">{children}</Text>
  </VStack>
);

export const HideInIframe = ({ children }) => {
  const [isInIframe, setIsInIframe] = useState(true);

  useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  if (isInIframe) return null;
  return children;
};

export const Layout = ({ children }) => (
  <VStack bgColor="#1A202C" color="whitesmoke" minH="100vh" minW="100vw">
    <Container maxW="container.md" minH="96vh" mt="10">
      {children}
    </Container>
    <HideInIframe>
      <Navigation />
    </HideInIframe>
    <Footer>
      © {new Date().getFullYear()} - r17x with <Code>You</Code>
      {"."}
    </Footer>
  </VStack>
);

export const getLayout = (componentPage) => <Layout>{componentPage}</Layout>;
export const getLayoutPosts = (componentPage) => (
  <MDXProvider components={components}>{getLayout(componentPage)}</MDXProvider>
);

export const ListPosts = ({ posts }) => (
  <List spacing="1em">
    {posts.map((post) => (
      <ListItem
        key={post.slug}
        _hover={{ color: "purple.500" }}
        bgColor="blackAlpha.200"
        borderColor="blackAlpha.300"
        borderRadius="lg"
        borderStyle="solid"
        borderWidth="thin"
        boxShadow="md"
        color="white"
        cursor="pointer"
        p="3"
      >
        <Popover isLazy trigger="hover">
          <PopoverTrigger>
            <Stack spacing="0.7em">
              <Heading as="h2" fontSize="lg" fontWeight="bold">
                <NextLink href={`posts/${post.slug}`}>
                  <Link color="currentcolor">{post.title}</Link>
                </NextLink>
              </Heading>
              <HStack>
                <Badge>{new Date(post.date).toLocaleDateString()}</Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} colorScheme="purple" fontSize="0.5em">
                    {tag}
                  </Badge>
                ))}
              </HStack>
              {post.description ? <Text color="whiteAlpha.700">{post.description}</Text> : null}
            </Stack>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <AspectRatio ratio={16 / 9}>
                <iframe sandbox="allow-same-origin" src={`posts/${post.slug}?iframe=666yoi`} title={post.title} />
              </AspectRatio>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </ListItem>
    ))}
  </List>
);
