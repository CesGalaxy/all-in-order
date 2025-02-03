"use server";

import { cache } from "react";
import { type User } from "@supabase/supabase-js";
import getSupabase from "@/lib/supabase/server";
import required from "@/lib/helpers/required";

/**
 * Get the currently cached user, redirecting to the specified path if the user is not logged in.
 * @param redirectPath The path to redirect to if the user is not logged in.
 * @returns The currently cached user.
 */
export const getUser = cache(async (redirectPath = "/login"): Promise<User> => required(await getMaybeUser(), redirectPath));

/**
 * Get the currently cached user, or null in case the user is not logged in.
 * @returns The currently cached user, or null if the user is not logged in.
 */
export const getMaybeUser = cache(async (): Promise<User | null> => {
    const supabaseClient = await getSupabase();
    const { data: { user } } = await supabaseClient.auth.getUser();

    return user as any;
});
