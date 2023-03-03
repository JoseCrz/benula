import Head from "next/head";
import { Header, type HeaderProps, Footer } from "@/components";

type LayoutProps = {
  headerVariant?: HeaderProps["variant"];
  children: React.ReactNode;
};

export function Layout({ headerVariant, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Benúla</title>
        <meta name="description" content="Café bello, postres bellos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header variant={headerVariant} />
      {children}
      <Footer />
    </>
  );
}
