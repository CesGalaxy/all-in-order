"use server";

import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import NoPracticeActivities from "@/collections/practiceActivity/NoPracticeActivities";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { TopicActivity } from "@/lib/supabase/entities";
import { Tooltip } from "@heroui/tooltip";
import { Divider } from "@heroui/divider";
import { Button, ButtonGroup } from "@heroui/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import QuestionSolutionButton from "@/app/(app)/@aside/(.)practices/[practiceId]/_QuestionSolutionButton";
import CreatePracticeActivityButton from "@/collections/practiceActivity/CreatePracticeActivityButton";
import CreatePracticeActivityModal from "@/collections/practiceActivity/CreatePracticeActivityModal";
import createPracticeActivity, { updatePracticeActivity } from "@/collections/practiceActivity/actions";
import { getTopicAsidePractice } from "@/app/(app)/@aside/(.)practices/[practiceId]/query";
import ModalButton from "@/components/utils/ModalButton";
import EditPracticeActivityModal from "@/collections/practiceActivity/components/modals/EditPracticeActivityModal";
import {
    Question,
    QUESTION_ATTEMPT_GENERATORS,
    QUESTION_ICONS,
    QUESTION_PREVIEWS,
    QuestionType
} from "@/modules/learn/question";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ topicId: string, practiceId: string }> }) {
    const { topicId, practiceId } = await params;

    const { data, error } = await getTopicAsidePractice(practiceId);

    const topicPath = "/topics/" + topicId;

    if (error) return <ErrorView message={"" + error.message}/>;
    if (!data) notFound();

    const { activities, id, topic_id, attempts } = required(data, topicPath);

    const averageScore = attempts
            .map((attempt: any) => attempt.perfection)
            .reduce((a: any, b: any) => a + b, 0)
        / attempts.length;

    const QuestionIcon = ({ type, className }: { type: QuestionType, className?: string }) => {
        const Icon = QUESTION_ICONS[type];
        return <Icon className={className}/>;
    }

    const PreviewQuestion = <T extends QuestionType, >({ data }: { data: Question<T> }) => {
        const Preview = QUESTION_PREVIEWS[data.type];
        // @ts-ignore
        return <Preview attempt={QUESTION_ATTEMPT_GENERATORS[data.type](data)}/>;
    }

    return activities.length === 0
        ? <NoPracticeActivities practiceId={id} topicId={topic_id}/>
        : <div>
            <nav className="flex items-center justify-between gap-8">
                <CreatePracticeActivityButton>
                    <CreatePracticeActivityModal action={createPracticeActivity.bind(null, topic_id, id)}/>
                </CreatePracticeActivityButton>
                <span className="text-lg"><b>{attempts.length}</b> attempts with a <b>{averageScore}%</b> average score</span>
            </nav>
            <br/>
            <ul className="flex flex-col items-stretch gap-4">
                {(activities as TopicActivity[]).map(({ id, data, tags }: any) => <Card as="li" key={id}>
                    <CardHeader className="items-start gap-4">
                        <div className="w-full flex-grow">
                            <div className="flex items-center gap-2">
                                <Tooltip content={data.type.replaceAll('_', ' ').toUpperCase()}>
                                    <QuestionIcon type={data.type} className="hidden xl:block"/>
                                </Tooltip>
                                <h1 className="text-xl font-medium">{data.title}</h1>
                            </div>
                            {data.details && <p className="text-sm text-gray-500">{data.details}</p>}
                        </div>
                        <ButtonGroup>
                            <QuestionSolutionButton data={data}/>
                            <Tooltip content="Edit question">
                                <ModalButton
                                    modal={<EditPracticeActivityModal
                                        action={updatePracticeActivity.bind(null, topic_id, id)}
                                        initialData={data as any}
                                        initialTags={tags}
                                    />}
                                    isIconOnly
                                    variant="flat"
                                    modalProps={{ size: "xl" }}
                                >
                                    <IconEdit/>
                                </ModalButton>
                            </Tooltip>
                            <Tooltip content="Delete">
                                <Button isIconOnly variant="flat" color="danger">
                                    <IconTrash/>
                                </Button>
                            </Tooltip>
                        </ButtonGroup>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <PreviewQuestion data={data as any}/>
                    </CardBody>
                    <CardFooter
                        className="justify-evenly text-xs text-default-500 uppercase *:flex *items-center *:gap-2"
                    >
                        <p>
                            <span>Average score</span>
                            <b>100%</b>
                        </p>
                        <p>
                            <span>Attempts</span>
                            <b>12</b>
                        </p>
                    </CardFooter>
                </Card>)}
            </ul>
        </div>;
}