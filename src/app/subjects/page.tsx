import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import { getMaybeMyProfile } from "@/supabase/auth/Profile";
import CourseCard from "@/collections/course/components/navigation/CourseCard";
import NoCourses from "@/collections/course/components/views/NoCourses";
import PageContainer from "@/components/containers/Page";

export default async function Page() {
    const maybeProfile = await getMaybeMyProfile();

    if (!maybeProfile) {
        const { data: courses, error } = await getSupabase()
            .from("courses")
            .select("*, subjects(*, topics(*))");

        if (error) return <ErrorView message={error.message}/>;

        return <PageContainer>
            {courses && courses.length > 0
                ?
                <ul className="w-full h-full gap-4 lg:gap-8 xl:gap-16 grid lg:grid-cols-2 xl:grid-cols-3 auto-rows-min">
                    {courses.map(course =>
                        <CourseCard
                            course={course}
                            key={course.id}
                            forceAdmin={false}
                        />
                    )}
                </ul>
                : <NoCourses/>
            }
        </PageContainer>;
    }

    const { data: courses, error } = await getSupabase()
        .from("courses")
        .select("id, name, description, is_public, members:course_members(profile, is_admin), subjects(id, name, color, topics(id, title))")
        .eq("members.profile", maybeProfile.id);

    if (error) return <ErrorView message={error.message}/>;

    return <PageContainer>
        {courses && courses.length > 0
            ? <ul className="w-full h-full gap-4 lg:gap-8 xl:gap-16 grid lg:grid-cols-2 xl:grid-cols-3 auto-rows-min">
                {courses.map(course => <CourseCard
                    key={course.id}
                    course={course}
                    profileId={maybeProfile.id}
                />)}
            </ul>
            : <NoCourses/>
        }
    </PageContainer>
}