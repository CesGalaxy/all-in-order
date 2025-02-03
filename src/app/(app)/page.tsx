"use server";

import { Button } from "@heroui/button";
import {
    IconBrandAndroid,
    IconDatabase,
    IconDeviceGamepad,
    IconNotebook,
    IconPresentation,
    IconSparkles,
    IconVocabulary
} from "@tabler/icons-react";
import { Link } from "@heroui/link";
import PageContainer from "@/components/containers/PageContainer";
import { Divider } from "@heroui/divider";
import { getTranslations } from "next-intl/server";
import getSupabase from "@/lib/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import CourseCard from "@/collections/course/components/navigation/CourseCard";
import SectionContainer from "@/components/containers/SectionContainer";
import { Card, CardBody, CardHeader } from "@heroui/card";

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

    return <PageContainer className="space-y-8">
        <div className="w-full gap-16 grid grid-cols-1 xl:grid-cols-3 auto-rows-min">
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
        </div>
        <section className="bg-gradient-to-t from-primary-100/50 dark:from-primary-900/50
        via-content1 dark:via-content1 to-content1 dark:to-content1 text-content1-foreground
            p-8 rounded-xl">
            <header>
                <h2 className="text-5xl md:text-6xl font-bold bg-clip-text bg-gradient-to-tr from-pink-500 to-yellow-500 text-transparent">
                    A notebook with superpowers
                </h2>
                <p className="p-4 text-xl max-w-[600px]">
                    Keep all your notes, vocabulary, resources and media in one place; organized and accessible from
                    anywhere.
                </p>
            </header>
            <ul className="grid lg:grid-cols-2 gap-4 max-w-[800px] mt-16">
                <Card as="li" className="border-medium border-opacity-50 border-primary">
                    <CardHeader className="font-bold text-xl gap-2 items-center">
                        <IconNotebook/>
                        Create notebooks & docs
                    </CardHeader>
                    <CardBody>
                        And store everything, just like Notion!
                    </CardBody>
                </Card>
                <Card as="li" className="border-medium border-opacity-50 border-primary">
                    <CardHeader className="font-bold text-xl gap-2 items-center">
                        <IconVocabulary/>
                        Save the vocabulary
                    </CardHeader>
                    <CardBody>
                        Create flashcards, dictionaries and more!
                    </CardBody>
                </Card>
                <Card as="li" className="border-medium border-opacity-50 border-primary">
                    <CardHeader className="font-bold text-xl gap-2 items-center">
                        <IconDatabase/>
                        Organize your agenda
                    </CardHeader>
                    <CardBody>
                        Manage your tasks and organize your time!
                    </CardBody>
                </Card>
                <Card as="li" className="border-medium border-opacity-50 border-primary">
                    <CardHeader className="font-bold text-xl gap-2 items-center">
                        <IconSparkles/>
                        Think with AI
                    </CardHeader>
                    <CardBody>
                        Let the AI help you with learning!
                    </CardBody>
                </Card>
            </ul>
        </section>
        <section className="p-8 rounded-xl text-white
        bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800">
            <header className="text-center">
                <h2 className="text-6xl font-bold">Bring your notes to life</h2>
                <p className="text-xl">
                    Do real magic with&nbsp;
                    <span className="font-mono font-bold">AI-0</span>
                    &nbsp;and improve your learning experience.
                </p>
                <br/>
                <nav className="flex gap-8 justify-center w-full">
                    <Button size="lg" variant="light">
                        Learn more
                    </Button>
                    <Button
                        startContent={<IconSparkles/>}
                        className="bg-white/80 text-primary"
                        size="lg"
                    >Get started with AI</Button>
                </nav>
            </header>
        </section>
        <section className="p-8 rounded-xl bg-content1 text-content1-foreground">
            <header className="lg:text-end mb-16 pr-8">
                <h2 className="text-6xl font-bold">
                    Learn everything <span
                    className="bg-clip-text bg-gradient-to-tr from-pink-500 to-yellow-500 text-transparent">
                        you
                    </span> want
                </h2>
            </header>
            <ul className="gap-8 flex flex-col w-fit place-self-end">
                <Card as="li" className="border-medium border-opacity-50 border-primary p-4">
                    <CardHeader className="font-bold text-xl gap-2 items-center">
                        <IconDeviceGamepad/>
                        Just like a game
                    </CardHeader>
                    <CardBody className="items-end text-foreground-400">
                        the same way Duolingo does
                    </CardBody>
                </Card>
                <Card as="li" className="border-medium border-opacity-50 border-primary p-4">
                    <CardHeader className="font-bold text-xl gap-2 items-center">
                        <IconPresentation/>
                        Watch your progress
                    </CardHeader>
                    <CardBody className="items-end text-foreground-400">
                        and know where you should improve
                    </CardBody>
                </Card>
                <Card as="li" className="border-medium border-opacity-50 border-primary p-4">
                    <CardHeader className="font-bold text-xl gap-2 items-center">
                        <IconSparkles/>
                        AI-assisted learning
                    </CardHeader>
                    <CardBody className="items-end text-foreground-400">
                        generate questions and explain errors
                    </CardBody>
                </Card>
            </ul>
        </section>
        <footer className="text-xs text-default">
            <Divider/>
            Plantas Herbívoras &copy; 2024
        </footer>
    </PageContainer>;
}
