"use server";

import "server-only";
import { sbAdminClient } from "@/lib/supabase/server";
import { getPageTitle } from "@/modules/integrations/notion/utils";
import { Client } from "@notionhq/client";

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

export async function getPageName(notionClient: Client, { alias, cache, id }: {
    alias?: string | null,
    cache?: unknown,
    id: string
}) {
    const isCacheValid = cache !== null && typeof cache === "object" && "properties" in cache && typeof cache.properties === "object";

    let title: string | null = alias || null;
    if (!title && isCacheValid) title = getPageTitle(cache as never);
    if (!title) {
        try {
            const page = await notionClient.pages.retrieve({ page_id: id });
            if (!("properties" in page)) return null;
            title = getPageTitle(page as never) || null;
        } catch {
            return null;
        }
    }

    return title;
}