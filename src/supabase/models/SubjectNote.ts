import { cache } from "react";
import { Tables } from "@/supabase/database";
import getSupabase from "@/supabase/server";

export type SubjectNote = Tables<"subject_notes">;

export const getSubjectNotes = cache(async (subjectId: number) => {
    const { data } = await getSupabase()
        .from("subject_notes")
        .select("*")
        .eq("subject_id", subjectId);

    return data;
});
