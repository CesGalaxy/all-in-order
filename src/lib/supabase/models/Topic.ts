import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cache } from "react";

export default interface Topic {
    id: number;
    subject_id: number;
    title: string;
    description?: string;
    created_at: string;
}

export const getTopicById = cache(async (id: number): Promise<Topic | null> => {
    const client = createSupabaseServerClient();

    const { data } = await client
        .from("topics")
        .select("*")
        .eq("id", id)
        .single();

    return data || null;
});

export const getBySubjectId = cache(async (subject_id: number): Promise<Topic[]> => {
    const client = createSupabaseServerClient();

    const { data } = await client
        .from("topics")
        .select("*")
        .eq("subject_id", subject_id);

    return data || [];
});
