"use server";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { z } from "zod";
import { FORM_SCHEMAS, getFormFields } from "@/lib/helpers/form";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/supabase/server";
import { getMaybeUser } from "@/lib/helpers/user";

const AUTH_SCHEMA = z.object({
    email: FORM_SCHEMAS.EMAIL,
    password: FORM_SCHEMAS.PASSWORD,
});

export interface SearchParams {
    redirectUrl?: string;
}

export default async function Page({ searchParams: { redirectUrl } }: { searchParams: SearchParams }) {
    const maybeUser = await getMaybeUser();

    if (maybeUser) {
        redirect(redirectUrl || "/app");
    }

    async function login(formData: FormData) {
        "use server";

        // Create the supabase client
        const supabase = createSupabaseServerClient();

        // Validate the form data
        const { success, data, error } = AUTH_SCHEMA.safeParse(getFormFields(formData, ["email", "password"]));

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
        redirect(redirectUrl || "/app");
    }

    return <div className="flex items-center justify-center w-full h-full">
        <Card className="p-8">
            <CardHeader>
                <h1 className="text-4xl font-bold uppercase">Login</h1>
            </CardHeader>
            <CardBody>
                <form action={login}>
                    <Input isRequired label="Email" placeholder="someone@example.com" type="email" name="email"/>
                    <br/>
                    <Input isRequired label="Password" placeholder="" type="password" name="password"/>
                    <br/>
                    <Button color="primary" className="w-full" type="submit">Login</Button>
                </form>
            </CardBody>
        </Card>
    </div>
}