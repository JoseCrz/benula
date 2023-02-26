import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ButtonLink, Container, type ContainerProps } from "@/components";

export type HeaderProps = ContainerProps;

export function Header(props: HeaderProps) {
  return (
    <Container {...props}>
      <Box as="header" mt={6}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Link href="/">
              <Image
                src="/images/logo-white.svg"
                width={90}
                height={42}
                alt="Benúla Logo"
                priority
              />
            </Link>
          </Box>
          <Flex alignItems="center">
            <Box color="white" mr={6}>
              <Link href="/">postre del mes</Link>
            </Box>
            <ButtonLink href="/menu" variant="transparent">
              conoce nuestro menú
            </ButtonLink>
          </Flex>
        </Flex>
      </Box>
      <Box maxWidth="45%" py="200px">
        <Heading as="h1" fontSize="56px" color="white">
          Nombre del postre del mes
        </Heading>
        <Text color="white" mt={6} fontSize="xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
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
      </Box>
    </Container>
  );
}
