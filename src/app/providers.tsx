import { ProvidersClient } from "@/app/providers.client";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export default async function Providers({ children }: { children: ReactNode }) {
    const messages = await getMessages();

    return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextIntlClientProvider messages={messages}>
            <ProvidersClient>
                {children}
            </ProvidersClient>
        </NextIntlClientProvider>
    </ThemeProvider>;
}