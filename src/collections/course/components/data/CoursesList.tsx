"use server";

import ErrorView from "@/components/views/ErrorView";
import CourseCard from "@/collections/course/components/navigation/CourseCard";
import NoCourses from "@/collections/course/components/views/NoCourses";
import { getMyProfile } from "@/lib/supabase/auth/profile";
import { getAllCourses, getAllMyCourses, getAllPublicCourses } from "@/collections/course/query";
import { cn } from "@heroui/theme";
import ContentGallery from "@/components/navigation/ContentGallery";
import { Card, CardFooter, CardHeader } from "@heroui/card";
import CreateCourseButton from "@/collections/course/components/CreateCourseButton";
import JoinCourseButton from "@/collections/course/components/JoinCourseButton";
import { useTranslations } from "next-intl";

const queries = {
    my: getAllMyCourses,
    public: getAllPublicCourses,
    all: getAllCourses
}

/**
 * A list of courses
 * @param small Are the cards small?
 * @param filter Which courses to show
 * @constructor
 */
export default async function CoursesList({ small, filter = "my", showWelcome }: {
    small?: boolean,
    filter?: "my" | "public" | "all",
    showWelcome?: boolean
}) {
    const { data: courses, error } = await queries[filter]();

    if (error) return <ErrorView message={error.message}/>;

    const { id: profileId } = await getMyProfile();

    return <ContentGallery
        before={showWelcome && <CoursesListWelcome/>}
        items={courses}
        getItemKey={"id"}
        renderItem={course => <CourseCard
            course={course}
            profileId={profileId}
        />}
        emptyView={<NoCourses/>}
        className={cn("w-full grid gap-8 lg:gap-16 auto-rows-min", small ? "lg:grid-cols-3" : "lg:grid-cols-2")}
    />
}

function CoursesListWelcome() {
    const t = useTranslations();

    return <Card as="li" className="p-4 justify-center gap-4">
        <CardHeader as="header" className="font-bold text-3xl justify-center">
            {t("Dash.Course.new_create")}
        </CardHeader>
        <CardFooter as="nav" className="flex flex-wrap gap-4 items-center justify-center">
            <CreateCourseButton/>
            <JoinCourseButton/>
        </CardFooter>
    </Card>
}