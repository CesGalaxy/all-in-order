"use server";

import { cache } from "react";
import getSupabase from "@/supabase/server";
import { getUser } from "@/supabase/auth/user";
import { NotebookData } from "@/modules/notebook/app/supabase/db/NotebookData";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

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

    if (!query.error && !query.data) redirect(`/topics/${topicId}/notebook/setup`);

    return query as PostgrestSingleResponse<NotebookData>;
});

export default getNotebookData;
