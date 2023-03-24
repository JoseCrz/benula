import { useState, useEffect } from "react";
import Image from "next/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";
import { ButtonLink } from "@/components";

import type { Dessert } from "@/sanity/schemas";
import { urlForImage } from "@/sanity/utils";

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
                    <Heading color="white" display="inline" fontSize="40px">
                      {dessert.name}{" "}
                    </Heading>
                    <Text
                      as="span"
                      display={["block", "inline"]}
                      color="#81191A"
                      fontSize="24px"
                      fontWeight={400}
                    >
                      {dessert.collaborator}
                    </Text>
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

const months: Record<number, string> = {
  0: "enero",
  1: "febrero",
  2: "marzo",
  3: "abril",
  4: "mayo",
  5: "junio",
  6: "julio",
  7: "agosto",
  8: "septiembre",
  9: "octubre",
  10: "noviembre",
  11: "diciembre",
};

function getDateString(date: string) {
  const currentDate = new Date(date);
  const currentMonth = currentDate.getUTCMonth();
  const currentYear = currentDate.getUTCFullYear();
  return `${months[currentMonth]} del ${currentYear}`;
}