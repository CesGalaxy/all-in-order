"use server";

import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { Link } from "@heroui/link";
import Image from "next/image";
import LogoIcoCol from "@/assets/logo/IcoCol.svg";
import getSupabase from "@/lib/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import { Button } from "@heroui/button";
import { IconDoorExit } from "@tabler/icons-react";
import { Activity, ExamProvider } from "@/app/(app)/practices/[practiceId]/start/_feature/ExamContext";
import Counter from "@/app/(app)/practices/[practiceId]/start/_feature/Counter";
import BottomNavigation from "@/app/(app)/practices/[practiceId]/start/_feature/BottomNavigation";
import CurrentQuestionTitle from "@/app/(app)/practices/[practiceId]/start/_feature/CurrentQuestionTitle";
import ExamActivity from "@/app/(app)/practices/[practiceId]/start/_feature/ExamActivity";
import { getMaybeMyProfile } from "@/lib/supabase/auth/profile";
import { redirect } from "next/navigation";
import { Json } from "@aio/db/supabase";
import { Question, QUESTION_ATTEMPT_GENERATORS, QuestionAnswer, QuestionType } from "@/modules/learn/question";

export default async function Page({ params }: { params: Promise<{ practiceId: string }> }) {
    const { practiceId } = await params;

    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
        .from("practices")
        .select("id, title, topic_id, activities:topic_activities(*)")
        .eq("id", parseInt(practiceId))
        .maybeSingle();

    if (error) return <ErrorView message={error.message}/>;

    const { id, title, topic_id, activities } = required(data);

    if (activities.length === 0) return <ErrorView message="No activities found"/>;

    const generatedActivities = activities.map(activity => ({
        ...activity,
        attempt: QUESTION_ATTEMPT_GENERATORS[(activity.data as any).type as QuestionType](activity.data as any as Question),
    }));

    const now = new Date();

    async function finishExam(startedAt: string, answers: [QuestionAnswer, boolean][]) {
        "use server";

        const endedAt = new Date().toUTCString();

        const profile = await getMaybeMyProfile();

        if (!profile) return "login";

        const total = answers.length;
        const correct = answers.filter(([_, correct]) => correct).length;

        const perfection = Math.round((correct * 100) / total);

        const supabaseClient = await getSupabase();
        const { data, error } = await supabaseClient
            .from("practice_attempts")
            // @ts-ignore
            .insert({
                perfection,
                answers: answers.map(([answer, correct]) => answer) as unknown as Json,
                practice_id: id,
                profile_id: profile.id,
                started_at: startedAt,
                ended_at: endedAt
            })
            .select("id")
            .single();

        if (error) return error.message;

        redirect(`/topics/${topic_id}`);
        // redirect(`/practices/${id}/results/${data.id}`);
    }

    return <ExamProvider
        activities={generatedActivities as any as Activity[]}
        startedAt={now.valueOf()}
        finishExam={finishExam.bind(null, now.toUTCString())}
    >
        <main className="w-full h-dvh flex flex-col grow -mt-16">
            <header className="bg-content2 text-content2-foreground">
                <Navbar className="bg-content2 -ml-4" classNames={{ wrapper: "pl-2" }} isBlurred={false}>
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
                            <Link href="/public">
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
            <div className="w-full h-full grow container mx-auto relative overflow-x-auto">
                <ExamActivity/>
            </div>
            <footer className="bg-content2 text-content2-foreground flex flex-col items-center gap-4 p-4 relative">
                <Counter/>
                <BottomNavigation/>
            </footer>
        </main>
    </ExamProvider>
}