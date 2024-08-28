"use server";

import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { type User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export const getUser = cache(async (redirectPath = "/login"): Promise<User> => await getMaybeUser() || redirect(redirectPath));

export const getMaybeUser = cache(async (): Promise<User | null> => {
    const supabase = createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();

    return user as any;
})