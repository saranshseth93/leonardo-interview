import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./api/apollo-client";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

const client = createApolloClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
