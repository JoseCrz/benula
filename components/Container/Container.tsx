import { Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";

export function Container(props: BoxProps) {
  return <Box px={[4, 4, 16]} {...props} />;
}
