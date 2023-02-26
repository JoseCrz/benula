import Image from "next/image";
import Link from "next/link";
import { Box, Flex } from "@chakra-ui/react";
import { ButtonLink, Container, type ContainerProps } from "@/components";

export type HeaderProps = {
  transparent?: boolean;
} & ContainerProps;

export function Header({ transparent = false, ...rest }: HeaderProps) {
  return (
    <Container {...rest}>
      <Box as="header" mt={6}>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Link href="/">
              <Image
                src={`images/logo-${transparent ? "white" : "black"}.svg`}
                width={90}
                height={42}
                alt="Benúla Logo"
                priority
              />
            </Link>
          </Box>
          <Flex alignItems="center">
            <Box color={transparent ? "white" : "black"} mr={6}>
              <Link href="/postre-del-mes">postre del mes</Link>
            </Box>
            <ButtonLink
              href="/menu"
              variant={transparent ? "transparent" : "primary"}
            >
              conoce nuestro menú
            </ButtonLink>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
}
