import RootProvidersClient from "@/app/providers.client";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export default async function RootProviders({ children }: { children: ReactNode }) {
    const messages = await getMessages();

    return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextIntlClientProvider messages={messages}>
            <RootProvidersClient>
                {children}
            </RootProvidersClient>
        </NextIntlClientProvider>
    </ThemeProvider>;
}