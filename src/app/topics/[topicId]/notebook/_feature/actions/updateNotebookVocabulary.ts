"use server";

import { getUser } from "@/supabase/auth/user";
import { NotebookVocabularyData } from "@/app/topics/[topicId]/notebook/_feature/lib/db/NotebookVocabularyData";
import getSupabase from "@/supabase/server";
import { mountActionError, mountActionSuccess } from "@/lib/helpers/form";

export default async function updateNotebookVocabulary(topicId: number | string, newData: Partial<NotebookVocabularyData>) {
    const user = await getUser();

    const supabaseClient = await getSupabase();
    const { error } = await supabaseClient
        .from("nb_vocabulary")
        .update(newData as any)
        .eq("topic", topicId)
        .eq("user", user.id);

    if (error) return mountActionError({ db: [error.message] });

    return mountActionSuccess(null);
}