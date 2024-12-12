"use server";

import getSupabase from "@/supabase/server";
import { getUser } from "@/supabase/auth/user";
import { getNotebookRootPath } from "@/app/topics/[topicId]/notebook/_feature/helpers/names";

export default async function getNotebookPage(subjectId: number | string, fileName: string) {
    const user = await getUser();

    const supabaseClient = await getSupabase();
    const { data: info, error: infoError } = await supabaseClient
        .storage
        .from("authenticated/notebooks")
        .info(getNotebookRootPath(subjectId, user.id, fileName) + ".json");

    if (infoError) return { error: infoError };

    const { data, error } = await supabaseClient
        .storage
        .from("notebooks")
        .download(getNotebookRootPath(subjectId, user.id, fileName) + ".json");

    if (error) return { error };

    return { data, info };
}