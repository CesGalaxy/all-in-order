"use server";

import { mountActionError, mountActionSuccess } from "@/lib/helpers/form";
import { TOPIC_DOC_NAME } from "@/collections/docs/schemas";
import { getUser } from "@/supabase/auth/user";
import getSupabase from "@/supabase/server";

export async function createTopicDocument(topic_id: number, isPrivate: boolean, name: string) {
    // Validate the input data
    const validation = TOPIC_DOC_NAME.safeParse(name);

    // Handle error
    if (!validation.success) {
        const { formErrors, fieldErrors } = validation.error.flatten();
        return mountActionError({ form: formErrors, ...fieldErrors });
    }

    const path = `${topic_id}/${isPrivate ? (await getUser()).id : '_public'}/${name}.md`;

    const { data, error } = await getSupabase().storage
        .from("topic_documents")
        .upload(path, "");

    if (error) return mountActionError({ db: [error.message] });

    console.log(data);

    return mountActionSuccess(data);
}