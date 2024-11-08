import { getMyProfile } from "@/supabase/models/Profile";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import DashboardCoursesSection from "@/app/app/_feature/components/organisms/DashboardCoursesSection";
import DashboardProfileSection from "@/app/app/_feature/components/organisms/DashboardProfileSection";
import DashboardNotificationsSection from "@/app/app/_feature/components/organisms/DashboardNotificationsSection";
import PageContainer from "@/components/containers/Page";
import { createCourseAction } from "@/collections/course/actions";
import autoRevalidate from "@/lib/helpers/autoRevalidate";

export default async function Page() {
    const profile = await getMyProfile();

    const { data, error } = await getSupabase()
        .from("courses")
        .select("id, name, description, is_public, subjects(id, name, color, topics(id, title)), members:course_members(profile_id, is_admin)")
        .eq("course_members.profile_id", profile.id);

    if (error) return <ErrorView message={error.message}/>;

    return <PageContainer className="w-full grid xl:grid-cols-3 gap-16">
        <DashboardCoursesSection
            courses={data?.map(course => ({ ...course, creating: false }))}
            profileId={profile.id}
            createCourseAction={autoRevalidate(createCourseAction, "/app")}
        />
        <aside className="flex flex-col items-stretch gap-16 order-first xl:order-none w-full">
            <DashboardProfileSection profile={profile}/>
            <DashboardNotificationsSection/>
        </aside>
    </PageContainer>;
}