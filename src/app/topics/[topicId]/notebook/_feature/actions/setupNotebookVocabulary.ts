"use server";

import getSupabase from "@/supabase/server";
import { getUser } from "@/supabase/auth/user";
import { NotebookVocabularyEntity } from "@/app/topics/[topicId]/notebook/_feature/lib/db/NotebookVocabularyData";

export default async function setupNotebookVocabulary(topicId: number | string) {
    const user = await getUser();
    const supabaseClient = await getSupabase();
    return await supabaseClient
        .from("nb_vocabulary")
        .insert({ user: user.id, topic: Number(topicId), areas: {}, definitions: {} })
        .select("*")
        .returns<NotebookVocabularyEntity[]>()
        .single();
}