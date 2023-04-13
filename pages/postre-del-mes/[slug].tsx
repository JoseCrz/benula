import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";
import { Box, Heading, Link as ChakraLink, Text } from "@chakra-ui/react";
import { getImageDimensions } from "@sanity/asset-utils";
import {
  PortableText,
  type PortableTextProps,
  type PortableTextComponentProps,
} from "@portabletext/react";

import {
  Layout,
  LocalLink,
  Section,
  Container,
  type ContainerProps,
} from "@/components";

import { DessertBlogImage } from "@/sanity/schemas";
import { urlForImage } from "@/sanity/utils";
import { getAllDessertSlugs, getDessertBySlug } from "@/sanity/queries";

export async function getStaticPaths() {
  const slugs = await getAllDessertSlugs();

  return {
    paths: slugs.map((slug) => `/postre-del-mes/${slug}`),
    fallback: "blocking",
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const dessert = await getDessertBySlug(context.params?.slug || "");

  if (!dessert) return { notFound: true };

  return {
    props: {
      dessert,
    },
  };
}

type DessertDetailPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function DessertDetail({ dessert }: DessertDetailPageProps) {
  return (
    <Layout title={`${dessert.name} | Benúla`}>
      <Section>
        <BlogContainer>
          <Heading as="h1" fontSize="42px">
            {dessert.name}
          </Heading>
        </BlogContainer>
        <Container mt={["60px"]}>
          <Box position="relative" width="100%" height="600px">
            <Image
              src={urlForImage(dessert.coverImage.asset).height(600).url()}
              alt={dessert.coverImage.alt}
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              priority
              fill
            />
          </Box>
        </Container>
      </Section>
      <Section>
        <BlogContainer>
          <article>
            <PortableText
              value={dessert.blogPost}
              components={portableTextComponents}
            />
          </article>
          <Box
            width="100%"
            height="1px"
            my={[12]}
            backgroundColor="rgba(0, 0, 0, 0.1)"
          />
        </BlogContainer>
      </Section>
    </Layout>
  );
}

function BlogContainer(props: ContainerProps) {
  return <Container maxWidth="768px" mx="auto" {...props} />;
}

//=========================
// Portable Text Components

const portableTextComponents: PortableTextProps["components"] = {
  block: {
    h1: ({ children }) => (
      <Heading as="h1" my={[6]} fontSize={["40px"]}>
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading as="h2" my={[5]} fontSize={["32px"]}>
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading as="h3" my={[4]} fontSize={["20px"]}>
        {children}
      </Heading>
    ),
    blockquote: ({ children }) => (
      <Text
        as="blockquote"
        color="#81191A"
        fontStyle="italic"
        borderLeft="2px solid #81191A"
        my={[5]}
        pl={[6]}
      >
        {children}
      </Text>
    ),
    normal: ({ children }) => <Text fontSize={["16px"]}>{children}</Text>,
  },
  marks: {
    link: ({ value, children }) => {
      const isLocalLink = value.href.startsWith("/");

      if (isLocalLink) {
        return (
          <LocalLink href={value.href} color="#81191A">
            {children}
          </LocalLink>
        );
      }
      return (
        <ChakraLink
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          color="#81191A"
        >
          {children}
        </ChakraLink>
      );
    },
  },
  types: {
    image: PortableImage,
  },
};

function PortableImage({
  value: image,
}: PortableTextComponentProps<DessertBlogImage>) {
  const { width, height } = getImageDimensions(image);
  return (
    <Box as="figure" my={[12]}>
      <Box position="relative" sx={{ aspectRatio: `${width / height}` }}>
        <Image
          src={urlForImage(image.asset).width(768).url()}
          alt={image.alt || ""}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          fill
        />
      </Box>
      {image.caption && (
        <Box
          as="figcaption"
          borderLeft="2px solid #81191A"
          mt={[4]}
          pl={2}
          fontSize="14px"
        >
          {image.caption}
        </Box>
      )}
    </Box>
  );
}
