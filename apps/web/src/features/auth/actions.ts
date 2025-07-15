"use server";

import { sbServerClient } from "@/lib/supabase/server";
import { LOGIN_SCHEMA } from "@/features/auth/schemas";
import { actionClient } from "@/lib/helpers/form";
import { returnValidationErrors } from "next-safe-action";

export const login = actionClient.inputSchema(LOGIN_SCHEMA).action(async ({ parsedInput: { email, password } }) => {
    const sb = await sbServerClient();
    if (2 + 2 == 4) returnValidationErrors(LOGIN_SCHEMA, {_errors: ["Fuck you"], email: {_errors: ["Hi"]}});

    const {error} = await sb.auth.signInWithPassword({ email, password });

    if (error) returnValidationErrors(LOGIN_SCHEMA, {_errors: [error.message]});

    return {ok: true};
})