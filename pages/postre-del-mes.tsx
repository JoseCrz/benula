import Image from "next/image";
import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { ButtonLink, Container, Layout, Section } from "@/components";

import nubeImage from "@/public/images/mocks/nube.jpeg";
import { gridData } from "@/mocks";

export default function DesertOfTheMonth() {
  return (
    <Layout title="Postre del mes | Benúla">
      <Section pt={[16, 18]} pb={[16, 12]}>
        <Container>
          <Heading as="h1" fontSize="42px">
            postre del mes
          </Heading>
          <Text fontSize="18px" mt={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
            <Box mt={[10, 0]} ml={[0, 12]} maxWidth={["100%", "411px"]}>
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
              <Box display={["block", "flex"]} mt={[4, 6]}>
                <Box mr={[0, 6]}>
                  <ButtonLink href="/">ver más</ButtonLink>
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
            {gridData.map((item) => (
              <Box
                key={item.id}
                borderBottom={["1px solid #DADADA", "none"]}
                pb={[10, 0]}
              >
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
            <Button backgroundColor="transparent">cargar más...</Button>
          </Flex>
        </Container>
      </Section>
    </Layout>
  );
}
