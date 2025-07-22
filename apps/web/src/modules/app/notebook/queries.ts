"use server";

import { cache } from "react";
import { sbServerClient } from "@/lib/supabase/server";

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