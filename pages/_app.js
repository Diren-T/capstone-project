import GlobalStyle from "@/styles";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />

      <Head>
        <title>Flight Footprint</title>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Navbar />
    </>
  );
}
