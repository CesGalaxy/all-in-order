"use server";

import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SubjectWithTopics } from "@/lib/supabase/models/Subject";

export default interface Course {
    id: number;
    name: string;
    description?: string;
    created_at: string;
}

export type CourseWithSubjectsWithTopics = Course & { subjects: SubjectWithTopics[] };

export const getMyCoursesWithSubjectsWithTopics = cache(async (): Promise<CourseWithSubjectsWithTopics[]> => {
    const supabase = createSupabaseServerClient();

    const { data } = await supabase
        .from("courses")
        .select("*, subjects(*, topics(*))");

    return data || [];
});
