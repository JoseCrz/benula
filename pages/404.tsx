import { Layout, Section, Container } from "@/components";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { ButtonLink } from "@/components";

export default function Custom404() {
  return (
    <Layout title="No encontrado | benúla">
      <Section py={["64px", "128px"]}>
        <Container>
          <Flex
            width="100%"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
          >
            <Heading as="h1" fontSize={["42px", "56px"]}>
              no encontramos lo que estabas buscando.
            </Heading>
            <Text fontSize="24px" mt={["32px"]}>
              te recomendamos:
            </Text>
            <Flex width="100%" justifyContent="center" mt={["16px"]}>
              <Box mr="8px">
                <ButtonLink href="/menu">conocer nuestro menú</ButtonLink>
              </Box>
              <ButtonLink href="/" variant="black">
                ir al inicio
              </ButtonLink>
            </Flex>
          </Flex>
        </Container>
      </Section>
    </Layout>
  );
}
