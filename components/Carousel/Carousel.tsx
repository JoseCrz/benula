import { useState, useEffect } from "react";
import Image, { type ImageProps } from "next/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";
import { ButtonLink } from "@/components";

type CarouselProps = { children: React.ReactNode };

export function Carousel({ children }: CarouselProps) {
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
        {children}
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
// ==================================================
// Children Components

type SlideProps = {
  imageSrc: ImageProps["src"];
  altText: string;
  name: string;
  author: string;
  month: string;
  seeMoreUrl: string;
  seeAllUrl: string;
};

Carousel.Slide = function Slide({
  imageSrc,
  altText,
  name,
  author,
  month,
  seeMoreUrl,
  seeAllUrl,
}: SlideProps) {
  return (
    <Box flex="0 0 1049px" minWidth={0} paddingLeft={12}>
      <Image
        src={imageSrc}
        alt={altText}
        width={1049}
        height={600}
        placeholder="blur"
        style={{
          maxHeight: "600px",
          objectFit: "cover",
          objectPosition: "center",
        }}
        // fill
      />
      <Box position="absolute" top={0} bottom={0} width="100%" px={12} py={16}>
        <Flex
          width="100%"
          height="100%"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
            <Heading color="white" display="inline" fontSize="40px">
              {name}{" "}
              <Text as="span" color="#81191A" fontSize="24px" fontWeight={400}>
                {author}
              </Text>
            </Heading>
            <Text fontSize="20px" color="white">
              postre de {month}
            </Text>
          </Box>
          <Box>
            <Flex>
              <Box mr={4}>
                <ButtonLink href={seeMoreUrl}>ver más</ButtonLink>
              </Box>
              <Box>
                <ButtonLink href={seeAllUrl} variant="transparent">
                  conoce todos los postres
                </ButtonLink>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
