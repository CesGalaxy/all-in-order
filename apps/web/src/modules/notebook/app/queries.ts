"use server";

import { cache } from "react";
import { sbServerClient } from "@/lib/supabase/server";
import { getMyUser } from "@/modules/user/auth/server";
import { getNotionXClientFromUser } from "@/modules/integrations/notion/api";

export const getMyNotebooks = cache(async () => {
    const sb = await sbServerClient();

    return sb.from("notebooks").select("id, name, workspace, created_at")
        .order("created_at", { ascending: false });
});

export const getNotebook = cache(async (notebookId: string) => {
    const sb = await sbServerClient();

    return sb.from("notebooks").select("id, name, details, workspace(id, name, owner)")
        .eq("id", notebookId)
        .maybeSingle();
});

export const getNotebookPage = cache(async (pageId: string) => {
    const sb = await sbServerClient();

    return sb.from("notebook_pages")
        .select("id, alias, cache, notebook_id")
        .eq("id", pageId)
        .maybeSingle();
});

export const getNotebookPageContent = cache(async (pageId: string) => {
    const { data: { user }, error: authError } = await getMyUser();
    if (authError) return { data: null, error: authError };
    if (!user) return { data: null, error: new Error("User not authenticated") };

    const notion = getNotionXClientFromUser(user)
    if (!notion) return { data: null, error: new Error("Can't connect to notion") };

    try {
        const recordMap = await notion.getPage(pageId);
        return { data: recordMap, error: null };
    } catch (e) {
        return { data: null, error: e as Error };
    }
});

export const getNotebookPages = cache(async (notebookId: string) => {
    const sb = await sbServerClient();

    return sb
        .from("notebook_pages")
        .select("id, alias, cache")
        .eq("notebook_id", notebookId)
        .order("position", { ascending: true });
});