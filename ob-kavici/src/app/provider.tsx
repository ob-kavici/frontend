import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/utils/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { queryConfig } from "@/lib/react-query";
import { UserProvider } from "@/lib/contexts/user-context";

interface AppProviderProps {
    children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: queryConfig,
            }),
    );

    return (
        <React.Suspense
            fallback={
                <div className="flex h-screen w-screen items-center justify-center">
                    Loading...
                </div>
            }
        >
            <UserProvider>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </QueryClientProvider>
            </UserProvider>
        </React.Suspense>
    );
};