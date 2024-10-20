"use client";

import { CreateCourseModalAction } from "@/collections/course/components/modals/CreateCourseModal";
import { Profile } from "@/supabase/models/Profile";
import PageContainer from "@/components/containers/Page";
import DashboardProvider from "@/app/app/_feature/reactivity/providers/DashboardProvider";
import DashboardProfileSection from "@/app/app/_feature/components/organisms/DashboardProfileSection";
import { RequiredCourse } from "@/app/app/_feature/reactivity/context/DashboardContext";
import DashboardCoursesSection from "@/app/app/_feature/components/organisms/DashboardCoursesSection";
import DashboardNotificationsSection from "@/app/app/_feature/components/organisms/DashboardNotificationsSection";

export interface DashboardTemplateProps {
    initialCourses: RequiredCourse[];
    createCourseAction: CreateCourseModalAction;
    profile: Profile;
}

function DashboardTemplate({ initialCourses, createCourseAction, profile }: DashboardTemplateProps) {
    return <DashboardProvider initialCourses={initialCourses} createCourseAction={createCourseAction} profile={profile}>
        <PageContainer className="w-full h-full grid xl:grid-cols-3 gap-16">
            <DashboardCoursesSection/>
            <aside className="flex flex-col items-stretch gap-16 order-first xl:order-none w-full">
                <DashboardProfileSection profile={profile}/>
                <DashboardNotificationsSection/>
            </aside>
        </PageContainer>
    </DashboardProvider>;
}

export default DashboardTemplate;