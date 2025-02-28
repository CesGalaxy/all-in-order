"use server";

import { ActionResponse, handleZodError, mountActionError, mountActionSuccess } from "@/lib/helpers/form";
import { CREATE_COURSE_SCHEMA, UPDATE_COURSE_SCHEMA } from "@/collections/course/schemas";
import getSupabase from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CreateCourseFields = {
    name: string,
    description: string,
    is_public: boolean
};

export type CreateCourseActionResponse = ActionResponse<null, keyof CreateCourseFields | "form" | "db">;

export async function createCourseAction(_data: CreateCourseFields): Promise<CreateCourseActionResponse> {
    // Validate the input data
    const validation = CREATE_COURSE_SCHEMA.safeParse(_data);

    // Handle error
    if (!validation.success) return handleZodError(validation.error);

    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient.from("courses").insert(validation.data).select("id").maybeSingle();

    if (error) return mountActionError({ db: [error.message] });
    if (!data) return mountActionError({ db: ["Failed to create the course"] });

    redirect("/courses/" + data.id)
}

export interface UpdateCourseFields {
    name: string;
    description: string;
    is_public: boolean;
}

export type UpdateCourseActionResponse = ActionResponse<null, keyof UpdateCourseFields | "form" | "db">;

export async function updateCourseAction(courseId: number, data: UpdateCourseFields): Promise<UpdateCourseActionResponse> {
    // Validate the input data
    const validation = UPDATE_COURSE_SCHEMA.safeParse(data);

    // Handle error
    if (!validation.success) {
        const { formErrors, fieldErrors } = validation.error.flatten();
        return mountActionError({ form: formErrors, ...fieldErrors });
    }


    const { name, description, is_public } = validation.data;

    console.info("Creating course with the following data:");
    console.table([{ name, description, is_public }]);

    // Update the course
    const supabaseClient = await getSupabase();
    const { error } = await supabaseClient
        .from("courses")
        .update({ name, description, is_public })
        .eq("id", courseId);

    // Handle error
    if (error) return mountActionError({ db: [error.message] });

    revalidatePath("/");

    return mountActionSuccess(null);
}

export type DeleteCourseActionResponse = ActionResponse<never, "db">;

export async function deleteCourseAction(courseId: number): Promise<DeleteCourseActionResponse> {
    const supabaseClient = await getSupabase();
    const { error } = await supabaseClient
        .from("courses")
        .delete()
        .eq("id", courseId);

    if (error) return mountActionError({ db: [error.message] });

    revalidatePath("/");
    redirect("/app");
}
