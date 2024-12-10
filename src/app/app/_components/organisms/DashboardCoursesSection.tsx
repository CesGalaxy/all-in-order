import SectionContainer from "@/components/containers/SectionContainer";
import CreateCourseModal, { CreateCourseModalAction } from "@/collections/course/components/modals/CreateCourseModal";
import { IconPlus } from "@tabler/icons-react";
import ModalButton from "@/components/utils/ModalButton";
import { Suspense } from "react";
import GenericCardSkeleton from "@/components/common/GenericCardSkeleton";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import CourseCard from "@/collections/course/components/navigation/CourseCard";
import NoCourses from "@/collections/course/components/views/NoCourses";

export interface DashboardCoursesSectionProps {
    createCourseAction?: CreateCourseModalAction;
    profileId: number;
}

async function DashboardCoursesSection({ createCourseAction, profileId }: DashboardCoursesSectionProps) {
    return <SectionContainer
        title="My Courses"
        className="xl:col-span-2 w-full"
        trailing={
            createCourseAction && <ModalButton
                color="primary"
                radius="full"
                size="sm"
                variant="solid"
                startContent={<IconPlus/>}
                modal={<CreateCourseModal action={createCourseAction}/>}
            >
                Create course
            </ModalButton>
        }
    >
        <Suspense fallback={<DashboardCoursesListSkeleton/>}>
            <DashboardCoursesList profileId={profileId}/>
        </Suspense>
    </SectionContainer>;
}

function DashboardCoursesListSkeleton() {
    return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => <GenericCardSkeleton key={i}/>)}
    </div>;
}

async function DashboardCoursesList({ profileId }: { profileId: number }) {
    const supabaseClient = await getSupabase();
    const { data: courses, error } = await supabaseClient
        .from("courses")
        .select("id, name, description, is_public, subjects(id, name, color, topics(id, title)), members:course_members(profile, is_admin)")
        .eq("course_members.profile", profileId);

    if (error) return <ErrorView message={error.message}/>;

    return courses && courses.length > 0
        ? <ul className="w-full grid lg:grid-cols-2 gap-8 lg:gap-16 auto-rows-min">
            {courses.map(course => <CourseCard
                key={course.id}
                course={course}
                profileId={profileId}
            />)}
        </ul>
        : <NoCourses/>;
}

export default DashboardCoursesSection;