import { getMyProfile } from "@/supabase/models/Profile";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import DashboardTemplate from "@/app/app/_feature/components/templates/DashboardTemplate";
import { dashboard_createCourse } from "@/app/app/_feature/actions";

export default async function Page() {
    const profile = await getMyProfile();

    const { data: courses, error } = await getSupabase()
        .from("courses")
        .select("id, name, description, is_public, subjects(id, name, color, topics(id, title)), course_members(profile_id, is_admin)")
        .eq("course_members.profile_id", profile.id);

    if (error) return <ErrorView message={error.message}/>;

    return <DashboardTemplate
        initialCourses={courses}
        createCourseAction={dashboard_createCourse}
        editCourseAction={async () => {
            "use server";

            return async () => {
                "use server";
                return { ok: false };
            }
        }}
        profile={profile}
    />;
}