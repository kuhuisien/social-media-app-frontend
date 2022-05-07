import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthContext } from "lib/context/authContext/authContext";
import { GRAPHQL_URL_KEY } from "lib/utils/env/keys";
import { readEnv } from "lib/utils/env/readEnv";
import { useContext } from "react";
import { ApolloProviderWrapperProps } from "./ApolloProviderWrapper.types";

const ApolloProviderWrapper = ({ children }: ApolloProviderWrapperProps) => {
  const authCxt = useContext(AuthContext);

  const httpLink = createHttpLink({ uri: readEnv(GRAPHQL_URL_KEY) });

  const authLink = setContext((_, { headers }) => {
    const token = authCxt.token;

    return { headers: { ...headers, Authorization: token } };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
