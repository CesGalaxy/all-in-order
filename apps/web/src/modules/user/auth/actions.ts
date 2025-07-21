"use server";

import { sbServerClient } from "@/lib/supabase/server";
import { LOGIN_SCHEMA, SIGNUP_SCHEMA } from "@/modules/user/auth/schemas";
import { actionClient } from "@/lib/helpers/form";
import { returnValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

export const login = actionClient.inputSchema(LOGIN_SCHEMA).action(async ({ parsedInput: { email, password } }) => {
    const sb = await sbServerClient();

    const { error } = await sb.auth.signInWithPassword({ email, password });

    if (error) returnValidationErrors(LOGIN_SCHEMA, { _errors: [error.message] });

    return { ok: true };
});

export const signup = actionClient
    .inputSchema(SIGNUP_SCHEMA)
    .action(async ({ parsedInput: { name, username, email, password } }) => {
        const sb = await sbServerClient();

        const { error } = await sb.auth.signUp({ email, password, options: { data: { name, username } } });

        if (error) returnValidationErrors(SIGNUP_SCHEMA, { _errors: [error.message] });

        redirect("/welcome");
    });