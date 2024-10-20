"use client";

import { CreateCourseModalAction } from "@/collections/course/components/modals/CreateCourseModal";
import { Profile } from "@/supabase/models/Profile";
import { type ReactNode, useCallback, useOptimistic } from "react";
import DashboardContext, {
    AnyStateCourse,
    CreatingCourse,
    InitialCourse,
    OptimisticCourse,
    RequiredCourse
} from "@/app/app/_feature/reactivity/context/DashboardContext";
import { EditCourseModalAction } from "@/collections/course/components/modals/EditCourseModal";

export interface DashboardProviderProps {
    initialCourses: RequiredCourse[];
    createCourseAction: CreateCourseModalAction;
    editCourseAction: (courseId: number) => EditCourseModalAction;
    profile: Profile;
    children: ReactNode;
}

function DashboardProvider({
                               initialCourses,
                               createCourseAction,
                               editCourseAction,
                               profile,
                               children
                           }: DashboardProviderProps) {
    const [optimisticCourses, addOptimisticCourse] = useOptimistic<AnyStateCourse[], CreatingCourse>(
        // The initial courses (directly from server)
        initialCourses.map<InitialCourse>(course => ({ ...course, creating: false })),
        // When creating a new course, save the introduced details for rendering an optimistic preview
        // The skeleton is already managed by the CourseNavigationCard
        (state, course) =>
            [...state, { ...course, creating: true, creationTime: Date.now() } satisfies OptimisticCourse]
    );

    // Automatically add the known course to the optimistic list
    const createCourse = useCallback((data: { name: string, description: string, is_public: boolean }) => {
        addOptimisticCourse(data);
        return createCourseAction(data);
    }, [addOptimisticCourse, createCourseAction]);

    return <DashboardContext.Provider value={{
        optimisticCourses,
        createCourse,
        editCourse: editCourseAction,
        profile
    }}>
        {children}
    </DashboardContext.Provider>;
}

export default DashboardProvider;