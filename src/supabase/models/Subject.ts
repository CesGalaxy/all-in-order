import { cache } from "react";
import { Tables } from "@/supabase/database";
import { Course } from "@/supabase/models/Course";
import getSupabase from "@/supabase/server";
import { Topic } from "@/supabase/models/Topic";

export type Subject = Tables<"subjects">;

export type SubjectWCourse = Subject & { course: Course };
export type SubjectWTopics = Subject & { topics: Topic[] };

export const getSubjectById = cache(async (id: number): Promise<Subject | null> => {
    const { data } = await getSupabase()
        .from("subjects")
        .select()
        .eq("id", id)
        .single();

    return data;
});
