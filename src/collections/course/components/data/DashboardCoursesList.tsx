"use server";

import ErrorView from "@/components/views/ErrorView";
import CourseCard from "@/collections/course/components/navigation/CourseCard";
import NoCourses from "@/collections/course/components/views/NoCourses";
import { getMyProfile } from "@/lib/supabase/auth/profile";
import { getAllMyCourses } from "@/collections/course/query";

export default async function DashboardCoursesList() {
    const { data: courses, error } = await getAllMyCourses();

    if (error) return <ErrorView message={error.message}/>;

    const { id: profileId } = await getMyProfile();

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