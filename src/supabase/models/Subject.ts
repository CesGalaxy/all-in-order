"use server";

import { cache } from "react";
import { Tables } from "@/supabase/database";
import { Course } from "@/supabase/models/Course";
import getSupabase from "@/supabase/server";
import { Topic } from "@/supabase/models/Topic";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export type Subject = Tables<"subjects">;

export type SubjectWCourse = Subject & { course: Course };
export type SubjectWTopics = Subject & { topics: Topic[] };

export const getSubject = cache(async (id: number): Promise<Subject | null> => {
    const { data } = await getSupabase()
        .from("subjects")
        .select()
        .eq("id", id)
        .single();

    return data;
});

export async function create_subject(
    name: string,
    description: string,
    color: number,
    courseId: number,
): Promise<PostgrestError | undefined> {
    const { error } = await getSupabase()
        .from("subjects")
        .insert({ name, description, color, course_id: courseId });

    if (error) return error;

    revalidatePath("/");
}
