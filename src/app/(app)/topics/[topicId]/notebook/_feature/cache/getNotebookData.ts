"use server";

import { cache } from "react";
import getSupabase from "@/supabase/server";
import { getUser } from "@/supabase/auth/user";
import { NotebookData } from "@/app/(app)/topics/[topicId]/notebook/_feature/lib/db/NotebookData";
import setupNotebook from "@/app/(app)/topics/[topicId]/notebook/_feature/actions/setupNotebook";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

const getNotebookData = cache(async (topicId: string | number) => {
    const user = await getUser();
    const supabaseClient = await getSupabase();
    const query = await supabaseClient
        .from("notebooks")
        .select("*, areas:nb_vocab_areas(*)")
        .eq("user", user.id)
        .eq("topic", Number(topicId))
        .returns<NotebookData[]>()
        .maybeSingle();

    if (!query.error && !query.data) return setupNotebook(topicId);

    return query as PostgrestSingleResponse<NotebookData>;
});

export default getNotebookData;
