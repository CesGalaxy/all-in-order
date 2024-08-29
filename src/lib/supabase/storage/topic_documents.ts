"use server";

import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const getTopicDocumentByName = cache(async (topic_id: number, name: string) => {
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

    console.log(error, data)

    if (error) {
        return error;
    }

    revalidatePath("/topics/[topic_id]");
}