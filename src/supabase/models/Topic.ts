import { cache } from "react";
import { Tables } from "@/supabase/database";
import getSupabase from "@/supabase/server";
import { SubjectWCourse } from "@/supabase/models/Subject";

export type Topic = Tables<"topics">;
export type Topic_WSubjectACourse = Topic & { subject: SubjectWCourse };

export const getTopicById = cache(async (id: number): Promise<Topic | null> => {
    const { data } = await getSupabase()
        .from("topics")
        .select()
        .eq("id", id)
        .single();

    return data || null;
});

export const getTopicByIdWithSubjectAndCourse = cache(async (id: number): Promise<Topic_WSubjectACourse | null> => {
    const { data } = await getSupabase()
        .from("topics")
        .select(`*, subject:subjects!inner(*, course:courses!inner(*))`)
        .eq("id", id)
        .single();

    return data || null;
});

// TODO: Remove "Id" from function name
export const getTopicsBySubjectId = cache(async (subject_id: number): Promise<Topic[]> => {
    const { data } = await getSupabase()
        .from("topics")
        .select()
        .eq("subject_id", subject_id);

    return data || [];
});
