"use server";

import { cache } from "react";
import { sbServerClient } from "@/lib/supabase/server";

export const getMyWorkspaces = cache(async () => {
    const sb = await sbServerClient();

    return sb.from("workspaces").select("id, name, owner");
});

export const getWorkspace = cache(async (workspaceId: string) => {
    const sb = await sbServerClient();

    return sb
        .from("workspaces")
        .select("id, name, owner")
        .eq("id", workspaceId)
        .maybeSingle();
});