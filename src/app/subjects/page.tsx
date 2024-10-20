import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import { getMaybeMyProfile } from "@/supabase/models/Profile";
import PublicSubjectsPageTemplate from "@/app/subjects/_feature/components/templates/PublicSubjectsPageTemplate";
import MySubjectsPageTemplate from "@/app/subjects/_feature/components/templates/MySubjectsPageTemplate";

export default async function Page() {
    const maybeProfile = await getMaybeMyProfile();

    if (!maybeProfile) {
        const { data, error } = await getSupabase()
            .from("courses")
            .select("*, subjects(*, topics(*))");

        if (error) return <ErrorView message={error.message}/>;

        return <PublicSubjectsPageTemplate courses={data}/>;
    }

    const { data, error } = await getSupabase()
        .from("courses")
        .select("id, name, description, is_public, members:course_members(profile_id, is_admin), subjects(id, name, color, topics(id, title))")
        .eq("members.profile_id", maybeProfile.id);

    if (error) return <ErrorView message={error.message}/>;

    return <MySubjectsPageTemplate courses={data} profile={maybeProfile}/>;
}