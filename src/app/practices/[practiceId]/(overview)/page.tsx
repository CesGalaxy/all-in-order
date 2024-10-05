"use server";

import PageContainer from "@/components/containers/Page";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import { IconBooks, IconCalendar, IconMeteor, IconPlayerPlay, IconRobot } from "@tabler/icons-react";
import { Chip } from "@nextui-org/chip";

export default async function Page({ params: { practiceId } }: { params: { practiceId: string } }) {
    const { data, error } = await getSupabase()
        .from("practices")
        .select("*, topic:topics(title), author:profiles(id, name, username, avatar_url), attempts:practice_attempts(perfection, started_at, ended_at)")
        .eq("id", practiceId)
        .maybeSingle();

    if (error) return <ErrorView message={error.message}/>;

    const { id, title, description, topic, author, created_at, updated_at, attempts } = required(data);

    console.log(attempts)

    const attemptsCount = attempts.length;
    const averagePerfection = attempts
            .reduce((accumulator, attempt) => accumulator + attempt.perfection, 0)
        / attemptsCount;

    return <PageContainer className="">
        <header className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <Card as="main" className="xl:col-span-2">
                <CardHeader className="text-xl font-medium">
                    {title}
                </CardHeader>
                <CardBody>
                    {description && <p className="text-default">{description}</p>}
                    <ul className="flex items-center justify-evenly">
                        <div className="w-fit flex flex-col items-center">
                            <Link href={`/practices/${id}/attempts`}
                                  className="text-default-500 text-xs uppercase">AVG. SCORE</Link>
                            <b>{averagePerfection}%</b>
                        </div>
                        <div className="w-fit flex flex-col items-center">
                            <Link href={`/practices/${id}/attempts`}
                                  className="text-default-500 text-xs uppercase">ATTEMPTS</Link>
                            <b>{attemptsCount}</b>
                        </div>
                    </ul>
                    <br/>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <li>
                            <p className="text-tiny uppercase font-bold mb-2">Created by</p>
                            {!author
                                ? <p>author</p>
                                : <Chip startContent={<IconRobot/>} size="lg">AI</Chip>
                            }
                        </li>
                        <li>
                            <p className="text-tiny uppercase font-bold mb-2">Created at</p>
                            <Chip startContent={<IconCalendar/>} size="lg">{created_at.split("T")[0]}</Chip>
                        </li>
                        <li>
                            <p className="text-tiny uppercase font-bold mb-2">Topic</p>
                            <Chip startContent={<IconBooks/>} size="lg">{topic!.title}</Chip>
                        </li>
                        <li>
                            <p className="text-tiny uppercase font-bold mb-2">Updated</p>
                            <Chip startContent={<IconCalendar/>} size="lg">
                                {updated_at?.split("T")[0] || "Never"}
                            </Chip>
                        </li>
                    </ul>
                </CardBody>
                <Divider/>
                <CardFooter className="gap-4">
                    <Button
                        color="primary"
                        as={Link}
                        href="start"
                        startContent={<IconPlayerPlay/>}
                    >
                        Practice now!
                    </Button>
                    <Button startContent={<IconMeteor/>}>Quick lesson</Button>
                </CardFooter>
            </Card>
            <aside className=""></aside>
        </header>
        <br/>
        <div className="grid grid-cols-3">
            <table className="border-collapse border border-divider table-auto col-span-3">
                <thead>
                <tr>
                    <th className="border-r border-l-divider">Score</th>
                    <th className="border-r border-l-divider">Date</th>
                    <th>Duration</th>
                </tr>
                </thead>
                <tbody>
                {attempts.map((attempt, i) => <tr key={i} className="border-t border-dividier">
                    <td className="border-r border-l-divider">{attempt.perfection}%</td>
                    <td className="border-r border-l-divider">{attempt.ended_at.split("T")[0]}</td>
                    <td>
                        {(new Date(attempt.ended_at).getTime() - new Date(attempt.started_at).getTime()) / 1000}s
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>
    </PageContainer>
}