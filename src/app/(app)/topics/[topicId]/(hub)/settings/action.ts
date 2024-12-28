"use server";

import { createSupabaseServerClient } from "@/supabase/server";
import { UPDATE_TOPICS_SETTINGS_SCHEMA } from "@/app/(app)/topics/[topicId]/(hub)/settings/schema";
import { getFormFields, mountActionError } from "@/lib/helpers/form";
import { revalidatePath } from "next/cache";

export default async function updateTopicSettings(topicId: number, _prevState: any, formData: FormData) {
    // Validate the input data
    const validation =
        UPDATE_TOPICS_SETTINGS_SCHEMA.safeParse(getFormFields(formData, ["title", "description"]));

    // Handle error
    if (!validation.success) {
        const { formErrors, fieldErrors } = validation.error.flatten();
        return mountActionError({ form: formErrors, ...fieldErrors });
    }

    const { title, description } = validation.data;

    const supabaseClient = await createSupabaseServerClient();
    const { error } = await supabaseClient
        .from("topics")
        .update({
            title, description
        })
        .eq("id", topicId);

    if (error) return mountActionError({ db: [error.message] });

    revalidatePath(`/topics/[topicId]`, 'layout');
}