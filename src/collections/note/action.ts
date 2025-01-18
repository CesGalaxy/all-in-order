"use server";

import { ActionResponse, mountActionError } from "@/lib/helpers/form";
import { CREATE_NOTE_SCHEMA } from "@/collections/note/schemas";
import { getMyProfile } from "@/lib/supabase/auth/profile";
import getSupabase from "@/lib/supabase/server";
import { handleCustomSingleResponse, handleSingleResponse } from "@/lib/helpers/supabase";

export type CreateNoteActionResponse = ActionResponse<number, "title" | "content" | "form" | "db">;

export async function createNoteAction(subjectId: number, formData: FormData): Promise<CreateNoteActionResponse> {
    const validation = CREATE_NOTE_SCHEMA.safeParse({
        title: formData.get("title"),
        content: formData.get("content")
    });

    if (!validation.success) {
        const { formErrors, fieldErrors } = validation.error.flatten();
        return mountActionError({ form: formErrors, ...fieldErrors });
    }

    const { id: author_id } = await getMyProfile();

    const supabaseClient = await getSupabase();
    const response = await supabaseClient
        .from("subject_notes")
        .insert({ ...validation.data, subject_id: subjectId, author_id })
        .select("id")
        .single();

    return handleCustomSingleResponse(response, data => data.id);
}

export async function deleteNoteAction(noteId: number) {
    const supabaseClient = await getSupabase();
    return handleSingleResponse(await supabaseClient.from("subject_notes").delete().eq("id", noteId));
}