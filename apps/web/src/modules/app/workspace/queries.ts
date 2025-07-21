"use server";

import { cache } from "react";
import { sbServerClient } from "@/lib/supabase/server";

export const getMyWorkspaces = cache(async () => {
    const sb = await sbServerClient();

    return sb.from("workspaces").select("id, name, owner");
})