import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Chip } from "@nextui-org/chip";
import {
    IconBooks,
    IconCalendar,
    IconEdit,
    IconMeteor,
    IconPlayerPlay,
    IconRobot,
    IconUser
} from "@tabler/icons-react";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import ModalButton from "@/components/utils/ModalButton";
import EditPracticeModal from "@/app/(app)/practices/[practiceId]/(overview)/_components/EditPracticeModal";
import { TopicActivity } from "@/lib/supabase/entities";

export interface PracticeDetailsCardProps {
    title: string;
    description?: string;
    attemptsCount: number;
    averagePerfection: number;
    averageDuration: number;
    author: {
        id: number;
        name: string;
        avatar_url: string | null;
    } | null;
    created_at: string;
    updated_at?: string;
    topic: {
        id: number;
        title: string;
    };
    id: number;
    activities: TopicActivity[];
}

export default function PracticeDetailsCard({
                                                title,
                                                description,
                                                attemptsCount,
                                                averagePerfection,
                                                averageDuration,
                                                author,
                                                created_at,
                                                updated_at,
                                                topic,
                                                id,
                                                activities,
                                            }: PracticeDetailsCardProps) {
    return <Card as="main" className="xl:col-span-2">
        <CardHeader className="text-xl font-medium">
            {title}
        </CardHeader>
        <CardBody>
            {description && <p className="text-default">{description}</p>}
            <ul className="flex items-center justify-evenly">
                <div className="w-fit flex flex-col items-center">
                    <Link href={`/practices/${id}/stats`}
                          className="text-default-500 text-xs uppercase">avg. duration</Link>
                    <b>{averageDuration}s</b>
                </div>
                <div className="w-fit flex flex-col items-center">
                    <Link href={`/practices/${id}/stats`}
                          className="text-default-500 text-xs uppercase">avg. score</Link>
                    <b>{averagePerfection}%</b>
                </div>
                <div className="w-fit flex flex-col items-center">
                    <Link href={`/practices/${id}/attempts`}
                          className="text-default-500 text-xs uppercase">Attempts</Link>
                    <b>{attemptsCount}</b>
                </div>
            </ul>
            <br/>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <li>
                    <p className="text-tiny uppercase font-bold mb-2">Created by</p>
                    {author
                        ? <Chip
                            startContent={author.avatar_url
                                ? <Avatar
                                    src={author.avatar_url}
                                    alt={author.name}
                                    size="sm"
                                />
                                : <IconUser/>
                            }
                            size="lg"
                        >
                            {author.name}
                        </Chip>
                        : <Chip startContent={<IconRobot/>} size="lg">AI</Chip>
                    }
                </li>
                <li>
                    <p className="text-tiny uppercase font-bold mb-2">Created at</p>
                    <Chip startContent={<IconCalendar/>} size="lg">{created_at.split("T")[0]}</Chip>
                </li>
                <li>
                    <p className="text-tiny uppercase font-bold mb-2">Topic</p>
                    <Chip
                        as={Link}
                        href={`/topics/${topic!.id}`}
                        startContent={<IconBooks/>}
                        size="lg"
                    >
                        {topic!.title}
                    </Chip>
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
        <CardFooter className="gap-4 justify-between *:flex *:items-center *:gap-4">
            <nav>
                <Button
                    color="primary"
                    as={Link}
                    href="start"
                    startContent={<IconPlayerPlay/>}
                >
                    Practice now!
                </Button>
                <Button startContent={<IconMeteor/>}>Quick lesson</Button>
            </nav>
            <nav>
                <ModalButton
                    modal={<EditPracticeModal details={{ id, title, description }} activities={activities}
                                              topicId={topic.id}/>}
                    modalProps={{ size: "full" }}
                    startContent={<IconEdit/>}
                >Edit</ModalButton>
            </nav>
        </CardFooter>
    </Card>;
}