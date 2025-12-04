"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        appearance={{
          variables: {
            colorBackground: "var(--background)",
            colorForeground: "var(--primary)",
            colorInputBackground: "var(--background)",
            colorInputForeground: "var(--primary)",
            colorBorder: "var(--primary)",
            colorRing: "var(--primary)",
            colorPrimaryForeground: "var(--background)",
            colorPrimary: "var(--primary)",
            colorNeutral: "var(--primary)",
          },
        }}
      >
        {children}
        <Toaster richColors position="bottom-right" />
      </ClerkProvider>
    </QueryClientProvider>
  );
};

export default Providers;
