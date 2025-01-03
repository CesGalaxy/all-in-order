"use server";

import { CREATE_NOTEBOOK_NOTE } from "@/modules/notebook/notes/schemas";
import { ActionResponse, handleZodError } from "@/lib/helpers/form";
import { handleCustomSingleResponse } from "@/lib/helpers/supabase";
import getSupabase from "@/supabase/server";
import { revalidatePath } from "next/cache";

type Response = ActionResponse<null, "title" | "content" | "db" | "form">;

export default async function createNotebookNote(notebook: number, formData: FormData): Promise<Response> {
    const validation = CREATE_NOTEBOOK_NOTE.safeParse(Object.fromEntries(formData.entries()));
    if (validation.error) return handleZodError(validation.error);
    const data = validation.data;

    const supabaseClient = await getSupabase();
    return handleCustomSingleResponse(
        await supabaseClient.from("nb_notes").insert({ notebook, ...validation.data, style: {} }),
        data => {
            revalidatePath("/topics/[topicId]/notebook/notes")
            return data;
        }
    )
}