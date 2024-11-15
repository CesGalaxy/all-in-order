"use server";

import { ActionResponse, mountActionError, mountActionSuccess } from "@/lib/helpers/form";
import { CREATE_NOTE_SCHEMA } from "@/collections/note/schemas";
import { getMyProfile } from "@/supabase/auth/profile";
import getSupabase from "@/supabase/server";
import { handleDirectResponse } from "@/lib/helpers/supabase";

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

    const { data, error } = await getSupabase()
        .from("subject_notes")
        .insert({ ...validation.data, subject_id: subjectId, author_id })
        .select("id")
        .single();

    if (error) return mountActionError({ db: [error.message] });

    return mountActionSuccess(data.id);
}

export const deleteNoteAction = async (noteId: number) =>
    handleDirectResponse(await getSupabase()
        .from("subject_notes")
        .delete()
        .eq("id", noteId));