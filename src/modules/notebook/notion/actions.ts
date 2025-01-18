"use server";

import getSupabase from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function addNotionPageToNotebook(notebookId: number, pageId: string) {
    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
        .from("nb_notion_pages")
        .insert({ id: pageId, notebook: notebookId })
        .select("notebook(topic)")
        .maybeSingle();

    if (error) return console.error(error);
    if (!data) return;

    redirect(`/topics/${data.notebook.topic}/notebook`);
}