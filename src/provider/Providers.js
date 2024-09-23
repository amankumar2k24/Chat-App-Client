"use client";

import React from "react";
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export const Providers = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydrate(queryClient)}>{children}</Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
