import { useState, useEffect } from "react";
import Image from "next/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";
import { ButtonLink } from "@/components";

import type { MenuItem } from "@/sanity/schemas";
import { urlForImage } from "@/sanity/utils";

type CarouselProps = { menuItems: MenuItem[] };

export function DessertsCarousel({ menuItems }: CarouselProps) {
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

  if (menuItems.length === 0) return null;

  return (
    <Box ref={emblaRef} overflow="hidden">
      <Flex flexDirection="row" height="auto">
        {menuItems.map((menuItem) => (
          <Box
            key={menuItem._id}
            flex={["0 0 300px", "0 0 1049px"]}
            minWidth={0}
            position="relative"
            paddingLeft={[3, 12]}
          >
            {!menuItem.images[0]?.asset ? null : (
              <Box position="relative">
                <Box height={[600]}>
                  <Image
                    src={urlForImage(menuItem.images[0].asset)
                      .height(600)
                      .url()}
                    alt={menuItem.images[0].alt}
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
                  backgroundColor="rgba(0,0,0,.30)"
                >
                  <Flex
                    width="100%"
                    height="100%"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Heading color="white" display="inline" fontSize="40px">
                        {menuItem.name}{" "}
                      </Heading>
                      {menuItem.excerpt && (
                        <Text fontSize="20px" color="white">
                          {menuItem.excerpt}
                        </Text>
                      )}
                    </Box>
                    <Box>
                      <Box display={["block", "flex"]}>
                        {menuItem.slug && (
                          <Box mr={[0, 4]}>
                            <ButtonLink href={`/menu/${menuItem.slug.current}`}>
                              ver más
                            </ButtonLink>
                          </Box>
                        )}
                        <Box mt={[4, 0]}>
                          <ButtonLink href="/menu" variant="transparent">
                            conoce todos los postres
                          </ButtonLink>
                        </Box>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            )}
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
