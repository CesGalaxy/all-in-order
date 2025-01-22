"use server";

import PageContainer from "@/components/containers/PageContainer";
import { getMaybeMyProfile } from "@/lib/supabase/auth/profile";
import CoursesList from "@/collections/course/components/data/CoursesList";

export default async function Courses() {
    const maybeProfile = await getMaybeMyProfile();

    if (!maybeProfile) {
        return <PageContainer>
            <CoursesList small filter="public"/>
        </PageContainer>;
    }

    return <PageContainer>
        <CoursesList showWelcome small/>
    </PageContainer>;
}

// <BlankView
//     image={noDataImage}
//     alt={t("Extra.weird_place")}
//     title={t("Dash.Course.no_public")}
//     content={t("Extra.weird_place_you")}
// >
//     <Link href="/public" underline="always" size="lg">
//         {t("App.Actions.returnHome")}
//     </Link>
// </BlankView>