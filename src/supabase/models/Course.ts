import { Tables } from "@/supabase/database";
import { cache } from "react";
import getSupabase from "@/supabase/server";
import { SubjectWTopics } from "@/supabase/models/Subject";

export type Course = Tables<"courses">;
export type CourseWSubjectsWTopics = Course & { subjects: SubjectWTopics[] };

export const getCoursesWSubjectsWTopics = cache(async (): Promise<CourseWSubjectsWTopics[]> => {
    const { data } = await getSupabase()
        .from("courses")
        .select("*, subjects(*, topics(*))");

    return data || [];
})