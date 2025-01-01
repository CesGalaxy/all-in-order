import { getMyProfile } from "@/supabase/auth/profile";
import DashboardCoursesSection from "@/app/(app)/app/_components/templates/DashboardCoursesSection";
import DashboardNotificationsSection from "@/app/(app)/app/_components/templates/DashboardNotificationsSection";
import PageContainer from "@/components/containers/PageContainer";
import { createCourseAction } from "@/collections/course/actions";
import autoRevalidate from "@/lib/helpers/autoRevalidate";
import ProfileCard from "@/modules/user/components/molecules/ProfileCard";
import SectionContainer from "@/components/containers/SectionContainer";

export default async function Page() {
    const profile = await getMyProfile();

    return <PageContainer className="w-full grid xl:grid-cols-3 gap-16">
        <DashboardCoursesSection
            profileId={profile.id}
            createCourseAction={autoRevalidate(createCourseAction, "/app")}
        />
        <aside className="flex flex-col items-stretch gap-16 order-first xl:order-none w-full">
            <SectionContainer title="My Profile">
                <ProfileCard profile={profile}/>
            </SectionContainer>
            <DashboardNotificationsSection/>
        </aside>
    </PageContainer>;
}