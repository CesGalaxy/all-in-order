"use server";

import { actionClient } from "@/lib/helpers/form";
import { sbAdminClient, sbServerClient } from "@/lib/supabase/server";
import { returnValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import { CREATE_NOTEBOOK_SCHEMA } from "@/modules/app/notebook/schemas";
import z from "zod";

export const createNotebook = actionClient
    .inputSchema(CREATE_NOTEBOOK_SCHEMA)
    .bindArgsSchemas<[workspaceId: z.ZodUUID]>([z.uuidv4()])
    .action(async ({ parsedInput: { name, details }, bindArgsParsedInputs: [workspaceId] }) => {
        const sb = await sbServerClient();

        // Check that the user is authenticated
        const { data: { user }, error: userError } = await sb.auth.getUser();
        if (userError) returnValidationErrors(CREATE_NOTEBOOK_SCHEMA, { _errors: [userError.message] });
        if (!user) returnValidationErrors(CREATE_NOTEBOOK_SCHEMA, { _errors: ["User not authenticated"] });

        // Check if the user already has 5 notebooks on the current workspace
        const {data: userNotebooks, error: userNotebooksError} = await sb
            .from("notebooks")
            .select('count')
            .eq("workspace", workspaceId);

        if (userNotebooksError) returnValidationErrors(CREATE_NOTEBOOK_SCHEMA, { _errors: [userNotebooksError.message] });
        if (userNotebooks[0]!.count > 3) returnValidationErrors(CREATE_NOTEBOOK_SCHEMA, {_errors: ["You can only have 5 notebooks per workspace"]});

        // Insert the new workspace
        const userId = user.id;
        const sbAdmin = await sbAdminClient();
        const {data, error} = await sbAdmin
            .from("notebooks")
            .insert({ name, details, workspace: workspaceId, created_by: userId })
            .select("id")
            .single();

        if (error) returnValidationErrors(CREATE_NOTEBOOK_SCHEMA, { _errors: [error.message] });

        redirect("/notebooks/" + data.id);
    });