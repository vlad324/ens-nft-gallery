import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from "../components/Layout";
import { CommonContextProvider } from "../contexts/CommonContext";
import { theme } from "../themes";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>My NFT gallery</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CommonContextProvider>
        <ToastContainer />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CommonContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
