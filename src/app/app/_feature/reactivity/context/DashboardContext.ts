"use client";

import { createContext, Key } from "react";
import { CreateCourseModalAction } from "@/collections/course/components/modals/CreateCourseModal";
import { Profile } from "@/supabase/models/Profile";
import {
    ExistentCourse as CourseNavigationCardExistentCourse
} from "@/collections/course/components/navigation/CourseNavigationCard";
import { Course } from "@/supabase/entities";
import { EditCourseModalAction } from "@/collections/course/components/modals/EditCourseModal";

export type RequiredCourse = CourseNavigationCardExistentCourse & {
    course_members: { profile_id: number, is_admin: boolean }[];
}

export type CreatingCourse = Pick<Course, "name" | "description" | "is_public">;
export type OptimisticCourse = CreatingCourse & { creating: true, creationTime: Key };
export type InitialCourse = RequiredCourse & { creating: false };
export type AnyStateCourse = OptimisticCourse | InitialCourse;

export interface DashboardContextData {
    optimisticCourses: AnyStateCourse[];
    createCourse: CreateCourseModalAction;
    editCourse: (courseId: number) => EditCourseModalAction;
    profile: Profile;
}

const DashboardContext = createContext<DashboardContextData | null>(null);

export default DashboardContext;