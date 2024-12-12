"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

const QueryClientProviderWrapper: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClientProviderWrapper;
