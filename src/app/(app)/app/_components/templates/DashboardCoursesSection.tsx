import SectionContainer from "@/components/containers/SectionContainer";
import CreateCourseModal, { CreateCourseModalAction } from "@/collections/course/components/modals/CreateCourseModal";
import { IconPlus } from "@tabler/icons-react";
import ModalButton from "@/components/utils/ModalButton";
import { Suspense } from "react";
import { GenericCardGridSkeleton } from "@/components/common/GenericCardSkeleton";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import CourseCard from "@/collections/course/components/navigation/CourseCard";
import NoCourses from "@/collections/course/components/views/NoCourses";
import { getTranslations } from "next-intl/server";

export interface DashboardCoursesSectionProps {
    createCourseAction: CreateCourseModalAction;
    profileId: number;
}

async function DashboardCoursesSection({ createCourseAction, profileId }: DashboardCoursesSectionProps) {
    const t = await getTranslations();

    return <SectionContainer
        title="My Courses"
        className="xl:col-span-2 w-full"
        trailing={
            <ModalButton
                color="primary"
                radius="full"
                size="sm"
                variant="solid"
                startContent={<IconPlus/>}
                modal={<CreateCourseModal action={createCourseAction}/>}
            >
                {t("Dash.Course.new_create")}
            </ModalButton>
        }
    >
        <Suspense fallback={<GenericCardGridSkeleton/>}>
            <DashboardCoursesList profileId={profileId}/>
        </Suspense>
    </SectionContainer>;
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