"use server";

import PageContainer from "@/components/containers/Page";
import { getMaybeMyProfile } from "@/supabase/auth/profile";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import CourseCard from "@/collections/course/components/navigation/CourseCard";
import NoCourses from "@/collections/course/components/views/NoCourses";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import CreateCourseButton from "@/collections/course/components/CreateCourseButton";
import JoinCourseButton from "@/collections/course/components/JoinCourseButton";

export default async function Courses() {
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
            ? <ul className="w-full gap-4 lg:gap-8 xl:gap-16 grid lg:grid-cols-2 xl:grid-cols-3 auto-rows-min">
                <Card as="li" className="p-4 justify-center gap-4">
                    <CardHeader as="header" className="font-bold text-3xl justify-center">
                        Create a new course!
                    </CardHeader>
                    <CardFooter as="nav" className="flex flex-wrap gap-4 items-center justify-center">
                        <CreateCourseButton/>
                        <JoinCourseButton/>
                    </CardFooter>
                </Card>
                {courses.map(course => <CourseCard
                    key={course.id}
                    course={course}
                    profileId={maybeProfile.id}
                />)}
            </ul>
            : <NoCourses/>
        }
    </PageContainer>;
}