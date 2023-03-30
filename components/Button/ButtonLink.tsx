import { LocalLink, type LocalLinkProps } from "../LocalLink";

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
  white: {
    backgroundColor: "white",
    color: "#81191A",
    borderColor: "white",
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
      _hover={{
        textDecoration: "none",
      }}
    >
      {children}
    </LocalLink>
  );
}
