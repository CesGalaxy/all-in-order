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

export const getMyCoursesAndSubjects = cache(async (): Promise<(Course & { subjects: Subject[] })[]> => {
    const supabase = createSupabaseServerClient();

    const { data } = await supabase
        .from("courses")
        .select("*, subjects(*)");

    return data || [];
});
