import type { MenuItem } from "@/types";
import { useState } from "react";
import chunk from "lodash.chunk";
import * as Tabs from "@radix-ui/react-tabs";
import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { Layout, Section, Container } from "@/components";

import { mocktailsData, brunchData, sandwichData, dessertsData } from "@/mocks";

const tabs = {
  cafe: "cafe",
  mocktails: "mocktails",
  brunch: "brunch",
  sandwiches: "sandwiches",
  desserts: "desserts",
};

export default function Menu() {
  const [currentValue, setCurrentValue] = useState(tabs.mocktails);

  return (
    <Layout title="Menú | Benúla">
      <Section py={18}>
        <Container>
          <Heading as="h1" fontSize={["42px"]}>
            nuestro menú
          </Heading>
          <Text mt={3} fontSize="18px">
            descripción de todo el menú aquí
          </Text>
          <Box mt={[12]}>
            <Tabs.Root value={currentValue} onValueChange={setCurrentValue}>
              <Tabs.List aria-label="menu">
                {/* <Tabs.Trigger asChild value={tabs.cafe}>
                  <Button>bebidas con café</Button>
                </Tabs.Trigger> */}
                <Flex alignItems="center">
                  <TabButton value={tabs.mocktails} currentValue={currentValue}>
                    mocktails
                  </TabButton>
                  <TabButton value={tabs.brunch} currentValue={currentValue}>
                    brunch
                  </TabButton>
                  <TabButton
                    value={tabs.sandwiches}
                    currentValue={currentValue}
                  >
                    entre panes
                  </TabButton>
                  <TabButton value={tabs.desserts} currentValue={currentValue}>
                    postres
                  </TabButton>
                </Flex>
              </Tabs.List>
              <Box
                width="100%"
                height="2px"
                backgroundColor="rgba(0, 0, 0, 0.04)"
              />
              <TabPanel value={tabs.mocktails} menuItems={mocktailsData} />
              <TabPanel value={tabs.brunch} menuItems={brunchData} />
              <TabPanel value={tabs.sandwiches} menuItems={sandwichData} />
              <TabPanel value={tabs.desserts} menuItems={dessertsData} />
            </Tabs.Root>
          </Box>
        </Container>
      </Section>
    </Layout>
  );
}

// ==============================
// Local Components

type TabsButtonProps = {
  currentValue: string;
} & Tabs.TabsTriggerProps;

function TabButton({
  currentValue,
  value,
  children,
  ...rest
}: TabsButtonProps) {
  const isActive = currentValue === value;
  return (
    <>
      <Tabs.Trigger asChild value={value} {...rest}>
        <Button
          fontSize="42px"
          fontWeight="semibold"
          height="auto"
          py={3}
          px={6}
          backgroundColor="white"
          color={isActive ? "#81191A" : "rgba(115, 115, 115, 0.6)"}
        >
          {children}
        </Button>
      </Tabs.Trigger>
      <Box
        width="1px"
        height="28px"
        backgroundColor="rgba(151, 151, 151, 0.2)"
      />
    </>
  );
}

type TabPanelProps = {
  value: Tabs.TabsContentProps["value"];
  menuItems: MenuItem[];
};

function TabPanel({ value, menuItems }: TabPanelProps) {
  const chunkSize = Math.ceil(menuItems.length / 2);
  const chunks = chunk(menuItems, chunkSize);

  return (
    <Tabs.Content value={value}>
      <Box pt={12}>
        <Grid gridTemplateColumns="1fr 1fr" columnGap={12}>
          {chunks.map((chunk, index) => (
            <Grid
              key={value + index}
              gridTemplateColumns="1fr"
              rowGap={9}
              alignContent="start"
            >
              {chunk.map((item) => (
                <Box
                  key={item.name}
                  borderLeft="1px solid rgba(124, 24, 25, 0.2)"
                  px={6}
                >
                  <Flex alignItems="baseline">
                    <Text fontSize="24px" mr={6}>
                      ${item.basePrice}
                    </Text>
                    <Text fontWeight="bold" fontSize="32px">
                      {item.name}
                    </Text>
                  </Flex>
                  <Text fontSize="20px" color="#4D4D4D">
                    {item.abstract}
                  </Text>
                  {item.options &&
                    item.options.map((option, index) => (
                      <Text
                        key={`${item.name}-option-${index}`}
                        fontSize="24px"
                        color="#4D4D4D"
                      >
                        ${option.optionPrice}{" "}
                        <Text as="span" fontSize="20px">
                          {option.optionDescription}
                        </Text>
                      </Text>
                    ))}
                </Box>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Tabs.Content>
  );
}
