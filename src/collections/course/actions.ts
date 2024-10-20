"use server";

import { ActionResponse, mountActionError, mountActionSuccess } from "@/lib/helpers/form";
import { CREATE_COURSE_SCHEMA, UPDATE_COURSE_SCHEMA } from "@/collections/course/schemas";
import getSupabase from "@/supabase/server";
import { revalidatePath } from "next/cache";

export type CreateCourseFields = {
    name: string,
    description: string,
    is_public: boolean
};

export type CreateCourseActionResponse = ActionResponse<null, keyof CreateCourseFields | "form" | "db">;

export async function createCourseAction(data: CreateCourseFields): Promise<CreateCourseActionResponse> {
    // Validate the input data
    const validation = CREATE_COURSE_SCHEMA.safeParse(data);

    // Handle error
    if (!validation.success) {
        const { formErrors, fieldErrors } = validation.error.flatten();
        return mountActionError({ form: formErrors, ...fieldErrors });
    }

    const { error } = await getSupabase().from("courses").insert(validation.data);

    if (error) return mountActionError({ db: [error.message] });

    return mountActionSuccess(null);
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
    const { error } = await getSupabase()
        .from("courses")
        .update({ name, description, is_public })
        .eq("id", courseId);

    // Handle error
    if (error) return mountActionError({ db: [error.message] });

    revalidatePath("/");

    return mountActionSuccess(null);
}
