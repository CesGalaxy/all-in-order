"use server";

import { Button } from "@nextui-org/button";
import { IconBrandAndroid } from "@tabler/icons-react";
import { Link } from "@nextui-org/link";
import PageContainer from "@/components/containers/Page";
import { Divider } from "@nextui-org/divider";
import { getTranslations } from "next-intl/server";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import NavigationCard from "@/collections/course/NavigationCard";

export default async function Home() {
    const t = await getTranslations();

    // Get the public courses.
    const { data, error } = await getSupabase()
        .from("courses")
        .select("*, subjects(*, topics(*))")
        .eq("is_public", true);

    if (error) return <ErrorView message={error.message}/>;

    const courses = required(data);

    return <PageContainer className="w-full h-full flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold">Public Courses</h1>
        <ul className="w-full gap-16 grid lg:grid-cols-2 xl:grid-cols-3 auto-rows-min">
            {courses.map(course => <NavigationCard course={course} key={course.id}/>)}
        </ul>
        <Divider/>
        <h1 className="text-2xl sm:text-3xl font-bold">{t('Home.create_resumes_with_ai')}</h1>
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
                startContent={<IconBrandAndroid/>}
                color="success"
                variant="shadow"
                className="hidden"
            >
                {t("Global.download")}
            </Button>
        </nav>
        <Divider/>
        <footer className="text-xs text-default">
            Plantas Herbívoras &copy; 2024
        </footer>
    </PageContainer>;
}
