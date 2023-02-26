import Image from "next/image";
import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { ButtonLink, Container, Layout, Section } from "@/components";

import nubeImage from "@/public/images/mocks/nube.jpeg";
import { gridData } from "@/mocks";

export default function DesertOfTheMonth() {
  return (
    <Layout>
      <Section pt={18} pb={12}>
        <Container>
          <Heading as="h1" fontSize="42px">
            postre del mes
          </Heading>
          <Text fontSize="18px" mt={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <Flex mt={12} alignItems="center">
            <Box position="relative" width="656px" height="510px">
              <Image
                src={nubeImage}
                alt="nube de guayaba"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                priority
                fill
              />
            </Box>
            <Box ml={12} maxWidth="411px">
              <Text fontSize="14px">
                <strong>chef victor mendoza</strong>
              </Text>
              <Heading as="h2" fontSize="32px" mt={2}>
                nube de pistache
              </Heading>
              <Text mt={2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros.
              </Text>
              <Flex mt={6}>
                <Box mr={6}>
                  <ButtonLink href="/">ver más</ButtonLink>
                </Box>
                <Box>
                  <ButtonLink href="/" variant="black">
                    conoce todos los postres
                  </ButtonLink>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Section>
      <Section py={12} backgroundColor="#FAFAFA">
        <Container>
          <Grid
            gridTemplateColumns="repeat(2, 1fr)"
            columnGap={12}
            rowGap="61px"
          >
            {gridData.map((item) => (
              <Box key={item.id}>
                <Box position="relative" width="100%" height="300px">
                  <Image
                    src={item.imageSrc}
                    alt={item.altText}
                    placeholder="blur"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    fill
                  />
                </Box>
                <Text mt={6} fontSize="14px" fontWeight="bold">
                  {item.date}
                </Text>
                <Heading as="h3" mt={2} fontSize="24px">
                  {item.title}
                </Heading>
                <Text mt={2}>{item.text}</Text>
                <Box mt={6}>
                  <ButtonLink href={item.seeMoreUrl}>ver más</ButtonLink>
                </Box>
              </Box>
            ))}
          </Grid>
          <Flex justifyContent="center" mt={20}>
            <Button
              backgroundColor="transparent"
              // borderBottom="1px solid black"
              // borderBottomRadius={0}
            >
              cargar más...
            </Button>
          </Flex>
        </Container>
      </Section>
    </Layout>
  );
}
