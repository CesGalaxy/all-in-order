"use server";

import { cache } from "react";
import getSupabase from "@/lib/supabase/server";

const getNotionPages = cache(async (notebookId: number) => {
    const sb = await getSupabase();
    return sb.from("nb_notion_pages").select("*").eq("notebook", notebookId);
});

export default getNotionPages;