"use client";

import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { ChoiceQuestionAnswerTooltip } from "@/features/question/questions/ChoiceQuestion";
import { FillTheGapQuestionAnswerTooltip } from "@/features/question/questions/FillTheGapQuestion";
import { TopicTestQuestion } from "@/supabase/models";

const QUESTION_ANSWER_TOOLTIPS = {
    "choice": ChoiceQuestionAnswerTooltip,
    "fill_the_gap": FillTheGapQuestionAnswerTooltip
};

export default function QuestionSimpleCard({ question }: { question: TopicTestQuestion }) {
    const AnswerTooltip = QUESTION_ANSWER_TOOLTIPS[question.data.type];
    return <Card>
        <CardHeader className="flex-col gap-2">
            <h3 className="text-xl text-foreground">{question.data.title}</h3>
            <small className="text-focus">{question.data.type.toUpperCase().replaceAll("_", " ")}</small>
        </CardHeader>
        <CardFooter>
            <ButtonGroup className="w-full">
                <Popover backdrop="blur">
                    <PopoverTrigger>
                        <Button color="primary" startContent={<IconEye/>} className="w-full">
                            View answer
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <AnswerTooltip question={question.data as never}/>
                    </PopoverContent>
                </Popover>
                <Button isIconOnly>
                    <IconPencil/>
                </Button>
                <Button color="danger" isIconOnly>
                    <IconTrash/>
                </Button>
            </ButtonGroup>
        </CardFooter>
    </Card>;
}