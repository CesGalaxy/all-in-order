"use server";

import { cache } from "react";
import { getMaybeUser } from "@/lib/supabase/auth/user";
import getSupabase from "@/lib/supabase/server";
import { getNotebookRootPath } from "@/modules/notebook/pages/lib/helpers/names";
import getNotebookData from "@/modules/notebook/app/cache/getNotebookData";
import { NotebookData } from "@/modules/notebook/app/supabase/db/NotebookData";
import { FileObject, StorageError } from "@supabase/storage-js";
import { PostgrestError } from "@supabase/supabase-js";

export type NotebookQuery = {
    data: NotebookData,
    files: FileObject[]
}

export type NotebookQueryError = {
    error: "auth" | "data" | "storage",
    errorData?: PostgrestError | StorageError,
}

export type NotebookQueryResult = NotebookQuery | NotebookQueryError;

const getNotebook = cache(async (topicId: string | number): Promise<NotebookQueryResult> => {
    const user = await getMaybeUser();

    if (!user) return { error: "auth" };

    const supabaseClient = await getSupabase();

    const [{ data, error: dataError }, { data: files, error: storageError }] = await Promise.all([
        getNotebookData(topicId),
        supabaseClient
            .storage
            .from("notebooks")
            .list(getNotebookRootPath(topicId, user.id))
    ])

    if (dataError) return { errorData: dataError, error: "data" };
    if (storageError) return { errorData: storageError, error: "storage" };

    return { data, files };
});

export default getNotebook;