import NextLink, { type LinkProps } from "next/link";
import { chakra } from "@chakra-ui/react";

export type LocalLinkProps = LinkProps;

export const LocalLink = chakra<typeof NextLink, LinkProps>(NextLink, {
  shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
});
