import { Box, ChakraProvider, Code, Container, Heading, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react";
// eslint-disable-next-line
import { CH } from "@code-hike/mdx/components";
import { MDXProvider } from "@mdx-js/react";

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
  h1: withChildren(Heading, { as: "h1", size: "xl", py: 4 }),
  h2: withChildren(Heading, { as: "h2", size: "l", py: 3 }),
  h3: withChildren(Heading, { as: "h3", size: "md", py: 3 }),
  h4: withChildren(Heading, { as: "h4", size: "sm", py: 3 }),
  p: withChildren(Text, { as: "p", pb: 2 }),
  ul: withChildren(UnorderedList, { pl: 6 }),
  li: withChildren(ListItem, { pb: 1 }),
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

export const AppProvider = ({ children }) => <ChakraProvider>{children}</ChakraProvider>;

export const Footer = ({ children }) => (
  <VStack borderTop="whitesmoke" mt="10vh" py="10vh">
    <Text>{children}</Text>
  </VStack>
);

export const Layout = ({ children }) => (
  <VStack bgColor="#1A202C" color="whitesmoke" minH="100vh" minW="100vw">
    <Container maxW="container.md" minH="96vh">
      {children}
    </Container>
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
