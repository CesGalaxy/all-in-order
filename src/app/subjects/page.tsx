import NoCourses from "@/collections/course/components/views/NoCourses";
import PageContainer from "@/components/containers/Page";
import CourseNavigationCard from "@/collections/course/components/navigation/CourseNavigationCard";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import { getMaybeMyProfile } from "@/supabase/models/Profile";

export default async function Page() {
    const maybeProfile = await getMaybeMyProfile();

    if (!maybeProfile) {
        const { data: courses, error } = await getSupabase()
            .from("courses")
            .select("*, subjects(*, topics(*))");

        if (error) return <ErrorView message={error.message}/>;

        return <PageContainer>{courses && courses.length > 0
            ? <ul className="w-full h-full gap-4 lg:gap-8 xl:gap-16 grid lg:grid-cols-2 xl:grid-cols-3 auto-rows-min">
                {courses.map(course =>
                    <CourseNavigationCard course={course} key={course.id} isCourseAdmin={false}/>)}
            </ul>
            : <NoCourses/>
        }</PageContainer>;
    }

    const { data: courses, error } = await getSupabase()
        .from("courses")
        .select("*, members:course_members(profile_id), subjects(*, topics(*))")

    if (error) return <ErrorView message={error.message}/>;

    async function editCourse() {
        "use server";
        return undefined;
    }

    const content = courses && courses.length > 0
        ? <ul className="w-full h-full gap-4 lg:gap-8 xl:gap-16 grid lg:grid-cols-2 xl:grid-cols-3 auto-rows-min">
            {courses.map(course => <CourseNavigationCard
                course={course}
                key={course.id}
                editAction={editCourse}
                isCourseAdmin={course.members.some(m => m.profile_id === maybeProfile.id)}
            />)}
        </ul>
        : <NoCourses/>;

    return <PageContainer>{content}</PageContainer>;
}