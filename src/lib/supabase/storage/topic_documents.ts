"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";
import getSupabase from "@/lib/supabase/server";

export const getTopicDocument = cache(async (topic_id: number, name: string) => {
    const supabaseClient = await getSupabase();
    const { data } = await supabaseClient.storage
        .from("topic_documents")
        .download(`${topic_id}/${name}`);

    return data;
});

export const getAllTopicDocuments = cache(async (topic_id: number) => {
    const supabaseClient = await getSupabase();
    return supabaseClient.storage
        .from("topic_documents")
        .list(topic_id.toString());
});

export async function createTopicDocument(topic_id: number, name: string) {
    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient.storage
        .from("topic_documents")
        .upload(`${topic_id}/${name}.md`, "");

    if (error) {
        return error;
    }

    revalidatePath("/topics/" + topic_id);
}

/**
 *
 * @param topic_id
 * @param name
 * @param content
 *
 * @returns Whether the action completed successfully
 */
export async function updateTopicDocument(topic_id: number, name: string, content: string) {
    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient.storage
        .from("topic_documents")
        .update(`${topic_id}/${name}`, content);

    console.log(error, data)

    revalidatePath(`/topics/${topic_id}/docs/${btoa(name)}`);

    return !error;
}

export async function renameTopicDocument(topic_id: number, oldName: string, newName: string) {
    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient.storage
        .from("topic_documents")
        .move(`${topic_id}/${oldName}`, `${topic_id}/${newName}`);

    console.log(error, data)

    revalidatePath(`/topics/${topic_id}`);

    return !error;
}
