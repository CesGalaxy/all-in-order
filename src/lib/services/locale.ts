import { cookies } from "next/headers";
import { DEFAULT_LOCALE, Locale } from "@/i18n/config";

export const COOKIE_NAME = "AIO_LOCALE";

export async function getUserLocale() {
    return cookies().get(COOKIE_NAME)?.value || DEFAULT_LOCALE;
}

export async function setUserLocale(locale: Locale) {
    cookies().set(COOKIE_NAME, locale);
}