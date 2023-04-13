import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Grid, Heading, Icon, Text } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";

import { Container, Highlight, Section } from "@/components";
import type { MenuItem, Dessert } from "@/sanity/schemas";
import { urlForImage } from "@/sanity/utils";

type FeaturedSectionProps = {
  gridItems: MenuItem[] | Dessert[];
};

export function FeaturedSection({ gridItems }: FeaturedSectionProps) {
  return (
    <Section py={24} background="linear-gradient(to bottom, #FAFAFA, #E4D4C4)">
      <Container>
        <Flex flexDirection={["column", "row"]} justifyContent="space-between">
          <Heading as="h2" fontSize="42px">
            brunch en <Highlight>benúla</Highlight>
          </Heading>
          <Text
            mt={[4, 0]}
            maxWidth={["100%", "565px"]}
            fontSize="20px"
            mr={["48px"]}
          >
            disponible en horario de 9:30am a 3:00pm.
            <br />
            aquí te dejamos algunos platillos destacados
          </Text>
        </Flex>
        <Grid
          mt={[10, 20]}
          gridTemplateColumns={["1fr", "repeat(3, 1fr)"]}
          gap={12}
        >
          {gridItems.map((item) => {
            const itemImage =
              item._type === "dessert" ? item.coverImage : item.images[0];

            const itemHref =
              item._type === "dessert"
                ? `/postre-del-mes/${item.slug.current}`
                : `/menu/${item.slug?.current}`;

            return (
              <Box key={item._id}>
                <Box
                  position="relative"
                  width="100%"
                  maxWidth="405px"
                  height="240px"
                >
                  <Image
                    src={urlForImage(itemImage.asset)
                      .height(240)
                      .width(405)
                      .url()}
                    alt={itemImage.alt}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    fill
                  />
                </Box>
                <Heading as="h3" mt={8} fontSize="24px">
                  {item.name}
                </Heading>
                <Text mt={4} mb={8}>
                  {item.excerpt}
                </Text>
                <Link href={itemHref}>
                  <Flex
                    alignItems="center"
                    _hover={{ textDecoration: "underline" }}
                  >
                    ver más <Icon as={FaChevronRight} ml={2} />
                  </Flex>
                </Link>
              </Box>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
