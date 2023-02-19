import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { chakra, type SystemStyleObject } from "@chakra-ui/react";

type ButtonLinkVariant = "primary" | "transparent" | "black";

type ButtonLinkProps = {
  variant?: ButtonLinkVariant;
  href: NextLinkProps["href"];
  children: React.ReactNode;
};

const buttonStyles = {
  primary: {
    backgroundColor: "#81191A",
    borderColor: "#81191A",
    color: "white",
  },
  transparent: {
    backgroundColor: "transparent",
    color: "white",
    borderColor: "white",
  },
  black: {
    backgroundColor: "transparent",
    color: "#2D2D2D",
    borderColor: "#2D2D2D",
  },
};

const MagicLink = chakra<typeof NextLink, NextLinkProps>(NextLink, {
  shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
});

export function ButtonLink({
  variant = "primary",
  href,
  children,
}: ButtonLinkProps) {
  const buttonStyle = buttonStyles[variant];
  return (
    <MagicLink
      href={href}
      {...buttonStyle}
      fontWeight="bold"
      borderRadius="30px"
      borderStyle="solid"
      borderWidth="1px"
      px="34px"
      py={2}
      _hover={{
        textDecoration: "none",
      }}
    >
      {children}
    </MagicLink>
  );
}
