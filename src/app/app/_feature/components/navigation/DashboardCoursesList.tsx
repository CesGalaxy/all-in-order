import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import CourseCard from "@/collections/course/components/navigation/CourseCard";
import NoCourses from "@/collections/course/components/views/NoCourses";

export default async function DashboardCoursesList({ profileId }: { profileId: number }) {
    const { data: courses, error } = await getSupabase()
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