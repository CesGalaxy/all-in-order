"use server";

import PageContainer from "@/components/containers/PageContainer";
import { getMaybeMyProfile } from "@/lib/supabase/auth/profile";
import getSupabase from "@/lib/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import CourseCard from "@/collections/course/components/navigation/CourseCard";
import NoCourses from "@/collections/course/components/views/NoCourses";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import CreateCourseButton from "@/collections/course/components/CreateCourseButton";
import JoinCourseButton from "@/collections/course/components/JoinCourseButton";
import BlankView from "@/components/views/BlankView";
import noDataImage from "@/assets/pictures/no_data.svg";
import { Link } from "@nextui-org/link";
import { getTranslations } from "next-intl/server";

export default async function Courses() {
    const t = await getTranslations();
    const maybeProfile = await getMaybeMyProfile();
    const supabaseClient = await getSupabase();

    if (!maybeProfile) {
        const { data: courses, error } = await supabaseClient
            .from("courses")
            .select("*, subjects(*, topics(*))");

        if (error) return <ErrorView message={error.message}/>;

        return <PageContainer>
            {courses.length > 0
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
                : <BlankView
                    image={noDataImage}
                    alt={t("Extra.weird_place")}
                    title={t("Dash.Course.no_public")}
                    content={t("Extra.weird_place_you")}
                >
                    <Link href="/public" underline="always" size="lg">
                        {t("App.Actions.returnHome")}
                    </Link>
                </BlankView>
            }
        </PageContainer>;
    }

    const { data: courses, error } = await supabaseClient
        .from("courses")
        .select("id, name, description, is_public, members:course_members(profile, is_admin), subjects(id, name, color, topics(id, title))")
        .eq("members.profile", maybeProfile.id);

    if (error) return <ErrorView message={error.message}/>;

    return <PageContainer>
        {courses && courses.length > 0
            ? <ul className="w-full gap-4 lg:gap-8 xl:gap-16 grid lg:grid-cols-2 xl:grid-cols-3 auto-rows-min">
                <Card as="li" className="p-4 justify-center gap-4">
                    <CardHeader as="header" className="font-bold text-3xl justify-center">
                        {t("Dash.Course.new_create")}
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