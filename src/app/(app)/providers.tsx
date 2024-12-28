import AppProvidersClient from "@/app/(app)/providers.client";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export default async function AppProviders({ children }: { children: ReactNode }) {
    const messages = await getMessages();

    return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextIntlClientProvider messages={messages}>
            <AppProvidersClient>
                {children}
            </AppProvidersClient>
        </NextIntlClientProvider>
    </ThemeProvider>;
}