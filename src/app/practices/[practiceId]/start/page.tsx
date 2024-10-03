"use server";

import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import Image from "next/image";
import LogoIcoCol from "@/assets/logo/IcoCol.svg";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import { Button } from "@nextui-org/button";
import { IconDoorExit } from "@tabler/icons-react";
import { Activity, ExamProvider } from "@/app/practices/[practiceId]/start/_feature/ExamContext";
import Counter from "@/app/practices/[practiceId]/start/_feature/Counter";
import BottomNavigation from "@/app/practices/[practiceId]/start/_feature/BottomNavigation";
import CurrentQuestionTitle from "@/app/practices/[practiceId]/start/_feature/CurrentQuestionTitle";
import { generateQuestionAttempt, QuestionData } from "@/features/beta_question";
import ExamActivity from "@/app/practices/[practiceId]/start/_feature/ExamActivity";

export default async function Page({ params: { practiceId } }: { params: { practiceId: string } }) {
    const { data, error } = await getSupabase()
        .from("practices")
        .select("title, topic_id, activities:topic_activities(*)")
        .eq("id", parseInt(practiceId))
        .maybeSingle();

    if (error) return <ErrorView message={error.message}/>;

    const { activities, title, topic_id } = required(data);

    const generatedActivities = activities.map(activity => ({
        ...activity,
        attempt: generateQuestionAttempt(activity.data as any as QuestionData),
    }));

    const now = new Date();

    return <ExamProvider activities={generatedActivities as any as Activity[]} startedAt={now.valueOf()}>
        <main className="w-full h-full flex flex-col">
            <header className="bg-content2 text-content2-foreground">
                <Navbar className="bg-transparent -ml-4" classNames={{ wrapper: "pl-2" }}>
                    <NavbarContent>
                        <Button
                            as={Link}
                            isIconOnly
                            variant="faded"
                            href={`/topics/${topic_id}/`}
                        >
                            <IconDoorExit/>
                        </Button>
                        <NavbarBrand>
                            <Link href="/">
                                <Image src={LogoIcoCol} alt="All In Order" height={64} priority/>
                            </Link>
                        </NavbarBrand>
                    </NavbarContent>
                    <NavbarContent justify="center">
                        <p className="text-lg font-bold text-inherit">{title}</p>
                    </NavbarContent>
                </Navbar>
                <nav className="px-2 pb-2 --flex --items-center gap-4 grid grid-cols-1 grid-rows-1">
                    <CurrentQuestionTitle/>
                </nav>
            </header>
            <div className="w-full h-full flex-grow container mx-auto relative">
                <ExamActivity/>
            </div>
            <footer className="bg-content2 text-content2-foreground flex flex-col items-center gap-4 p-4 relative">
                <Counter/>
                <BottomNavigation/>
            </footer>
        </main>
    </ExamProvider>
}