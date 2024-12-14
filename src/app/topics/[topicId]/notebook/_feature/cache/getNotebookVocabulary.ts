"use server";

import { cache } from "react";
import { getUser } from "@/supabase/auth/user";
import { NotebookVocabularyEntity } from "@/app/topics/[topicId]/notebook/_feature/lib/db/NotebookVocabularyData";
import getSupabase from "@/supabase/server";
import setupNotebookVocabulary from "@/app/topics/[topicId]/notebook/_feature/actions/setupNotebookVocabulary";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

const getNotebookVocabulary = cache(async (topicId: string | number) => {
    const user = await getUser();

    const supabaseClient = await getSupabase();
    const query = await supabaseClient
        .from("nb_vocabulary")
        .select("*")
        .eq("user", user.id)
        .eq("topic", Number(topicId))
        .returns<NotebookVocabularyEntity[]>()
        .maybeSingle();

    if (query.error && !query.data) return await setupNotebookVocabulary(topicId);

    return query as PostgrestSingleResponse<NotebookVocabularyEntity>;
});

export default getNotebookVocabulary;
