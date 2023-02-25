import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import {
  FaWhatsapp,
  FaTiktok,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Container, Section } from "@/components";

export function Footer() {
  return (
    <Section py={20}>
      <Container>
        <Box as="footer">
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Link href="/">
                <Image
                  src="/images/logo-black.svg"
                  width={90}
                  height={42}
                  alt="Benúla Logo"
                />
              </Link>
            </Box>
            <Box>
              <Box as="nav">
                <Box
                  display="flex"
                  margin={0}
                  padding={0}
                  as="ul"
                  listStyleType="none"
                >
                  <Box as="li" mr={8}>
                    <Link href="/">
                      <strong>home</strong>
                    </Link>
                  </Box>
                  <Box as="li" mr={8}>
                    <Link href="/menu">
                      <strong>carta de alimentos</strong>
                    </Link>
                  </Box>
                  <Box as="li">
                    <Link href="/postre-del-mes">
                      <strong>postre del mes</strong>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>
              <Flex>
                <Link href="/">
                  <Icon as={FaWhatsapp} mr={3} fontSize="24px" />
                </Link>
                <Icon as={FaTiktok} mr={3} fontSize="24px" />
                <Icon as={FaFacebook} mr={3} fontSize="24px" />
                <Icon as={FaInstagram} mr={3} fontSize="24px" />
                <Icon as={FaTwitter} fontSize="24px" />
              </Flex>
            </Box>
          </Flex>
          <Box mt={20} height="1px" backgroundColor="#F3F3F3"></Box>
          <Flex justifyContent="center">
            <Box
              mt={8}
              backgroundColor="#F3F3F3"
              px={6}
              py={2}
              borderRadius="8px"
            >
              <Flex alignItems="center">
                <Text mr={3}>
                  <strong>reservaciones de 10 am a 5 pm</strong>
                </Text>

                <Box mr={3}>
                  <Link href="/">
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      width="60px"
                      height="60px"
                      borderRadius="50%"
                      backgroundColor="white"
                    >
                      <Icon as={FaInstagram} fontSize="35px" />
                    </Flex>
                  </Link>
                </Box>
                <Box>
                  <Link href="/">
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      width="60px"
                      height="60px"
                      borderRadius="50%"
                      backgroundColor="white"
                    >
                      <Icon as={FaWhatsapp} fontSize="35px" />
                    </Flex>
                  </Link>
                </Box>
              </Flex>
            </Box>
          </Flex>
          <Text textAlign="center" mt={8}>
            2022 Benúla. Todos los derechos reservados
          </Text>
        </Box>
      </Container>
    </Section>
  );
}
