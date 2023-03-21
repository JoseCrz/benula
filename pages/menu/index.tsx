import type { MenuItem } from "@/types";
import { useState, forwardRef } from "react";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import chunk from "lodash.chunk";
import * as Tabs from "@radix-ui/react-tabs";
import * as Accordion from "@radix-ui/react-accordion";
import { Box, Button, Icon, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { IoChevronDownCircleOutline } from "react-icons/io5";

import { getAllMenuCategories } from "@/sanity/queries";
import { Layout, Section, Container } from "@/components";

export async function getStaticProps() {
  const menuCategories = await getAllMenuCategories();

  return {
    props: {
      menuCategories,
    },
  };
}

type MenuPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Menu({ menuCategories }: MenuPageProps) {
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
          <DesktopMenu menuCategories={menuCategories} />
          <MobileMenu menuCategories={menuCategories} />
        </Container>
      </Section>
    </Layout>
  );
}

// ==============================
// Desktop Menu

type DesktopMenuProps = {
  menuCategories: MenuPageProps["menuCategories"];
};

function DesktopMenu({ menuCategories }: DesktopMenuProps) {
  const [currentValue, setCurrentValue] = useState(
    () => menuCategories[0].name
  );

  return (
    <Box display={["none", "block"]} mt={[12]}>
      <Tabs.Root value={currentValue} onValueChange={setCurrentValue}>
        <Tabs.List aria-label="menu">
          <Flex alignItems="center">
            {menuCategories.map((category) => (
              <TabButton
                key={category._id}
                value={category.name}
                currentValue={currentValue}
              >
                {category.name}
              </TabButton>
            ))}
          </Flex>
        </Tabs.List>
        <Box width="100%" height="2px" backgroundColor="rgba(0, 0, 0, 0.04)" />
        {menuCategories.map((category) => (
          <TabPanel
            key={category._id}
            value={category.name}
            menuItems={category.menuItems}
          />
        ))}
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
  menuItems: MenuPageProps["menuCategories"][number]["menuItems"];
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
                      ${item.price}
                    </Text>
                    <Text fontWeight="bold" fontSize="32px">
                      {item.name}
                    </Text>
                  </Flex>
                  <Text fontSize="20px" color="#4D4D4D">
                    {item.excerpt}
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
                  {item.slug && (
                    <Text
                      textDecoration="underline"
                      mt={2}
                      fontSize={["16px", "20px"]}
                    >
                      <Link href={`/menu/${item.slug.current}`}>ver más</Link>
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

type MobileMenuProps = {
  menuCategories: MenuPageProps["menuCategories"];
};

function MobileMenu({ menuCategories }: MobileMenuProps) {
  return (
    <Box display={["block", "none"]} mt={16}>
      <Accordion.Root type="multiple" asChild>
        <Grid rowGap="18px">
          {menuCategories.map((category) => (
            <Accordion.Item key={category._id} value={category.name}>
              <AccordionTrigger value={category.name}>
                {category.name}
              </AccordionTrigger>
              <AccordionContent menuItems={category.menuItems} />
            </Accordion.Item>
          ))}
        </Grid>
      </Accordion.Root>
    </Box>
  );
}

const TRIGGER_CLASSNAME = "AccordionTrigger";

type AccordionTriggerProps = {
  value: string;
} & Accordion.AccordionTriggerProps;

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ value, children, ...rest }, ref) => {
    return (
      <Accordion.Header>
        <Accordion.Trigger
          asChild
          ref={ref}
          {...rest}
          className={TRIGGER_CLASSNAME}
        >
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
              aria-hidden
              as={IoChevronDownCircleOutline}
              color="#721B1B"
              fontSize="24px"
              sx={{
                transition: "transform 300ms",
                [`.${TRIGGER_CLASSNAME}[data-state='open'] &`]: {
                  transform: "rotate(180deg)",
                },
              }}
            />
          </Button>
        </Accordion.Trigger>
      </Accordion.Header>
    );
  }
);

AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentProps = {
  menuItems: MenuPageProps["menuCategories"][number]["menuItems"];
} & Accordion.AccordionContentProps;

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ menuItems, ...rest }, ref) => {
    return (
      <Accordion.Content ref={ref} asChild {...rest}>
        <Box
          border="1px solid #D7D7D7"
          borderTop="none"
          px={4}
          py={3}
          overflow="hidden"
        >
          {menuItems.map((item) => (
            <Box key={item.name} borderBottom="1px solid #E4E4E4" pt={2} pb={5}>
              <Flex alignItems="baseline">
                <Text fontSize="18px" mr={3}>
                  ${item.price}
                </Text>
                <Text fontWeight="bold" fontSize="20px">
                  {item.name}
                </Text>
              </Flex>
              <Text mt={6}>{item.excerpt}</Text>
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
              {item.slug && (
                <Text textDecoration="underline" mt={2}>
                  <Link href={`/menu/${item.slug.current}`}>ver más</Link>
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
