import { useState, useEffect, forwardRef } from "react";
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
          <TabPanel key={category._id} menuCategory={category} />
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
  menuCategory: MenuPageProps["menuCategories"][number];
};

function TabPanel({ menuCategory }: TabPanelProps) {
  const { isAvailable } = useAvailability(menuCategory.availability);
  const chunkSize = Math.ceil(menuCategory.categoryItems.length / 2);
  const chunks = chunk(menuCategory.categoryItems, chunkSize);

  return (
    <Tabs.Content value={menuCategory.name}>
      {menuCategory.availability && (
        <Box
          backgroundColor="#EFEFEF"
          borderRadius="10px"
          textAlign="center"
          p={1}
          mt={3}
        >
          <Text fontWeight="bold" color="#7C1819" fontSize="24px">
            {getAvailabilityText(menuCategory.availability)}
          </Text>
        </Box>
      )}
      <Box pt={12}>
        <Grid gridTemplateColumns="1fr 1fr" columnGap={12}>
          {chunks.map((chunk, index) => (
            <Grid
              key={menuCategory.name + index}
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
                    {item.price && (
                      <Text
                        backgroundColor="#F8EFDE"
                        fontSize="32px"
                        p="6px"
                        borderRadius="4px"
                        mr={6}
                        fontWeight="bold"
                        color={!isAvailable ? "#A3A3A3" : undefined}
                      >
                        ${item.price}
                      </Text>
                    )}
                    <Text
                      fontWeight="bold"
                      fontSize="32px"
                      color={!isAvailable ? "#A3A3A3" : undefined}
                    >
                      {item._type === "dessert" && item.menuName
                        ? item.menuName
                        : item.name}
                    </Text>
                  </Flex>
                  <Text
                    fontSize="20px"
                    color={!isAvailable ? "#A3A3A3" : "#4D4D4D"}
                  >
                    {item.excerpt}
                  </Text>
                  {item._type === "menuItem" &&
                    item.options &&
                    item.options.map((option, index) => (
                      <Text
                        key={`${item.name}-option-${index}`}
                        fontSize="24px"
                        color={!isAvailable ? "#A3A3A3" : "#4D4D4D"}
                      >
                        ${option.optionPrice}{" "}
                        <Text
                          as="span"
                          fontSize="20px"
                          color={!isAvailable ? "#A3A3A3" : undefined}
                        >
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
                      <Link
                        href={
                          item._type === "dessert"
                            ? `/postre-del-mes/${item.slug.current}`
                            : `/menu/${item.slug.current}`
                        }
                      >
                        ver más
                      </Link>
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
              <AccordionContent menuCategory={category} />
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
  menuCategory: MenuPageProps["menuCategories"][number];
} & Accordion.AccordionContentProps;

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ menuCategory, ...rest }, ref) => {
    const { isAvailable } = useAvailability(menuCategory.availability);
    return (
      <Accordion.Content ref={ref} asChild {...rest}>
        <Box
          border="1px solid #D7D7D7"
          borderTop="none"
          px={4}
          py={3}
          overflow="hidden"
        >
          {menuCategory.availability && (
            <Box borderBottom="1px solid #E4E4E4" pb={5}>
              <Box
                backgroundColor="#EFEFEF"
                borderRadius="10px"
                textAlign="center"
                p={1}
                mt={3}
              >
                <Text fontWeight="bold" color="#7C1819" fontSize="16px">
                  {getAvailabilityText(menuCategory.availability)}
                </Text>
              </Box>
            </Box>
          )}
          {menuCategory.categoryItems.map((item) => (
            <Box key={item.name} borderBottom="1px solid #E4E4E4" pt={2} pb={5}>
              <Flex alignItems="baseline">
                {item.price && (
                  <Text
                    fontSize="18px"
                    mr={3}
                    color={!isAvailable ? "#A3A3A3" : undefined}
                  >
                    ${item.price}
                  </Text>
                )}
                <Text
                  fontWeight="bold"
                  fontSize="20px"
                  color={!isAvailable ? "#A3A3A3" : undefined}
                >
                  {item.name}
                </Text>
              </Flex>
              <Text mt={6} color={!isAvailable ? "#A3A3A3" : undefined}>
                {item.excerpt}
              </Text>
              {item._type === "menuItem" &&
                item.options &&
                item.options.map((option, index) => (
                  <Text
                    mt={1}
                    key={`${item.name}-option-${index}`}
                    fontSize="18px"
                    color={!isAvailable ? "#A3A3A3" : "#4D4D4D"}
                  >
                    ${option.optionPrice}{" "}
                    <Text as="span" fontSize="16px">
                      {option.optionDescription}
                    </Text>
                  </Text>
                ))}
              {item.slug && (
                <Text textDecoration="underline" mt={2}>
                  <Link
                    href={
                      item._type === "dessert"
                        ? `/postre-del-mes/${item.slug.current}`
                        : `/menu/${item.slug.current}`
                    }
                  >
                    ver más
                  </Link>
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

// ==========================
// Utility functions

function useAvailability(
  availability: TabPanelProps["menuCategory"]["availability"]
) {
  const [isAvailable, setIsAvailable] = useState(false);
  useEffect(() => {
    setIsAvailable(getIsAvailable(availability));
  }, [availability]);

  return { isAvailable };
}

function getAvailabilityText(
  availability: MenuPageProps["menuCategories"][number]["availability"]
) {
  function getTimeString(time: number) {
    if (time <= 11) return `${time}am`;

    if (time === 12) return `${time}pm`;

    return `${time - 12}pm`;
  }

  return ` disponible de ${getTimeString(
    availability!.startTime
  )} a ${getTimeString(availability!.endTime)}`;
}

function getIsAvailable(
  availabitity: TabPanelProps["menuCategory"]["availability"]
) {
  if (!availabitity) return true;

  const availabilityMap = createAvailabityMap(availabitity);
  const currentHour = new Date().getHours();
  return availabilityMap[currentHour] === "available";
}

function createAvailabityMap(
  availabitity: Exclude<
    TabPanelProps["menuCategory"]["availability"],
    undefined
  >
) {
  const availabilityMap: Record<number, "available" | "unavailable"> = {};

  for (let i = 0; i < 24; i++) {
    availabilityMap[i] = "unavailable";
  }

  for (let i = availabitity.startTime; i <= availabitity.endTime; i++) {
    availabilityMap[i] = "available";
  }

  return availabilityMap;
}
