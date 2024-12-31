"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { IconEye } from "@tabler/icons-react";
import QuestionSolution from "@/features/beta_question/QuestionSolution";
import { QuestionData } from "@aio/db/features/questions";

export default function QuestionSolutionButton({ data }: { data: QuestionData }) {
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
                <QuestionSolution data={data}/>
            </div>
        </PopoverContent>
    </Popover>;
}