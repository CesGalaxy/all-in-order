"use server";

import { Tables } from "@/supabase/database";
import { cache } from "react";
import getSupabase from "@/supabase/server";
import { SubjectWTopics } from "@/supabase/models/Subject";
import { revalidatePath } from "next/cache";
import { PostgrestError } from "@supabase/supabase-js";

export type Course = Tables<"courses">;
export type CourseWSubjectsWTopics = Course & { subjects: SubjectWTopics[] };

export const getCoursesWSubjectsWTopics = cache(async (): Promise<CourseWSubjectsWTopics[]> => {
    const { data } = await getSupabase()
        .from("courses")
        .select("*, subjects(*, topics(*))");

    return data || [];
})

export async function create_course(name: string, description: string): Promise<PostgrestError | undefined> {
    const { error } = await getSupabase()
        .from("courses")
        .insert({ name, description });

    if (error) return error;

    revalidatePath("/");
}
