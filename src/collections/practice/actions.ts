"use server";

import { CREATE_PRACTICE_SCHEMA } from "@/collections/practice/schemas";
import { ActionResponse, mountActionError, mountActionSuccess, validateForm } from "@/lib/helpers/form";
import getSupabase from "@/lib/supabase/server";

export async function createPractice(topicId: number, formData: FormData): Promise<ActionResponse<null>> {
    const { validatedData, validationError } = validateForm(CREATE_PRACTICE_SCHEMA, ["title", "description"], formData);

    if (validationError) return validationError;

    const supabaseClient = await getSupabase();
    const { error } = await supabaseClient
        .from("practices")
        .insert({
            ...validatedData,
            topic_id: topicId
        });

    if (error) return mountActionError({ db: [error.message] });

    return mountActionSuccess(null);
}