import {
  Button as ThemeButton,
  type ButtonProps as ThemeButtonProps,
} from "@chakra-ui/react";

type ButtonProps = {
  variant?: "primary" | "secondary";
} & ThemeButtonProps;

export function Button({ variant = "primary", ...rest }: ButtonProps) {
  return (
    <ThemeButton
      backgroundColor="#81191A"
      color="white"
      fontWeight="bold"
      borderRadius="30px"
      px="34px"
      {...rest}
    />
  );
}
