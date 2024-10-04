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
import { generateQuestionAttempt, QuestionAnswer, QuestionData } from "@/features/beta_question";
import ExamActivity from "@/app/practices/[practiceId]/start/_feature/ExamActivity";
import { getMaybeMyProfile } from "@/supabase/models/Profile";
import { redirect } from "next/navigation";

export default async function Page({ params: { practiceId } }: { params: { practiceId: string } }) {
    const { data, error } = await getSupabase()
        .from("practices")
        .select("id, title, topic_id, activities:topic_activities(*)")
        .eq("id", parseInt(practiceId))
        .maybeSingle();

    if (error) return <ErrorView message={error.message}/>;

    const { id, title, topic_id, activities } = required(data);

    const generatedActivities = activities.map(activity => ({
        ...activity,
        attempt: generateQuestionAttempt(activity.data as any as QuestionData),
    }));

    const now = new Date();

    async function finishExam(startedAt: string, answers: [QuestionAnswer, boolean][]) {
        "use server";

        const endedAt = new Date().toUTCString();

        const profile = await getMaybeMyProfile();

        if (!profile) return "login";

        const total = answers.length;
        const correct = answers.filter(([_, correct]) => correct).length;

        const perfection = correct / total;

        const { data, error } = await getSupabase()
            .from("practice_attempts")
            .insert({
                perfection,
                answers: answers.map(([answer, correct]) => answer),
                practice_id: id,
                profile_id: profile.id,
                started_at: startedAt,
                ended_at: endedAt
            })
            .select("id")
            .single();

        if (error) return error.message;

        redirect(`/practices/${id}/results/${data.id}`);
    }

    return <ExamProvider
        activities={generatedActivities as any as Activity[]}
        startedAt={now.valueOf()}
        finishExam={finishExam.bind(null, now.toUTCString())}
    >
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