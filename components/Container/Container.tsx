import { Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";

export type ContainerProps = BoxProps;

export function Container(props: ContainerProps) {
  return <Box px={[4, 4, 16]} {...props} />;
}
