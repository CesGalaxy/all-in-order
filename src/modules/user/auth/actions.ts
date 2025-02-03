"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getFormFields } from "@/lib/helpers/form";
import { redirect } from "next/navigation";
import { LOGIN_SCHEMA } from "@/modules/user/auth/schemas";

export async function login(redirectUrl: string, formData: FormData) {
    // Create the supabase client
    const supabase = await createSupabaseServerClient();

    // Validate the form data
    const { success, data, error } = LOGIN_SCHEMA.safeParse(getFormFields(formData, ["email", "password"]));

    // If the form data is invalid, log the error and return
    if (!success) {
        console.error("Invalid form data: ", error);
        return;
    }

    // Otherwise, attempt to log in
    const authResult = await supabase.auth.signInWithPassword(data);

    // If the login attempt failed, log the error and return
    if (authResult.error) {
        console.error("Failed to login: ", authResult.error);
        return;
    }

    // Finally, redirect the user to the home page
    redirect(redirectUrl);
}