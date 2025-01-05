"use server";

import { ActionResponse, mountActionError, mountActionSuccess } from "@/lib/helpers/form";
import { TOPIC_DOC_NAME } from "@/collections/docs/schemas";
import { getUser } from "@/supabase/auth/user";
import { createSupabaseServerClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export async function createTopicDocument<R extends boolean = false>(
    topicId: number,
    isPrivate: boolean,
    name: string,
    redirectToEditor?: R
): Promise<ActionResponse<R extends true ? never : { id: string, path: string, fullPath: string }, "db" | "form">> {
    // Validate the input data
    const validation = TOPIC_DOC_NAME.safeParse(name);

    // Handle error
    if (!validation.success) {
        const { formErrors, fieldErrors } = validation.error.flatten();
        return mountActionError({ form: formErrors, ...fieldErrors });
    }

    const path = `${topicId}/${isPrivate ? (await getUser()).id : '_public'}/${name}.md`;

    const supabaseClient = await createSupabaseServerClient();
    const { data, error } = await supabaseClient.storage
        .from("topic_documents")
        .upload(path, "");

    if (error) return mountActionError({ db: [error.message] });

    console.log(data);

    if (redirectToEditor) redirect(`/topic/${topicId}/docs/${btoa(name)}.md`);
    else return mountActionSuccess(data) as any;
}

export async function deleteTopicDocument(topicId: number, docId: string): Promise<ActionResponse<null, "db">> {
    const supabaseClient = await createSupabaseServerClient();
    const { error } = await supabaseClient.storage
        .from("topic_documents")
        .remove([`${topicId}/${docId}`]);

    return error ? mountActionError({ db: [error.message] }) : mountActionSuccess(null);
}