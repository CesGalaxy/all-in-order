"use client";

import TopicTestQuestion from "@/lib/supabase/models/TopicTestQuestion";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { ChoiceQuestionAnswerTooltip } from "@/features/question/questions/ChoiceQuestion";

export default function QuestionSimpleCard({ question }: { question: TopicTestQuestion }) {
    return <Card>
        <CardHeader className="flex-col gap-2">
            <h3 className="text-xl text-foreground">{question.data.title}</h3>
            <small className="text-focus">{question.data.type.toUpperCase()}</small>
        </CardHeader>
        <CardFooter>
            <ButtonGroup className="w-full">
                <Popover backdrop="blur">
                    <PopoverTrigger>
                        <Button color="primary" startContent={<IconEye />} className="w-full">
                            View answer
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <ChoiceQuestionAnswerTooltip question={question.data}/>
                    </PopoverContent>
                </Popover>
                <Button isIconOnly>
                    <IconPencil />
                </Button>
                <Button color="danger" isIconOnly>
                    <IconTrash />
                </Button>
            </ButtonGroup>
        </CardFooter>
    </Card>;
}