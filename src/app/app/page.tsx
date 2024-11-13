import { getMyProfile } from "@/supabase/auth/Profile";
import DashboardCoursesSection from "@/app/app/_feature/components/organisms/DashboardCoursesSection";
import DashboardProfileSection from "@/app/app/_feature/components/organisms/DashboardProfileSection";
import DashboardNotificationsSection from "@/app/app/_feature/components/organisms/DashboardNotificationsSection";
import PageContainer from "@/components/containers/Page";
import { createCourseAction } from "@/collections/course/actions";
import autoRevalidate from "@/lib/helpers/autoRevalidate";

export default async function Page() {
    const profile = await getMyProfile();

    return <PageContainer className="w-full grid xl:grid-cols-3 gap-16">
        <DashboardCoursesSection
            profileId={profile.id}
            createCourseAction={autoRevalidate(createCourseAction, "/app")}
        />
        <aside className="flex flex-col items-stretch gap-16 order-first xl:order-none w-full">
            <DashboardProfileSection profile={profile}/>
            <DashboardNotificationsSection/>
        </aside>
    </PageContainer>;
}