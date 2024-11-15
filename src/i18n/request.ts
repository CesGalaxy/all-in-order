import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from "@/lib/services/locale";

const config = getRequestConfig(async () => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.
    const locale = await getUserLocale();

    return {
        locale,
        messages: (await import(`./lang/${locale}.json`)).default
    };
}) as any;

export default config;