import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "@/styles/globals.css";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

const theme = extendTheme({
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    "2xl": "1400px",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}
