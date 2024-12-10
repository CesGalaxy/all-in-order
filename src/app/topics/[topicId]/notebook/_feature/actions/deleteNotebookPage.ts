"use server";

import { ActionResponse, mountActionError } from "@/lib/helpers/form";
import getSupabase from "@/supabase/server";
import { getNotebookRootPath } from "@/app/topics/[topicId]/notebook/_feature/helpers/names";
import { getUser } from "@/supabase/auth/user";
import { redirect } from "next/navigation";

export default async function deleteNotebookPage(topicId: number | string, name: string): Promise<ActionResponse<never>> {
    if (name.length < 3) return mountActionError({ name: ["Name must be at least 3 characters"] });
    if (name.length > 32) return mountActionError({ name: ["Name must be at most 32 characters"] });

    const user = await getUser();

    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
        .storage
        .from("notebooks")
        .remove([getNotebookRootPath(topicId, user.id) + name]);

    if (error) return mountActionError({ db: [error.message] });

    redirect(`/topics/${topicId}/notebook`);
}