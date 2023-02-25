import { Box, type BoxProps } from "@chakra-ui/react";

export function Highlight({ children, ...rest }: BoxProps) {
  return (
    <Box as="span" color="#81191A" {...rest}>
      {children}
    </Box>
  );
}
