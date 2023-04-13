import { useState } from "react";
import Image from "next/image";
import type { InferGetStaticPropsType } from "next";
import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { ButtonLink, Container, Layout, Section } from "@/components";

import { getDateString, urlForImage } from "@/sanity/utils";
import { getAllDeserts } from "@/sanity/queries";

const DESSERTS_PER_PAGE = 4;

export async function getStaticProps() {
  const allDesserts = await getAllDeserts();
  return {
    props: {
      allDesserts,
    },
  };
}

type DessertOfTheMonthPageProps = InferGetStaticPropsType<
  typeof getStaticProps
>;

export default function DesertOfTheMonth({
  allDesserts,
}: DessertOfTheMonthPageProps) {
  const [firstDessert, ...restOfDesserts] = allDesserts;

  const [visibleAmount, setVisibleAmount] = useState(DESSERTS_PER_PAGE);

  const visibileDesserts = restOfDesserts.slice(0, visibleAmount);

  const hasMoreDesserts = restOfDesserts.length > visibleAmount;

  return (
    <Layout title="Postre del mes | Benúla">
      <Section pt={[16, 18]} pb={[16, 12]}>
        <Container>
          <Heading as="h1" fontSize="42px">
            postre del mes
          </Heading>
          <Text fontSize="18px" mt={4}>
            cada mes tendremos un chef o cocinero invitado para preparar
            &quot;el postre del mes&quot; que estará disponible en nuestra carta
            durante 30 días.
          </Text>
          <Flex
            flexDirection={["column", "row"]}
            mt={[10, 12]}
            alignItems="center"
          >
            <Box
              position="relative"
              width={["100%", "656px"]}
              height={["320px", "510px"]}
            >
              <Image
                src={urlForImage(firstDessert.coverImage.asset)
                  .width(656)
                  .height(510)
                  .url()}
                alt={firstDessert.coverImage.alt}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                priority
                fill
              />
            </Box>
            <Box mt={[10, 0]} ml={[0, 12]} maxWidth={["100%", "411px"]}>
              <Text fontSize="14px">
                <strong>{getDateString(firstDessert.date)}</strong>
              </Text>
              <Heading as="h2" fontSize="32px" mt={2}>
                {firstDessert.name}
              </Heading>
              <Text mt={2}>{firstDessert.excerpt}</Text>
              <Box display={["block", "flex"]} mt={[4, 6]}>
                <Box mr={[0, 6]}>
                  <ButtonLink
                    href={`/postre-del-mes/${firstDessert.slug.current}`}
                  >
                    ver más
                  </ButtonLink>
                </Box>
                <Box mt={[4, 0]}>
                  <ButtonLink href="/" variant="black">
                    conoce todos los postres
                  </ButtonLink>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Section>
      <Section py={12} backgroundColor="#FAFAFA">
        <Container>
          <Grid
            gridTemplateColumns={["1fr", "repeat(2, 1fr)"]}
            columnGap={12}
            rowGap="61px"
          >
            {visibileDesserts.map((dessert) => (
              <Box
                key={dessert._id}
                borderBottom={["1px solid #DADADA", "none"]}
                pb={[10, 0]}
              >
                <Box position="relative" width="100%" height="300px">
                  <Image
                    src={urlForImage(dessert.coverImage.asset)
                      .height(300)
                      .url()}
                    alt={dessert.coverImage.alt}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    fill
                  />
                </Box>
                <Text mt={6} fontSize="14px" fontWeight="bold">
                  {getDateString(dessert.date)}
                </Text>
                <Heading as="h3" mt={2} fontSize="24px">
                  {dessert.name}
                </Heading>
                <Text mt={2}>{dessert.excerpt}</Text>
                <Box mt={6}>
                  <ButtonLink href={`/postre-del-mes/${dessert.slug.current}`}>
                    ver más
                  </ButtonLink>
                </Box>
              </Box>
            ))}
          </Grid>
          {hasMoreDesserts && (
            <Flex justifyContent="center" mt={20}>
              <Button
                backgroundColor="transparent"
                onClick={() =>
                  setVisibleAmount(
                    (prevAmount) => prevAmount + DESSERTS_PER_PAGE
                  )
                }
              >
                cargar más...
              </Button>
            </Flex>
          )}
        </Container>
      </Section>
    </Layout>
  );
}
