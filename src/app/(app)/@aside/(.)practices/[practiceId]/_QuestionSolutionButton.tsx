"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { IconEye } from "@tabler/icons-react";
import { Question, QUESTION_SOLUTIONS, QuestionType } from "@/modules/learn/question";

export default function QuestionSolutionButton<T extends QuestionType>({ data }: { data: Question<T> }) {
    const QuestionSolution = QUESTION_SOLUTIONS[data.type];
    return <Popover backdrop="blur" placement="bottom-end">
        <Tooltip content="Preview answer">
            <div>
                <PopoverTrigger>
                    <Button isIconOnly variant="flat" className="!rounded-r-none">
                        <IconEye/>
                    </Button>
                </PopoverTrigger>
            </div>
        </Tooltip>
        <PopoverContent>
            <div className="px-1 py-2">
                <div className="text-small font-bold mb-2">Solution:</div>
                {/* @ts-ignore */}
                <QuestionSolution question={data}/>
            </div>
        </PopoverContent>
    </Popover>;
}