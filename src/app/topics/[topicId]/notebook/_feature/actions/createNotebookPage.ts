"use server";

import { ActionResponse, ActionStateSubmitted, mountActionError, mountActionState } from "@/lib/helpers/form";
import getSupabase from "@/supabase/server";
import { getNotebookRootPath } from "@/app/topics/[topicId]/notebook/_feature/helpers/names";
import { getUser } from "@/supabase/auth/user";
import { redirect } from "next/navigation";
import { BlankNotebookPage } from "@/app/topics/[topicId]/notebook/_feature/lib/storage/NotebookPageData";

export type CreateNotebookPageResponse = ActionResponse<never>;

export default async function createNotebookPage(topicId: number | string, _prevState: any, formData: FormData): Promise<ActionStateSubmitted<CreateNotebookPageResponse>> {
    const name = formData.get("aio-nb-page-name");
    if (typeof name !== "string") return mountActionState(mountActionError({ name: ["Name is required"] }));
    if (name.length < 3) return mountActionState(mountActionError({ name: ["Name must be at least 3 characters"] }));
    if (name.length > 32) return mountActionState(mountActionError({ name: ["Name must be at most 32 characters"] }));

    const user = await getUser();

    const fileName = btoa(name);
    const path = getNotebookRootPath(topicId, user.id, fileName) + ".json";
    const metadata = { name };

    const supabaseClient = await getSupabase();
    const { error } = await supabaseClient
        .storage
        .from("notebooks")
        // TODO: Try 'no-cache' too
        .upload(path, JSON.stringify(BlankNotebookPage), { metadata, cacheControl: "no-store" });

    if (error) return mountActionState(mountActionError({ db: [error.message] }));

    redirect(`/topics/${topicId}/notebook/${fileName}`);
}