"use server";

import getSupabase from "@/supabase/server";
import AsideModalContainer from "@/components/containers/AsideModal";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import NoPracticeActivities from "@/collections/practiceActivity/NoPracticeActivities";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { PracticeActivityEntity } from "@/supabase/entities";
import QuestionIcon from "@/features/beta_question/QuestionIcon";
import { Tooltip } from "@nextui-org/tooltip";
import { Divider } from "@nextui-org/divider";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { generateQuestionAttempt } from "@/features/beta_question";
import PreviewQuestion from "@/features/beta_question/PreviewQuestion";
import QuestionSolutionButton from "@/app/topics/[topicId]/@aside/(...)practices/[practiceId]/_QuestionSolutionButton";
import CreatePracticeActivityButton from "@/collections/practiceActivity/CreatePracticeActivityButton";
import CreatePracticeActivityModal from "@/collections/practiceActivity/CreatePracticeActivityModal";
import createPracticeActivity from "@/collections/practiceActivity/actions";

export default async function Page({ params: { topicId, practiceId } }: {
    params: { topicId: string, practiceId: string }
}) {
    const { data, error } = await getSupabase()
        .from("practices")
        .select("id, title, topic_id, activities:topic_activities(*)")
        .eq("id", parseInt(practiceId))
        .maybeSingle();

    const topicPath = "/topics/" + topicId;

    if (error) return <AsideModalContainer closeUrl={topicPath}>
        <ErrorView message={error.message}/>
    </AsideModalContainer>;

    const { activities, id, title, topic_id } = required(data, topicPath);

    return <AsideModalContainer title={title} className="md:w-1/2 md:min-w-96">
        {activities.length === 0
            ? <NoPracticeActivities practiceId={id} topicId={topic_id}/>
            : <div className="p-4">
                <nav>
                    <CreatePracticeActivityButton>
                        <CreatePracticeActivityModal action={createPracticeActivity.bind(null, topic_id, id)}/>
                    </CreatePracticeActivityButton>
                </nav>
                <br/>
                <ul className="flex flex-col items-stretch gap-4">
                    {(activities as PracticeActivityEntity[]).map(({ id, data }) => <Card as="li" key={id}>
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
                                    <Button isIconOnly variant="flat">
                                        <IconEdit/>
                                    </Button>
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
                            <PreviewQuestion type={data.type} attempt={generateQuestionAttempt(data)}/>
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
            </div>}
    </AsideModalContainer>;
}