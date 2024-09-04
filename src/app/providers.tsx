import { ProvidersClient } from "@/app/providers.client";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export default async function Providers({ children }: { children: React.ReactNode }) {
    const messages = await getMessages();

    return <NextIntlClientProvider messages={messages}>
        <ProvidersClient>
            {children}
        </ProvidersClient>
    </NextIntlClientProvider>;
}