"use server";

import getSupabase from "@/supabase/server";
import { getUser } from "@/supabase/auth/user";
import { NotebookData } from "@/app/(app)/topics/[topicId]/notebook/_feature/lib/db/NotebookData";

export default async function setupNotebook(topicId: number | string) {
    const user = await getUser();
    const supabaseClient = await getSupabase();
    return await supabaseClient
        .from("notebooks")
        .insert({ user: user.id, topic: Number(topicId) })
        .select("*, vocab:nb_vocab_areas(*)")
        .returns<NotebookData[]>()
        .single();
}