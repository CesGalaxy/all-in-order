"use server";

import getSupabase from "@/supabase/server";
import { getUser } from "@/supabase/auth/user";
import { NotebookData } from "@/app/(app)/topics/[topicId]/notebook/_feature/lib/db/NotebookData";

export default async function setupNotebook(topicId: number | string, alias: string | null) {
    const user = await getUser();
    const supabaseClient = await getSupabase();
    return supabaseClient
        .from("notebooks")
        .insert({ topic: Number(topicId), user: user.id })
        .select("*, vocab:nb_vocab_areas(*)")
        .returns<NotebookData[]>()
        .single();
}