import { cache } from "react";
import getSupabase from "@/supabase/server";

export const getSubject = cache((subjectId: string) => getSupabase()
    .from("subjects")
    .select("*, topics(id, title, description), notes:subject_notes(*)")
    .eq("id", parseInt(subjectId))
    .maybeSingle())