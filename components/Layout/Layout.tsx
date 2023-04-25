import Head from "next/head";
import { Header, type HeaderProps, Footer } from "@/components";

type LayoutProps = {
  title: string;
  headerVariant?: HeaderProps["variant"];
  children: React.ReactNode;
};

export function Layout({ title, headerVariant, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Café bello, postres bellos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header variant={headerVariant} />
      {children}
      <Footer />
    </>
  );
}
