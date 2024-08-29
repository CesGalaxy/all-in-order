"use server";

import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Subject from "@/lib/supabase/models/Subject";

export default interface Course {
    id: number;
    name: string;
    description?: string;
    created_at: string;
}

export type CourseWithSubjects = Course & { subjects: Subject[] };

export const getMyCoursesWithSubjects = cache(async (): Promise<CourseWithSubjects[]> => {
    const supabase = createSupabaseServerClient();

    const { data } = await supabase
        .from("courses")
        .select("*, subjects(*)");

    return data || [];
});
