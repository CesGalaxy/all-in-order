"use server";

import { Button } from "@nextui-org/button";
import { IconBrandAndroid } from "@tabler/icons-react";
import { Link } from "@nextui-org/link";
import PageContainer from "@/components/containers/PageContainer";
import { Divider } from "@nextui-org/divider";
import { getTranslations } from "next-intl/server";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import CourseCard from "@/collections/course/components/navigation/CourseCard";
import SectionContainer from "@/components/containers/SectionContainer";

export default async function Home() {
    const t = await getTranslations();
    const supabaseClient = await getSupabase();

    // Get the public courses.
    const { data: courses, error } = await supabaseClient
        .from("courses")
        .select("*, subjects(*, topics(*))")
        .eq("is_public", true)
        .limit(6);

    if (error) return <ErrorView message={error.message}/>;

    return <PageContainer className="w-full gap-16 grid grid-cols-1 xl:grid-cols-3 auto-rows-min">
        <header>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">{t('Home.create_resumes_with_ai')}</h1>
            <Divider className="my-8"/>
            <nav className="flex items-center gap-4">
                <Button
                    size="lg"
                    as={Link}
                    href="/app"
                >
                    {t('Global.web_version')}
                </Button>
                <Button
                    size="lg"
                    as={Link}
                    startContent={<IconBrandAndroid/>}
                    color="success"
                    variant="shadow"
                    href="/app"
                >
                    {t("Global.download")}
                </Button>
            </nav>
        </header>
        <SectionContainer
            title={t("Home.public_courses")}
            className="w-full xl:col-span-2"
            trailing={<Link href="/explore" isExternal showAnchorIcon>Explore more courses</Link>}
        >
            <ul className="w-full gap-16 grid md:grid-cols-2 auto-rows-min">
                {courses.map(course =>
                    <CourseCard course={course} key={course.id} forceAdmin={false}/>)}
            </ul>
        </SectionContainer>
        <footer className="text-xs text-default col-span-full">
            <Divider/>
            Plantas Herbívoras &copy; 2024
        </footer>
    </PageContainer>;
}
