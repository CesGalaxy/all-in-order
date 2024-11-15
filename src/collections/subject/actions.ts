"use server";

import { ActionResponse, getFormFields, mountActionError, mountActionSuccess } from "@/lib/helpers/form";
import { CREATE_SUBJECT_SCHEMA, UPDATE_SUBJECT_SCHEMA } from "@/collections/subject/schemas";
import getSupabase from "@/supabase/server";
import { redirect } from "next/navigation";

export type CreateSubjectActionResponse = ActionResponse<never, "name" | "description" | "color" | "form" | "db">;

export async function createSubjectAction(course_id: number, name: string, description: string, color: number): Promise<CreateSubjectActionResponse> {
    const validation = CREATE_SUBJECT_SCHEMA.safeParse({ name, description, color });

    // Handle error
    if (!validation.success) {
        const { formErrors, fieldErrors } = validation.error.flatten();
        return mountActionError({ form: formErrors, ...fieldErrors });
    }

    console.info("Creating subject with the following data:");
    console.table([validation.data]);

    // Update the course
    const { data, error } = await getSupabase()
        .from("subjects")
        .insert({ course_id, ...validation.data })
        .select("id")
        .single();

    // Handle error
    if (error) return mountActionError({ db: [error.message] });

    return redirect("/subjects/" + data.id);
}

export type UpdateSubjectActionResponse = ActionResponse<null, "name" | "description" | "color" | "form" | "db">

export async function updateSubjectAction(subjectId: number, formData: FormData) {
    const validation = UPDATE_SUBJECT_SCHEMA.safeParse(getFormFields(formData, ["name", "description"]));

    // Handle error
    if (!validation.success) {
        const { formErrors, fieldErrors } = validation.error.flatten();
        return mountActionError({ form: formErrors, ...fieldErrors });
    }

    console.info("Updating subject with the following data:");
    console.table([validation.data]);

    // Update the course
    const { error } = await getSupabase()
        .from("subjects")
        .update(validation.data)
        .eq("id", subjectId);

    // Handle error
    if (error) return mountActionError({ db: [error.message] });

    return mountActionSuccess(null, ["Subject updated successfully"]);
}

export async function deleteSubjectAction(subjectId: number) {
    console.info("Deleting subject with the ID: " + subjectId);

    // Update the course
    const { error } = await getSupabase()
        .from("subjects")
        .delete()
        .eq("id", subjectId);

    // Handle error
    if (error) return mountActionError({ db: [error.message] });

    redirect("/app");
}
