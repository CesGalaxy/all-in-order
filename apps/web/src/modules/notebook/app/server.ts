"use server";

import "server-only";
import { sbAdminClient } from "@/lib/supabase/server";
import { generatePageCache, getPageTitle } from "@/modules/integrations/notion/utils";
import { Client, PageObjectResponse } from "@notionhq/client";
import { getNotionClient, getNotionTokenFromUser } from "@/modules/integrations/notion/api";
import { getMyUser } from "@/modules/user/auth/server";

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

export async function getPageNameLEGACY(notionClient: Client, { alias, cache, id }: {
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

export async function updatePageCache(pageId: string, page?: PageObjectResponse) {
    if (!page) {
        const {data: { user }} = await getMyUser();
        if (!user) throw new Error("User not authenticated");
        const notionToken = getNotionTokenFromUser(user);
        if (!notionToken) throw new Error("User has not connected their Notion account");
        const notionClient = getNotionClient(notionToken);

        const pageResponse = await notionClient.pages.retrieve({ page_id: pageId });
        if (pageResponse && "properties" in pageResponse) page = pageResponse;
        else throw new Error("Failed to fetch page data from Notion");
    }

    const cache = generatePageCache(page);

    const sbAdmin = await sbAdminClient();
    await sbAdmin.from("notebook_pages").update({ cache }).eq("id", pageId);
    return cache;
}