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
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { generateQuestionAttempt } from "@/features/beta_question";
import PreviewQuestion from "@/features/beta_question/PreviewQuestion";

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

    return <AsideModalContainer title={title} className="sm:w-1/2">
        {activities.length === 0
            ? <NoPracticeActivities practiceId={id} topicId={topic_id}/>
            : <div className="p-4">
                <ul className="">
                    {(activities as PracticeActivityEntity[]).map(({ id, data }) => <Card
                        as="li"
                        key={id}
                    >
                        <CardHeader className="items-start gap-4">
                            <div className="w-full flex-grow">
                                <div className="flex items-center gap-2">
                                    <Tooltip content={data.type.replaceAll('_', ' ').toUpperCase()}>
                                        <QuestionIcon type={data.type}/>
                                    </Tooltip>
                                    <h1 className="text-xl font-medium">{title}</h1>
                                </div>
                                {data.details && <p className="text-sm text-gray-500">{data.details}</p>}
                            </div>
                            <ButtonGroup>
                                <Tooltip content="Preview answer">
                                    <Button isIconOnly variant="flat">
                                        <IconEye/>
                                    </Button>
                                </Tooltip>
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