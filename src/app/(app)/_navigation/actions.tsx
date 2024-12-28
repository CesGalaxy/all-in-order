"use server";

import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/lib/services/locale";
import { revalidatePath } from "next/cache";

export async function updateLocale(locale: Locale) {
    await setUserLocale(locale);
    revalidatePath("/");
}