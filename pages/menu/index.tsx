import type { MenuItem } from "@/types";
import { useState, forwardRef } from "react";
import Link from "next/link";
import chunk from "lodash.chunk";
import * as Tabs from "@radix-ui/react-tabs";
import * as Accordion from "@radix-ui/react-accordion";
import { Box, Button, Icon, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";
import { Layout, Section, Container } from "@/components";

import { mocktailsData, brunchData, sandwichData, dessertsData } from "@/mocks";

const categories = {
  cafe: "cafe",
  mocktails: "mocktails",
  brunch: "brunch",
  sandwiches: "sandwiches",
  desserts: "desserts",
};

export default function Menu() {
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
          <DesktopMenu />
          <MobileMenu />
        </Container>
      </Section>
    </Layout>
  );
}

// ==============================
// Desktop Menu
function DesktopMenu() {
  const [currentValue, setCurrentValue] = useState(categories.mocktails);

  return (
    <Box display={["none", "block"]} mt={[12]}>
      <Tabs.Root value={currentValue} onValueChange={setCurrentValue}>
        <Tabs.List aria-label="menu">
          <Flex alignItems="center">
            <TabButton value={categories.mocktails} currentValue={currentValue}>
              mocktails
            </TabButton>
            <TabButton value={categories.brunch} currentValue={currentValue}>
              brunch
            </TabButton>
            <TabButton
              value={categories.sandwiches}
              currentValue={currentValue}
            >
              entre panes
            </TabButton>
            <TabButton value={categories.desserts} currentValue={currentValue}>
              postres
            </TabButton>
          </Flex>
        </Tabs.List>
        <Box width="100%" height="2px" backgroundColor="rgba(0, 0, 0, 0.04)" />
        <TabPanel value={categories.mocktails} menuItems={mocktailsData} />
        <TabPanel value={categories.brunch} menuItems={brunchData} />
        <TabPanel value={categories.sandwiches} menuItems={sandwichData} />
        <TabPanel value={categories.desserts} menuItems={dessertsData} />
      </Tabs.Root>
    </Box>
  );
}

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
                  {item.detailUrl && (
                    <Text
                      textDecoration="underline"
                      mt={2}
                      fontSize={["16px", "20px"]}
                    >
                      <Link href={`/menu${item.detailUrl}`}>ver más</Link>
                    </Text>
                  )}
                </Box>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Tabs.Content>
  );
}

// ==============================
// Mobile Menu

function MobileMenu() {
  const [currentValue, setCurrentValue] = useState([categories.mocktails]);
  return (
    <Box display={["block", "none"]} mt={16}>
      <Accordion.Root
        type="multiple"
        value={currentValue}
        onValueChange={setCurrentValue}
        asChild
      >
        <Grid rowGap="18px">
          <Accordion.Item value={categories.mocktails}>
            <AccordionTrigger
              value={categories.mocktails}
              currentValue={currentValue}
            >
              mocktails
            </AccordionTrigger>
            <AccordionContent menuItems={mocktailsData} />
          </Accordion.Item>
          <Accordion.Item value={categories.brunch}>
            <AccordionTrigger
              value={categories.brunch}
              currentValue={currentValue}
            >
              brunch
            </AccordionTrigger>
            <AccordionContent menuItems={brunchData} />
          </Accordion.Item>
          <Accordion.Item value={categories.sandwiches}>
            <AccordionTrigger
              value={categories.sandwiches}
              currentValue={currentValue}
            >
              entre panes
            </AccordionTrigger>
            <AccordionContent menuItems={sandwichData} />
          </Accordion.Item>
          <Accordion.Item value={categories.desserts}>
            <AccordionTrigger
              value={categories.desserts}
              currentValue={currentValue}
            >
              desserts
            </AccordionTrigger>
            <AccordionContent menuItems={dessertsData} />
          </Accordion.Item>
        </Grid>
      </Accordion.Root>
    </Box>
  );
}

type AccordionTriggerProps = {
  value: string;
  currentValue: string[];
} & Accordion.AccordionTriggerProps;

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ value, currentValue, children, ...rest }, ref) => {
    const isActive = currentValue.includes(value);
    return (
      <Accordion.Header>
        <Accordion.Trigger asChild ref={ref} {...rest}>
          <Button
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignContent="center"
            fontSize="24px"
            color="#721B1B"
            backgroundColor="transparent"
            height="auto"
            px={3}
            py={6}
            borderRadius={0}
            borderTopRightRadius="2px"
            borderTopLeftRadius="2px"
            border="1px solid #D7D7D7"
          >
            {children}
            <Icon
              as={
                isActive ? IoChevronUpCircleOutline : IoChevronDownCircleOutline
              }
              color="#721B1B"
              fontSize="24px"
            />
          </Button>
        </Accordion.Trigger>
      </Accordion.Header>
    );
  }
);

AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentProps = {
  menuItems: MenuItem[];
} & Accordion.AccordionContentProps;

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ menuItems, ...rest }, ref) => {
    return (
      <Accordion.Content ref={ref} asChild {...rest}>
        <Box border="1px solid #D7D7D7" borderTop="none" px={4} py={3}>
          {menuItems.map((item) => (
            <Box key={item.name} borderBottom="1px solid #E4E4E4" pt={2} pb={5}>
              <Flex alignItems="baseline">
                <Text fontSize="18px" mr={3}>
                  ${item.basePrice}
                </Text>
                <Text fontWeight="bold" fontSize="20px">
                  {item.name}
                </Text>
              </Flex>
              <Text mt={6}>{item.abstract}</Text>
              {item.options &&
                item.options.map((option, index) => (
                  <Text
                    mt={1}
                    key={`${item.name}-option-${index}`}
                    fontSize="18px"
                    color="#4D4D4D"
                  >
                    ${option.optionPrice}{" "}
                    <Text as="span" fontSize="16px">
                      {option.optionDescription}
                    </Text>
                  </Text>
                ))}
              {item.detailUrl && (
                <Text textDecoration="underline" mt={2}>
                  <Link href={`/menu${item.detailUrl}`}>ver más</Link>
                </Text>
              )}
            </Box>
          ))}
        </Box>
      </Accordion.Content>
    );
  }
);

AccordionContent.displayName = "AccordionContent";
