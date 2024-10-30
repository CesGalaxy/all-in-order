"use client";

import CourseNavigationCard, {
    ExistentCourse as CourseNavigationCardExistentCourse
} from "@/collections/course/components/navigation/CourseNavigationCard";
import NoCourses from "@/collections/course/components/views/NoCourses";
import SectionContainer from "@/components/containers/SectionContainer";
import CreateCourseModal, { CreateCourseModalAction } from "@/collections/course/components/modals/CreateCourseModal";
import { IconPlus } from "@tabler/icons-react";
import { Key, useMemo, useOptimistic } from "react";
import { Course, CourseMember } from "@/supabase/entities";
import ModalButton from "@/components/utils/ModalButton";

export type RequiredCourse = CourseNavigationCardExistentCourse & {
    members?: Pick<CourseMember, "profile_id" | "is_admin">[]
};

export type CreatingCourse = Pick<Course, "name" | "description" | "is_public">;
export type OptimisticCourse = CreatingCourse & { creating: true, creationTime: Key };
export type AnyStateCourse = OptimisticCourse | RequiredCourse;

export interface DashboardCoursesSectionProps {
    courses: RequiredCourse[];
    createCourseAction?: CreateCourseModalAction;
    profileId: number;
}

function DashboardCoursesSection({ courses, createCourseAction, profileId }: DashboardCoursesSectionProps) {
    const [optimisticCourses, addOptimisticCourse] = useOptimistic<AnyStateCourse[], CreatingCourse>(
        // The initial courses (directly from server)
        courses.map<RequiredCourse>(course => ({ ...course, creating: false })),
        // When creating a new course, save the introduced details for rendering an optimistic preview
        // The skeleton is already managed by the CourseNavigationCard
        (state, course) =>
            [...state, { ...course, creating: true, creationTime: Date.now() } satisfies OptimisticCourse]
    );

    const createCourse = useMemo(() => createCourseAction
            ? (data: { name: string, description: string, is_public: boolean }) => {
                addOptimisticCourse(data);
                return createCourseAction(data);
            }
            : null,
        [addOptimisticCourse, createCourseAction]
    );

    return <SectionContainer
        title="My Courses"
        className="xl:col-span-2 w-full xl:h-full"
        trailing={
            createCourse && <ModalButton
                color="primary"
                radius="full"
                size="sm"
                variant="solid"
                startContent={<IconPlus/>}
                modal={<CreateCourseModal action={createCourse}/>}
            >
                Create course
            </ModalButton>
        }
    >
        {
            optimisticCourses && optimisticCourses.length > 0
                ? <ul className="w-full grid lg:grid-cols-2 gap-8 lg:gap-16 auto-rows-min">
                    {optimisticCourses.map(course => "id" in course
                        ? <CourseNavigationCard
                            key={course.id}
                            course={course}
                            profileId={profileId}
                        />
                        : <CourseNavigationCard
                            key={course.creationTime}
                            course={course}
                            profileId={profileId}
                        />
                    )}
                </ul>
                : <NoCourses/>
        }
    </SectionContainer>;
}

export default DashboardCoursesSection;