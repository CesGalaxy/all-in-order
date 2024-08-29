import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cache } from "react";
import Course from "@/lib/supabase/models/Course";

export default interface Subject {
    id: number;
    course_id: number;
    name: string;
    description?: string;
    color?: number;
    created_at: string;
}

export type SubjectWithCourse = Subject & { course: Course };

export const getSubjectById = cache(async (id: number): Promise<Subject | null> => {
    const client = createSupabaseServerClient();

    const { data } = await client
        .from("subjects")
        .select("*")
        .eq("id", id)
        .single();

    return data;
});
