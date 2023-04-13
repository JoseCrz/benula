import { useState, useEffect, useCallback } from "react";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Link from "next/link";
import Image from "next/image";
import { Box, Button, Flex, Grid, Heading, Icon, Text } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";
import { BiArrowBack } from "react-icons/bi";

import { getAllMenuItemSlugs, getMenuItemBySlug } from "@/sanity/queries";
import { urlForImage } from "@/sanity/utils";
import { Container, Layout, Section } from "@/components";

export async function getStaticPaths() {
  const slugs = await getAllMenuItemSlugs();

  return {
    paths: slugs.map((slug) => `/menu/${slug}`),
    fallback: "blocking",
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const menuItem = await getMenuItemBySlug(context.params?.slug || "");

  return {
    props: {
      menuItem,
    },
  };
}

type MenuDetailPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function MenuDetail({ menuItem }: MenuDetailPageProps) {
  return (
    <Layout title={`${menuItem.name} | Benúla`}>
      <Section backgroundColor="#FAFAFA">
        <Container pt={[18]} pb={[8]}>
          <Link href="/menu">
            <Flex fontWeight="bold" alignItems="center">
              <Icon as={BiArrowBack} fontSize="20px" mr={1} />
              <Text as="span" textDecoration="underline">
                ir para atrás
              </Text>
            </Flex>
          </Link>
          <Grid
            gridTemplateColumns={["1fr", "1fr 1fr"]}
            columnGap={20}
            rowGap={6}
          >
            <Box pr={[0, 10]}>
              <Heading as="h1" fontSize={["42px", "60px"]} color="#81191A">
                {menuItem.name}
              </Heading>
              <Flex alignItems="center" mt={[6]}>
                <Text fontSize={["24px"]} color="#81191A" fontWeight="bold">
                  ${menuItem.price}
                </Text>
                <Box width="1px" height="40px" backgroundColor="black" mx={4} />
                <Text
                  py={2}
                  px={6}
                  fontWeight="bold"
                  backgroundColor="#F8EFDE"
                  borderRadius="10px"
                >
                  favorito de la casa
                </Text>
              </Flex>
              <Box
                width={["100%", "95%"]}
                height="1px"
                mt={[6]}
                backgroundColor="rgba(0, 0, 0, 0.04)"
              />
              <Box
                backgroundColor="#F1F0F0"
                borderRadius="20px"
                mt={[6]}
                py={[6]}
                px={[4]}
              >
                <Text fontSize={["20px"]}>{menuItem.description}</Text>
              </Box>
            </Box>
            <Box>
              <ImageGallery images={menuItem.images} />
            </Box>
          </Grid>
        </Container>
      </Section>
    </Layout>
  );
}

type ImageGalleryProps = {
  images: MenuDetailPageProps["menuItem"]["images"];
};

function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  function onThumbnailClick(index: number) {
    if (!emblaMainApi || !emblaThumbsApi) return;

    if (emblaThumbsApi.clickAllowed()) emblaMainApi.scrollTo(index);
  }

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <>
      <Box ref={emblaMainRef} overflow="hidden">
        <Flex flexDirection="row" height="auto">
          {images.map((image, index) => (
            <Flex
              key={image._key}
              flex="0 0 100%"
              minWidth={0}
              position="relative"
            >
              <Box position="relative" width="100%">
                <Box height="500px">
                  <Image
                    src={urlForImage(image).height(500).fit("clip").url()}
                    fill
                    alt={image.alt}
                    placeholder="blur"
                    blurDataURL={urlForImage(image)
                      .height(500)
                      .quality(10)
                      .blur(1000)
                      .fit("clip")
                      .url()}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    priority={index === 0}
                  />
                </Box>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
      <Box ref={emblaThumbsRef} mt={4} overflow="hidden">
        <Flex flexDirection="row">
          {images.map((image, index) => (
            <Box
              key={image._key}
              flex="0 0 25%"
              minWidth={0}
              position="relative"
              paddingRight={[4]}
            >
              <Button
                backgroundColor="transparent"
                height="auto"
                onClick={() => onThumbnailClick(index)}
                css={{
                  "-webkit-appearance": "none",
                  touchAction: "manipulation",
                  display: "block",
                  textDecoration: "none",
                  cursor: "pointer",
                  border: 0,
                  padding: 0,
                  margin: 0,
                  width: "100%",
                  opacity: index === selectedIndex ? 1 : 0.5,
                  transition: "opacity 0.2s",
                }}
              >
                <Box position="relative" width="100%">
                  <Box height="96px">
                    <Image
                      src={urlForImage(image).height(96).fit("clip").url()}
                      fill
                      alt={image.alt}
                      placeholder="blur"
                      blurDataURL={urlForImage(image)
                        .height(96)
                        .quality(10)
                        .blur(1000)
                        .url()}
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      priority
                    />
                  </Box>
                </Box>
              </Button>
            </Box>
          ))}
        </Flex>
      </Box>
    </>
  );
}
