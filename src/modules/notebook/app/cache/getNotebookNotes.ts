"use server";

import { cache } from "react";
import { getUser } from "@/lib/supabase/auth/user";
import getSupabase from "@/lib/supabase/server";

const getNotebookNotes = cache(async (topicId: string | number) => {
    const user = await getUser();
    const supabaseClient = await getSupabase();
    return supabaseClient
        .from("notebooks")
        .select("alias, topic(id, title), notes:nb_notes(id, title, content, style, tags, updated_at, created_at)")
        .eq("topic", Number(topicId))
        .eq("user", user.id)
        .order('updated_at', { referencedTable: 'nb_notes', ascending: true })
        .limit(1)
        .maybeSingle();
});

export default getNotebookNotes;