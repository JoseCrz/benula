import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Box, type BoxProps, Button, Flex, Icon } from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { ButtonLink, type ButtonLinkProps, Container } from "@/components";

import logoWhite from "@/public/images/logo-white.png";
import logoBlack from "@/public/images/logo-black.png";

type HeaderVariant = "default" | "transparent";

type HeaderVariantStyleMap = {
  [Key in HeaderVariant]: {
    [P in "base" | "solid"]: {
      logo: StaticImageData;
      textColor: string;
      buttonLinkVariant: ButtonLinkProps["variant"];
      backgroundColor: string;
    };
  };
};

const headerVariantsStyle: HeaderVariantStyleMap = {
  default: {
    base: {
      logo: logoBlack,
      textColor: "black",
      buttonLinkVariant: "primary",
      backgroundColor: "white",
    },
    solid: {
      logo: logoBlack,
      textColor: "black",
      buttonLinkVariant: "primary",
      backgroundColor: "white",
    },
  },
  transparent: {
    base: {
      logo: logoWhite,
      textColor: "white",
      buttonLinkVariant: "transparent",
      backgroundColor: "transparent",
    },
    solid: {
      logo: logoBlack,
      textColor: "black",
      buttonLinkVariant: "primary",
      backgroundColor: "white",
    },
  },
};

export type HeaderProps = {
  variant?: HeaderVariant;
} & BoxProps;

export function Header({ variant = "default", ...rest }: HeaderProps) {
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsSolid(window.scrollY >= 1);
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <Box position="sticky" top={0} left={0} right={0} zIndex={99999}>
      <DesktopHeader variant={variant} isSolid={isSolid} />
      <MobileHeader variant={variant} isSolid={isSolid} />
    </Box>
  );
}

function DesktopHeader({
  variant,
  isSolid,
}: {
  variant: HeaderVariant;
  isSolid: boolean;
}) {
  const variantStyles =
    headerVariantsStyle[variant][isSolid ? "solid" : "base"];

  return (
    <Box
      transition="background 0.2s, box-shadow 0.2s"
      backgroundColor={variantStyles.backgroundColor}
      boxShadow={isSolid ? "md" : "none"}
    >
      <Container>
        <Box as="header" display={["none", "block"]} py={6}>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Link href="/">
                <Image
                  src={variantStyles.logo}
                  width={90}
                  height={42}
                  alt="Benúla Logo"
                  priority
                />
              </Link>
            </Box>
            <Flex display={["none", "flex"]} alignItems="center">
              <Box
                color={variantStyles.textColor}
                mr={6}
                _hover={{ textDecoration: "underline" }}
              >
                <Link href="/postre-del-mes">postre del mes</Link>
              </Box>
              <ButtonLink
                href="/menu"
                variant={variantStyles.buttonLinkVariant}
              >
                conoce nuestro menú
              </ButtonLink>
            </Flex>
            <Button display={["block", "none"]} backgroundColor="transparent">
              <Icon
                as={FaBars}
                color={variantStyles.textColor}
                fontSize="24px"
              />
            </Button>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}

function MobileHeader({
  isSolid,
  variant,
}: {
  variant: HeaderVariant;
  isSolid: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const variantStyles =
    headerVariantsStyle[variant][isOpen || isSolid ? "solid" : "base"];

  return (
    <Box
      position="relative"
      transition="background 0.2s, box-shadow 0.2s"
      backgroundColor={variantStyles.backgroundColor}
      boxShadow={isSolid ? "md" : "none"}
    >
      <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
        <Container>
          <Box as="header" display={["block", "none"]} py={3}>
            <Flex justifyContent="space-between" alignItems="center">
              <Box position="relative" width="90px" height="42px">
                <Link href="/">
                  <Image
                    src={variantStyles.logo}
                    width={90}
                    height={42}
                    alt="Benúla Logo"
                    priority
                  />
                </Link>
              </Box>
              <Collapsible.Trigger asChild>
                <Button
                  display={["block", "none"]}
                  backgroundColor="transparent"
                  _hover={{
                    background: "#EFEFEF",
                  }}
                  _active={{
                    background: "#EFEFEF",
                  }}
                >
                  <Icon
                    as={isOpen ? FaTimes : FaBars}
                    color={variantStyles.textColor}
                    fontSize="24px"
                  />
                </Button>
              </Collapsible.Trigger>
            </Flex>
          </Box>
        </Container>
        <Collapsible.Content>
          <Box
            position="absolute"
            width="100%"
            minHeight="calc(100vh - 64px)"
            zIndex={1}
            background="#81191A"
            textAlign="center"
            color="white"
            fontWeight="semibold"
            fontSize="24px"
            boxShadow="md"
          >
            <Flex
              minHeight="inherit"
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
            >
              <Box mb={6}>
                <Link href="/">home</Link>
              </Box>
              <Box mb={6}>
                <Link href="/menu">menú</Link>
              </Box>
              <Box>
                <Link href="/postre-del-mes">postre del mes</Link>
              </Box>
            </Flex>
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}
