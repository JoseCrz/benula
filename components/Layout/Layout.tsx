import Head from "next/head";
import { Header, Footer } from "@/components";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Benúla</title>
        <meta name="description" content="Café bello, postres bellos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header position="absolute" top={0} />
      {children}
      <Footer />
    </>
  );
}
