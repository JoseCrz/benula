import { useState, useEffect } from "react";
import Image from "next/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";
import { ButtonLink } from "@/components";

import type { Dessert } from "@/sanity/schemas";
import { getDateString, urlForImage } from "@/sanity/utils";

type CarouselProps = { desserts: Dessert[] };

export function DessertsCarousel({ desserts }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [activeSnap, setActiveSnap] = useState(0);

  function goToSlide(index: number) {
    if (emblaApi) emblaApi.scrollTo(index);
  }

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", () => setActiveSnap(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <Box ref={emblaRef} overflow="hidden">
      <Flex flexDirection="row" height="auto">
        {desserts.map((dessert) => (
          <Box
            key={dessert._id}
            flex={["0 0 300px", "0 0 1049px"]}
            minWidth={0}
            position="relative"
            paddingLeft={[3, 12]}
          >
            <Box position="relative">
              <Box height={[600]}>
                <Image
                  src={urlForImage(dessert.coverImage.asset).height(600).url()}
                  alt={dessert.coverImage.alt}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  fill
                />
              </Box>
              <Box
                position="absolute"
                top={0}
                bottom={0}
                width="100%"
                px={[6, 12]}
                py={[10, 16]}
              >
                <Flex
                  width="100%"
                  height="100%"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Box>
                    <Text
                      width="fit-content"
                      px="4px"
                      backgroundColor="white"
                      color="#1B1B1B"
                      fontSize="20px"
                      fontWeight="bold"
                      borderRadius="4px"
                    >
                      {dessert.collaborator}
                    </Text>
                    <Heading color="white" display="inline" fontSize="40px">
                      {dessert.name}{" "}
                    </Heading>

                    <Text fontSize="20px" color="white">
                      postre de {getDateString(dessert.date)}
                    </Text>
                  </Box>
                  <Box>
                    <Box display={["block", "flex"]}>
                      <Box mr={[0, 4]}>
                        <ButtonLink
                          href={`/postre-del-mes/${dessert.slug.current}`}
                        >
                          ver más
                        </ButtonLink>
                      </Box>
                      <Box mt={[4, 0]}>
                        <ButtonLink
                          href="/postre-del-mes"
                          variant="transparent"
                        >
                          conoce todos los postres
                        </ButtonLink>
                      </Box>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        ))}
      </Flex>
      <Box mt={10}>
        <Flex justifyContent="center">
          <Flex>
            {scrollSnaps.map((_, index) => {
              const isCurrentSlide = index === activeSnap;
              return (
                <Box
                  key={index}
                  width="12px"
                  height="12px"
                  borderRadius="50%"
                  backgroundColor={isCurrentSlide ? "#737373" : "#e1e1e1"}
                  cursor="pointer"
                  mr={4}
                  onClick={() => goToSlide(index)}
                />
              );
            })}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
