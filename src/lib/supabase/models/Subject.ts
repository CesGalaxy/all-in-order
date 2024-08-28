import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cache } from "react";

export default interface Subject {
    id: number;
    course_id: number;
    name: string;
    description?: string;
    color?: number;
    created_at: string;
}

export const getSubjectById = cache(async (id: number): Promise<Subject | null> => {
    const client = createSupabaseServerClient();

    const { data } = await client
        .from("subjects")
        .select("*")
        .eq("id", id)
        .single();

    return data;
});
