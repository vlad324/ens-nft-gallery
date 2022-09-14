import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from "../components/Layout";
import { CommonContextProvider } from "../contexts/CommonContext";
import { theme } from "../themes";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>My NFT gallery</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <CommonContextProvider>
          <ToastContainer />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CommonContextProvider>
      </ApolloProvider>
    </ChakraProvider>
  )
}

export default MyApp
