"use server";

import { cache } from "react";
import { type User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import getSupabase from "@/supabase/server";

export const getUser = cache(async (redirectPath = "/login"): Promise<User> => await getMaybeUser() || redirect(redirectPath));

export const getMaybeUser = cache(async (): Promise<User | null> => {
    const { data: { user } } = await getSupabase().auth.getUser();

    return user as any;
})