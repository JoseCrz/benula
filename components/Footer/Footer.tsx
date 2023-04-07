import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FaWhatsapp, FaTiktok, FaFacebook, FaInstagram } from "react-icons/fa";
import { Container, Section } from "@/components";

export function Footer() {
  return (
    <Section py={20}>
      <Container>
        <Box as="footer">
          <Flex
            flexDirection={["column", "row"]}
            justifyContent={["unset", "space-between"]}
            alignItems="center"
          >
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
            <Box mt={[8, 0]}>
              <Box as="nav">
                <Box
                  display="flex"
                  margin={0}
                  padding={0}
                  as="ul"
                  listStyleType="none"
                  fontSize={["14px", "16px"]}
                >
                  <Box
                    as="li"
                    mr={8}
                    _hover={{
                      color: "#81191A",
                    }}
                  >
                    <Link href="/">
                      <strong>home</strong>
                    </Link>
                  </Box>
                  <Box
                    as="li"
                    mr={8}
                    _hover={{
                      color: "#81191A",
                    }}
                  >
                    <Link href="/menu">
                      <strong>carta de alimentos</strong>
                    </Link>
                  </Box>
                  <Box
                    as="li"
                    _hover={{
                      color: "#81191A",
                    }}
                  >
                    <Link href="/postre-del-mes">
                      <strong>postre del mes</strong>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box mt={[8, 0]}>
              <Flex>
                <Link
                  href="https://wa.me/5212282367656"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    as={FaWhatsapp}
                    mr={3}
                    fontSize="24px"
                    _hover={{
                      color: "#81191A",
                    }}
                  />
                </Link>
                <Link
                  href="https://www.tiktok.com/@benulapostreria"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    as={FaTiktok}
                    mr={3}
                    fontSize="24px"
                    _hover={{
                      color: "#81191A",
                    }}
                  />
                </Link>
                <Link
                  href="https://www.facebook.com/benula.bu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    as={FaFacebook}
                    mr={3}
                    fontSize="24px"
                    _hover={{
                      color: "#81191A",
                    }}
                  />
                </Link>
                <Link
                  href="https://www.instagram.com/benulapostreria/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    as={FaInstagram}
                    mr={3}
                    fontSize="24px"
                    _hover={{
                      color: "#81191A",
                    }}
                  />
                </Link>
              </Flex>
            </Box>
          </Flex>
          <Box mt={20} height="1px" backgroundColor="#F3F3F3"></Box>
          <Flex justifyContent="center">
            <Box
              mt={8}
              mx={[-2, 0]}
              backgroundColor="#F3F3F3"
              px={[4, 6]}
              py={2}
              borderRadius="8px"
            >
              <Flex alignItems="center">
                <Text mr={[2, 3]} fontSize={["14px", "16px"]}>
                  <strong>reservaciones de 10 am a 5 pm</strong>
                </Text>

                <Box mr={3}>
                  <Link
                    href="https://www.instagram.com/benulapostreria/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      width={["48px", "60px"]}
                      height={["48px", "60px"]}
                      borderRadius="50%"
                      backgroundColor="white"
                      _hover={{
                        color: "#81191A",
                      }}
                    >
                      <Icon as={FaInstagram} fontSize={["24px", "35px"]} />
                    </Flex>
                  </Link>
                </Box>
                <Box>
                  <Link
                    href={`https://wa.me/5212282367656?text=${encodeURIComponent(
                      "Hola! Quisiera hacer una reservación."
                    )}`}
                  >
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      width={["48px", "60px"]}
                      height={["48px", "60px"]}
                      borderRadius="50%"
                      backgroundColor="white"
                      _hover={{
                        color: "#81191A",
                      }}
                    >
                      <Icon as={FaWhatsapp} fontSize={["24px", "35px"]} />
                    </Flex>
                  </Link>
                </Box>
              </Flex>
            </Box>
          </Flex>
          <Text textAlign="center" mt={8} fontSize={["12px", "16px"]}>
            2022 Benúla. Todos los derechos reservados
          </Text>
        </Box>
      </Container>
    </Section>
  );
}
