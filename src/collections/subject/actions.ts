"use server";

import { ActionResponse, mountActionError, mountActionSuccess } from "@/lib/helpers/form";
import { CREATE_SUBJECT_SCHEMA } from "@/collections/subject/schemas";
import getSupabase from "@/supabase/server";

export type CreateSubjectFields = [name: string, description: string, color: number];

export type CreateSubjectActionResponse = ActionResponse<null, "name" | "description" | "color" | "form" | "db">;

export async function createSubjectAction(courseId: number, name: string, description: string, color: number): Promise<CreateSubjectActionResponse> {
    const validation = CREATE_SUBJECT_SCHEMA.safeParse({ name, description, color });

    // Handle error
    if (!validation.success) {
        const { formErrors, fieldErrors } = validation.error.flatten();
        return mountActionError({ form: formErrors, ...fieldErrors });
    }

    console.info("Creating subject with the following data:");
    console.table([validation.data]);

    // Update the course
    const { error } = await getSupabase()
        .from("courses")
        .update(validation.data)
        .eq("id", courseId);

    // Handle error
    if (error) return mountActionError({ db: [error.message] });

    return mountActionSuccess(null);
}