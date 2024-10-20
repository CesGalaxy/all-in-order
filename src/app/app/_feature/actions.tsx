"use server";

import {
    createCourseAction,
    CreateCourseFields,
    updateCourseAction,
    UpdateCourseFields
} from "@/collections/course/actions";
import { revalidatePath } from "next/cache";
import { createSubjectAction, CreateSubjectFields } from "@/collections/subject/actions";

export async function dashboard_createCourse(data: CreateCourseFields): Promise<any> {
    "use server";
    revalidatePath("/app");
    return createCourseAction(data);
}

export async function dashboard_editCourse(courseId: number, data: UpdateCourseFields): Promise<any> {
    "use server";
    revalidatePath("/app");
    return updateCourseAction(courseId, data);
}

export async function dashboard_addSubjectToCourse(courseId: number, ...args: CreateSubjectFields): Promise<any> {
    "use server";
    revalidatePath("/app");
    return createSubjectAction(courseId, ...args);
}