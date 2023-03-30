import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import {
  ButtonLink,
  DessertsCarousel,
  Container,
  Highlight,
  Section,
  Layout,
} from "@/components";
import { FeaturedSection } from "@/sections";

import waveSvg from "@/public/images/wave.svg";
import coffeeMethodsImage from "@/public/images/coffee-methods.jpeg";
import benulasImage from "@/public/images/benulas.jpeg";

import {
  getLatestDesserts,
  getAllStaffMembers,
  getLatestMenuItemsWithDetail,
} from "@/sanity/queries";
import { urlForImage } from "@/sanity/utils";

export async function getStaticProps() {
  const [latestDesserts, latestMenuItemsWithDetail, staffMembers] =
    await Promise.all([
      getLatestDesserts(),
      getLatestMenuItemsWithDetail(),
      getAllStaffMembers(),
    ]);

  return {
    props: {
      staffMembers,
      latestDesserts,
      latestMenuItemsWithDetail,
    },
  };
}

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({
  staffMembers,
  latestDesserts,
  latestMenuItemsWithDetail,
}: HomePageProps) {
  console.log("🚀 ~ latestMenuItemsWithDetail:", latestMenuItemsWithDetail);
  const [firstDessert, ...restOfDesserts] = latestDesserts;
  return (
    <Layout title="Benúla" headerVariant="transparent">
      <Section mt={["-66px", "-90px"]}>
        <Box
          position="relative"
          width="100%"
          height={["auto", 865]}
          minHeight={["100vh", "auto"]}
        >
          <Image
            src={urlForImage(firstDessert.coverImage.asset).height(865).url()}
            alt={firstDessert.coverImage.alt}
            priority
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            fill
          />
          <Box
            position="absolute"
            top={0}
            maxWidth={["100%", "45%"]}
            py="200px"
          >
            <Container>
              <Heading as="h1" fontSize={["42px", "56px"]} color="white">
                {firstDessert.name}
              </Heading>
              <Text color="white" mt={6} fontSize={["16px", "xl"]}>
                {firstDessert.excerpt}
              </Text>
              <Box display={["block", "flex"]} mt={10}>
                <Box mr={[0, 4]}>
                  <ButtonLink
                    href={`/postre-del-mes/${firstDessert.slug.current}`}
                  >
                    ver más
                  </ButtonLink>
                </Box>
                <Box mt={[4, 0]}>
                  <ButtonLink href="/postre-del-mes" variant="transparent">
                    conoce todos los postres
                  </ButtonLink>
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      </Section>
      <Section
        pt={["200px", 16]}
        pb={["200px", "157px"]}
        textAlign="center"
        position="relative"
      >
        <Container>
          <Box
            display="inline-block"
            backgroundColor="#F8EFDE"
            px={9}
            py={2}
            borderRadius="10px"
          >
            <Text>
              <strong>¿alguien dijo postres?</strong>
            </Text>
          </Box>
          <Heading mt={4} fontSize={["42px", "40px"]}>
            te presentamos{" "}
            <Text as="span" color="#81191A">
              nuestros favoritos
            </Text>
          </Heading>
          <Text mt={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <Box mt={6}>
            <ButtonLink href="/menu">conócelos todos aquí</ButtonLink>
          </Box>
        </Container>
        <Box
          display={["none", "block"]}
          position="absolute"
          width="100%"
          height={130}
          bottom={0}
        >
          <Image src={waveSvg} alt="" fill />
        </Box>
      </Section>
      <Section backgroundColor="#FAFAFA" pb={12}>
        <DessertsCarousel desserts={restOfDesserts} />
      </Section>
      <FeaturedSection gridItems={latestMenuItemsWithDetail} />
      <Section position="relative" width="100%" height={["607px", "378px"]}>
        <Image
          src={coffeeMethodsImage}
          alt="una repisa con distintos dispositivimos para preparar café como: V60, Chemex, Aeropress, Prensa Frances y más."
          placeholder="blur"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          fill
        />
        <Box
          position="absolute"
          top={0}
          bottom={0}
          width="100%"
          backgroundColor="rgba(0,0,0,0.4)"
          pb={["112px", 0]}
        >
          <Container height="100%">
            <Flex
              flexDirection={["column", "row"]}
              justifyContent={["flex-end", "space-between"]}
              alignItems={["left", "center"]}
              height="100%"
            >
              <Box>
                <Heading as="h2" fontSize={["42px", "80px"]} color="white">
                  métodos de café
                </Heading>
                <Text mt={3} fontSize={["16px", "20px"]} color="white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
              </Box>
              <Box mt={[6, 0]}>
                <ButtonLink href="/" variant="white">
                  conócelos todos aquí
                </ButtonLink>
              </Box>
            </Flex>
          </Container>
        </Box>
      </Section>
      <Section py={[12, 24]}>
        <Container>
          <Heading as="h2" fontSize="42px">
            el equipo <Highlight>benúla</Highlight>
          </Heading>
          <Text mt={[3, 4]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <Grid
            mt={[10, 12]}
            gridTemplateColumns={["1fr", "repeat(2, 1fr)"]}
            gap={16}
          >
            {staffMembers.map((member) => (
              <Box key={member._id}>
                <Box position="relative" width="100%" height="405px">
                  <Image
                    src={urlForImage(member.image).height(405).url()}
                    alt={member.image.alt}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    fill
                  />
                </Box>
                <Box textAlign="center">
                  <Heading
                    as="h3"
                    mt={6}
                    fontSize="42px"
                    color="#81191A"
                    textDecor="underline"
                  >
                    {member.name}
                  </Heading>
                  <Box
                    mt={3}
                    display="inline-block"
                    backgroundColor="#F8EFDE"
                    px={9}
                    py={2}
                    borderRadius="10px"
                  >
                    <Text>
                      <strong>{member.role}</strong>
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Grid>
        </Container>
      </Section>
      <Section pt={[20, 24]} pb={[0, 24]} backgroundColor="#81191A">
        <Container>
          <Box backgroundColor="#81191A">
            <Grid gridTemplateColumns={["1fr", "1fr 2fr"]} gap={[20, 0]}>
              <Box textAlign="center" color="white" alignSelf="center">
                <Text>estamos en pleno</Text>
                <Text fontSize="36px">
                  <strong>centro de xalapa</strong>
                </Text>
                <Text
                  mt={4}
                  display="inline-block"
                  backgroundColor="white"
                  color="#81191A"
                  py={1}
                  px={3}
                  borderRadius="20px"
                >
                  <strong>diego leño #20 xalapa, veracruz</strong>
                </Text>
                <Text mt={3} textDecor="underline">
                  <Link href="/" target="_blank" rel="noopener noreferrer">
                    llega con google maps
                  </Link>
                </Text>
                <Text mt={8} fontSize="20px">
                  <strong>horarios</strong>
                </Text>
                <Text>
                  lun 9:30 am - 9:00 pm
                  <br />
                  mar 9:30 am - 9:00 pm
                  <br />
                  mié cerrado
                  <br />
                  jue 9:30 am - 9:00 pm
                  <br />
                  vie 9:30 am - 9:00 pm
                  <br />
                  sáb 9:30 am - 9:00 pm
                  <br />
                  dom 10:00 am - 8:00 pm
                </Text>
              </Box>
              <Box mx={[-4, 0]}>
                <Image
                  src={benulasImage}
                  alt="paula y benjamín afuera de benúla"
                  placeholder="blur"
                />
              </Box>
            </Grid>
          </Box>
        </Container>
      </Section>
    </Layout>
  );
}
