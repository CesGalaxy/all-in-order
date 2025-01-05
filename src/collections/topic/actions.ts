"use server";

import { CREATE_TOPIC_SCHEMA, UPDATE_TOPIC_SCHEMA } from "@/collections/topic/schemas";
import { ActionResponse, handleSupabaseResponse, validateForm } from "@/lib/helpers/form";
import getSupabase from "@/supabase/server";

export async function createTopic(subjectId: number, formData: FormData): Promise<ActionResponse<number>> {
    const { validationError, validatedData } = validateForm(CREATE_TOPIC_SCHEMA, ["title", "description"], formData);

    if (validationError) return validationError;

    const supabaseClient = await getSupabase();
    return handleSupabaseResponse(await supabaseClient
        .from("topics")
        .insert({ ...validatedData, subject_id: subjectId })
        .select("id")
        .single(), data => data?.id)
}

export async function updateTopic(subjectId: number, formData: FormData): Promise<ActionResponse<null>> {
    const { validationError, validatedData } = validateForm(UPDATE_TOPIC_SCHEMA, ["title", "description"], formData);

    if (validationError) return validationError;

    const supabaseClient = await getSupabase();
    return handleSupabaseResponse<null>(await supabaseClient
        .from("topics")
        .update(validatedData)
        .eq("subject_id", subjectId), x => x)
}

export async function deleteTopic(topicId: number) {
    const supabaseClient = await getSupabase();
    return handleSupabaseResponse<null>(await supabaseClient
        .from("topics")
        .delete()
        .eq("id", topicId), x => x)
}