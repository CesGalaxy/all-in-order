"use server";

import "server-only";
import { sbAdminClient } from "@/lib/supabase/server";

export async function canUserAccessNotebook(userId: string, notebookId: string): Promise<boolean> {
    const sbAdmin = await sbAdminClient();
    const { data } = await sbAdmin
        .from("notebooks")
        .select('workspace(workspace_members(user, is_admin))')
        .eq("id", notebookId)
        .eq("workspace.workspace_members.user", userId)
        .eq("workspace.workspace_members.is_admin", true)
        .single();

    return !!data;
}