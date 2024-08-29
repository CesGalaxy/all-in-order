import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cache } from "react";
import { SubjectWithCourse } from "@/lib/supabase/models/Subject";

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

export type TopicWithSubjectAndCourse = Topic & { subject: SubjectWithCourse };

export const getTopicByIdWithSubjectAndCourse = cache(async (id: number): Promise<TopicWithSubjectAndCourse | null> => {
    const client = createSupabaseServerClient();

    const { data } = await client
        .from("topics")
        .select(`
            *,
            subject:subject_id(*, course:course_id(*))
        `)
        .eq("id", id)
        .single();

    return data || null;
});

export const getTopicsBySubjectId = cache(async (subject_id: number): Promise<Topic[]> => {
    const client = createSupabaseServerClient();

    const { data } = await client
        .from("topics")
        .select("*")
        .eq("subject_id", subject_id);

    return data || [];
});
