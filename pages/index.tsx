import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Grid, Heading, Icon, Text } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import {
  ButtonLink,
  Carousel,
  Container,
  Footer,
  Header,
  Highlight,
  Section,
} from "@/components";

import nubeImage from "@/public/images/nube.jpeg";
import waveSvg from "@/public/images/wave.svg";
import coffeeMethodsImage from "@/public/images/coffee-methods.jpeg";
import benulasImage from "@/public/images/benulas.jpeg";

import { carouselData, gridData, staffData } from "@/mocks";

export default function Home() {
  return (
    <>
      <Head>
        <title>Benúla</title>
        <meta name="description" content="Café bello, postres bellos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section position="relative">
        <Box position="relative" width="100%" height={865}>
          <Image
            src={nubeImage}
            alt="Nube de Guayaba"
            priority
            placeholder="blur"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            fill
          />
          <Box position="absolute" top={0} maxWidth="45%" py="200px">
            <Container>
              <Heading as="h1" fontSize="56px" color="white">
                Nombre del postre del mes
              </Heading>
              <Text color="white" mt={6} fontSize="xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                commodo diam libero vitae erat.
              </Text>
              <Flex mt={10}>
                <Box mr={4}>
                  <ButtonLink href="/">ver más</ButtonLink>
                </Box>
                <Box>
                  <ButtonLink href="/" variant="transparent">
                    conoce todos los postres
                  </ButtonLink>
                </Box>
              </Flex>
            </Container>
          </Box>
          <Header position="absolute" top={0} width="100%" transparent />
        </Box>
      </Section>
      <Section pt={16} pb="157px" textAlign="center" position="relative">
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
          <Heading mt={4} fontSize="40px">
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
        <Box position="absolute" width="100%" height={130} bottom={0}>
          <Image src={waveSvg} alt="" fill />
        </Box>
      </Section>
      <Section backgroundColor="#FAFAFA" pb={12}>
        <Carousel totalSlides={carouselData.length}>
          {carouselData.map((item) => (
            <Carousel.Slide
              key={item.id}
              name={item.name}
              author={item.author}
              month={item.month}
              imageSrc={item.image}
              altText={item.altText}
              seeMoreUrl={item.seeMoreUrl}
              seeAllUrl={item.seeAllUrl}
            />
          ))}
        </Carousel>
      </Section>
      <Section
        py={24}
        background="linear-gradient(to bottom, #FAFAFA, #E4D4C4)"
      >
        <Container>
          <Flex justifyContent="space-between">
            <Heading as="h2" fontSize="42px">
              café <Highlight>bello</Highlight>, postres{" "}
              <Highlight>bellos</Highlight>
            </Heading>
            <Text maxWidth="565px">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla.
            </Text>
          </Flex>
          <Grid mt={20} gridTemplateColumns="repeat(3, 1fr)" gap={12}>
            {gridData.map((item) => (
              <Box key={item.id}>
                <Box
                  position="relative"
                  width="100%"
                  maxWidth="405px"
                  height="240px"
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.altText}
                    placeholder="blur"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    fill
                  />
                </Box>
                <Heading as="h3" mt={8} fontSize="24px">
                  {item.title}
                </Heading>
                <Text mt={4} mb={8}>
                  {item.text}
                </Text>
                <Link href={item.seeMoreUrl}>
                  <Flex alignItems="center">
                    ver más <Icon as={FaChevronRight} ml={2} />
                  </Flex>
                </Link>
              </Box>
            ))}
          </Grid>
        </Container>
      </Section>
      <Section position="relative" width="100%" height="378px">
        <Image
          src={coffeeMethodsImage}
          alt="una repisa con distintos dispositivimos para preparar café como: V60, Chemex, Aeropress, Prensa Frances y más."
          placeholder="blur"
          fill
        />
        <Box
          position="absolute"
          top={0}
          bottom={0}
          width="100%"
          backgroundColor="rgba(0,0,0,0.4)"
        >
          <Container height="100%">
            <Flex
              justifyContent="space-between"
              alignItems="center"
              height="100%"
            >
              <Box>
                <Heading as="h2" fontSize="80px" color="white">
                  métodos de café
                </Heading>
                <Text mt={3} fontWeight="20px" color="white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
              </Box>
              <Box>
                <ButtonLink href="/" variant="white">
                  conócelos todos aquí
                </ButtonLink>
              </Box>
            </Flex>
          </Container>
        </Box>
      </Section>
      <Section py={24}>
        <Container>
          <Heading as="h2" fontSize="42px">
            el equipo <Highlight>benúla</Highlight>
          </Heading>
          <Text mt={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <Grid mt={12} gridTemplateColumns="repeat(2, 1fr)" gap={16}>
            {staffData.map((item) => (
              <Box key={item.id}>
                <Box position="relative" width="100%" height="405px">
                  <Image
                    src={item.imageSrc}
                    alt={item.altText}
                    placeholder="blur"
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
                    {item.name}
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
                      <strong>{item.role}</strong>
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Grid>
        </Container>
      </Section>
      <Section py={24} backgroundColor="#F6F5F4">
        <Container>
          <Box backgroundColor="#81191A">
            <Grid gridTemplateColumns="1fr 2fr">
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
              <Box>
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
      <Footer />
    </>
  );
}
