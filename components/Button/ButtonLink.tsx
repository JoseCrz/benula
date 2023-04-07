import { LocalLink, type LocalLinkProps } from "../LocalLink";

const buttonStyles = {
  primary: {
    backgroundColor: "#81191A",
    borderColor: "#81191A",
    color: "white",
    _hover: {
      backgroundColor: "#D6292B",
      borderColor: "#D6292B",
    },
  },
  transparent: {
    backgroundColor: "transparent",
    color: "white",
    borderColor: "white",
    _hover: {
      backgroundColor: "white",
      color: "#81191A",
      borderColor: "white",
    },
  },
  black: {
    backgroundColor: "transparent",
    color: "#2D2D2D",
    borderColor: "#2D2D2D",
    _hover: {
      color: "#81191A",
      borderColor: "#81191A",
    },
  },
  white: {
    backgroundColor: "white",
    color: "#81191A",
    borderColor: "white",
    _hover: {
      color: "#D6292B",
      borderColor: "#D6292B",
      textDecoration: "none",
    },
  },
} as const;

type ButtonLinkVariant = keyof typeof buttonStyles;

export type ButtonLinkProps = {
  variant?: ButtonLinkVariant;
  href: LocalLinkProps["href"];
  children: React.ReactNode;
};

export function ButtonLink({
  variant = "primary",
  href,
  children,
}: ButtonLinkProps) {
  const buttonStyle = buttonStyles[variant];
  return (
    <LocalLink
      href={href}
      {...buttonStyle}
      display="inline-block"
      fontWeight="bold"
      borderRadius="30px"
      borderStyle="solid"
      borderWidth="1px"
      fontSize={["12px", "14px"]}
      px="34px"
      py={2}
    >
      {children}
    </LocalLink>
  );
}
