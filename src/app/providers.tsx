"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={router.push}>
        <GoogleOAuthProvider clientId="340144000927-peloshddgpn0ni87t95uagjntuk6elnf.apps.googleusercontent.com">
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </GoogleOAuthProvider>
      </NextUIProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </QueryClientProvider>
  );
}
