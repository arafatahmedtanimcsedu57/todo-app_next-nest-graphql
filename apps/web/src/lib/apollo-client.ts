"use client";

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3000/graphql",
  credentials: "include",
});

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
