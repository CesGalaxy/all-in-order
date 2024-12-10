"use server";

import { cache } from "react";
import { getMaybeUser } from "@/supabase/auth/user";
import getSupabase from "@/supabase/server";
import { getNotebookRootPath } from "@/app/topics/[topicId]/notebook/_feature/helpers/names";

const getNotebook = cache(async (topicId: string | number) => {
    const user = await getMaybeUser();

    if (!user) return { error: "auth" };

    const supabaseClient = await getSupabase();
    const { data: files, error: storageError } = await supabaseClient
        .storage
        .from("notebooks")
        .list(getNotebookRootPath(topicId, user.id));

    if (storageError) return { errorData: storageError, error: "storage" };

    return { files };
});

export default getNotebook;