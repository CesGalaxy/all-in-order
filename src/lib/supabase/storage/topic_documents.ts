"use server";

import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const getTopicDocument = cache(async (topic_id: number, name: string) => {
    const supabase = createSupabaseServerClient();

    const { data } = await supabase.storage
        .from("topic_documents")
        .download(`${topic_id}/${name}`);

    return data;
});

export const getAllTopicDocuments = cache(async (topic_id: number) => {
    const supabase = createSupabaseServerClient();

    const { data } = await supabase.storage
        .from("topic_documents")
        .list(topic_id.toString());

    return data;
});

export async function createTopicDocument(topic_id: number, name: string) {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase.storage
        .from("topic_documents")
        .upload(`${topic_id}/${name}.md`, "");

    if (error) {
        return error;
    }

    revalidatePath("/topics/" + topic_id);
}

export async function updateTopicDocument(topic_id: number, name: string, content: string) {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase.storage
        .from("topic_documents")
        .update(`${topic_id}/${name}`, content);

    console.log(error, data)

    revalidatePath(`/topics/${topic_id}/docs/${btoa(name)}`);

    return !error;
}

export async function renameTopicDocument(topic_id: number, oldName: string, newName: string) {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase.storage
        .from("topic_documents")
        .move(`${topic_id}/${oldName}`, `${topic_id}/${newName}`);

    console.log(error, data)

    revalidatePath(`/topics/${topic_id}`);

    return !error;
}
