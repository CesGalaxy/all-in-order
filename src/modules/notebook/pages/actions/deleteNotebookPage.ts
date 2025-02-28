"use server";

import { ActionResponse, mountActionError } from "@/lib/helpers/form";
import getSupabase from "@/lib/supabase/server";
import { getNotebookRootPath } from "@/modules/notebook/pages/lib/helpers/names";
import { getUser } from "@/lib/supabase/auth/user";
import { redirect } from "next/navigation";

export default async function deleteNotebookPage(topicId: number | string, fileName: string): Promise<ActionResponse<never>> {
    const user = await getUser();

    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
        .storage
        .from("notebooks")
        .remove([getNotebookRootPath(topicId, user.id) + fileName]);

    if (error) return mountActionError({ db: [error.message] });

    redirect(`/topics/${topicId}/notebook`);
}