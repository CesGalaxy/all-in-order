"use server";

import { sbAdminClient, sbServerClient } from "@/lib/supabase/server";
import { actionClient } from "@/lib/helpers/form";
import { returnValidationErrors } from "next-safe-action";
import { CREATE_WORKSPACE_SCHEMA } from "@/modules/app/workspace/schemas";
import { redirect } from "next/navigation";

export const createWorkspace = actionClient
    .inputSchema(CREATE_WORKSPACE_SCHEMA)
    .action(async ({ parsedInput: { name } }) => {
        const sb = await sbServerClient();

        // Check that the user is authenticated
        const { data: { user }, error: userError } = await sb.auth.getUser();
        if (userError) returnValidationErrors(CREATE_WORKSPACE_SCHEMA, { _errors: [userError.message] });
        if (!user) returnValidationErrors(CREATE_WORKSPACE_SCHEMA, { _errors: ["User not authenticated"] });

        // Check if the user already has 3 workspaces
        const {data: userWorkspaces, error: userWorkspacesError} = await sb
            .from("workspaces")
            .select('count')
            .eq("owner", user!.id);

        if (userWorkspacesError) returnValidationErrors(CREATE_WORKSPACE_SCHEMA, { _errors: [userWorkspacesError.message] });
        if (userWorkspaces[0]!.count > 3) returnValidationErrors(CREATE_WORKSPACE_SCHEMA, {_errors: ["You can only have 3 workspaces"]})

        // Insert the new workspace
        const userId = user.id;
        const sbAdmin = await sbAdminClient();
        const {data, error} = await sbAdmin
            .from("workspaces")
            .insert({ name, owner: userId, created_by: userId })
            .select("id")
            .single();

        if (error) returnValidationErrors(CREATE_WORKSPACE_SCHEMA, { _errors: [error.message] });

        redirect("/w/" + data.id);
    });