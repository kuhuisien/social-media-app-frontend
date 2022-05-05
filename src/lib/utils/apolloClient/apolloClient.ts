import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { GRAPHQL_URL_KEY } from "../env/keys";
import { readEnv } from "../env/readEnv";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({ uri: readEnv(GRAPHQL_URL_KEY) });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return { headers: { ...headers, Authorization: token } };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});