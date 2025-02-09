"use server";

import getSupabase from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import getNotionClient from "@/modules/notebook/notion/lib/getNotionClient";

export async function addNotionPageToNotebook(notebookId: number, pageId: string) {
    const notion = await getNotionClient();
    const page = await notion.pages.retrieve({ page_id: pageId });

    if (!("url" in page)) return console.error("Page not found");

    const title = Object.values(page.properties)
        .find(prop => prop.type === "title")!
        .title
        .map(({ plain_text }) => plain_text)
        .join(" ");

    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
        .from("nb_notion_pages")
        .insert({ id: pageId, notebook: notebookId, name: title })
        .select("notebook(topic)")
        .maybeSingle();

    if (error) return console.log(error.message);
    if (!data) return "No data";

    redirect(`/topics/${data.notebook.topic}/notebook`);
}