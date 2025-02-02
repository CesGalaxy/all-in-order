"use server";

import getSupabase from "@/lib/supabase/server";
import { mountActionError, mountActionSuccess } from "@/lib/helpers/form";
import { revalidatePath } from "next/cache";

export async function deleteTopicDoc(topicId: number, path: string) {
    const sb = await getSupabase();
    const { data, error } = await sb
        .storage
        .from("topic_docs")
        .remove([topicId + "/" + path]);

    revalidatePath("/topics/" + topicId, "page");

    return error ? mountActionError({ db: [error.message] }) : mountActionSuccess(data);
}