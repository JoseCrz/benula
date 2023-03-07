import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Box, Button, Flex, Grid, Heading, Icon, Text } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";

import { Container, Layout, Section } from "@/components";
import { BiArrowBack } from "react-icons/Bi";

import { dessertsData } from "@/mocks/menuData";

const pistacheData = dessertsData[0];

export default function MenuDetail() {
  const router = useRouter();

  return (
    <Layout title="Espiral de Pistache | Benúla">
      <Section backgroundColor="#FAFAFA">
        <Container pt={[18]} pb={[8]}>
          <Button
            fontWeight="bold"
            backgroundColor="transparent"
            onClick={() => router.back()}
          >
            <Icon as={BiArrowBack} fontSize="20px" mr={1} />
            <Text as="span" textDecoration="underline">
              ir para atrás
            </Text>
          </Button>
          <Grid gridTemplateColumns="1fr 1fr" columnGap={20}>
            <Box pr={[10]}>
              <Heading as="h1" fontSize={["60px"]} color="#81191A">
                espiral de pistache
              </Heading>
              <Flex alignItems="center" mt={[6]}>
                <Text fontSize={["24px"]} color="#81191A" fontWeight="bold">
                  $55
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
                width="95%"
                height="1px"
                mt={[6]}
                backgroundColor="rgba(0, 0, 0, 0.04)"
              />
              <Box
                backgroundColor="#F1F0F0"
                borderRadius="20px"
                py={[6]}
                px={[4]}
              >
                <Text fontSize={["20px"]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum tristique. Duis
                  cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                  commodo diam libero vitae erat. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Suspendisse varius enim in eros
                  elementum tristique. Duis cursus, mi quis viverra ornare, eros
                  dolor interdum nulla, ut commodo diam libero vitae erat.Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  varius enim in eros elementum tristique. Duis cursus, mi quis
                  viverra ornare, eros dolor interdum nulla, ut commodo diam
                  libero vitae erat. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Suspendisse varius enim in eros elementum
                  tristique. Duis cursus, mi quis viverra ornare, eros dolor
                  interdum nulla, ut commodo diam libero vitae erat.
                </Text>
              </Box>
            </Box>
            <Box>
              <ImageGallery />
            </Box>
          </Grid>
        </Container>
      </Section>
    </Layout>
  );
}

function ImageGallery() {
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
          {pistacheData.pictures?.map((picture, index) => (
            <Flex
              key={`${pistacheData.name}-picture-${index}`}
              flex="0 0 100%"
              minWidth={0}
              position="relative"
            >
              <Box position="relative" width="100%">
                <Box height="500px">
                  <Image
                    src={picture.pictureSrc}
                    alt={picture.pictureAlt}
                    fill
                    placeholder="blur"
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
          {pistacheData.pictures?.map((picture, index) => (
            <Box
              key={`${pistacheData.name}-picture-${index}`}
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
                      src={picture.pictureSrc}
                      alt={picture.pictureAlt}
                      fill
                      placeholder="blur"
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
