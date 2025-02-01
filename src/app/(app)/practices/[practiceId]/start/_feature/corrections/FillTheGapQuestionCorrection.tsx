"use client";

import {
    QuestionFillTheGapAnswer,
    QuestionFillTheGapAttempt,
    QuestionFillTheGapData
} from "@/modules/learn/question/FillTheGap";
import { useCallback } from "react";
import { Chip } from "@heroui/chip";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Divider } from "@heroui/divider";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function FillTheGapQuestionCorrection({
                                                         data,
                                                         attempt,
                                                         answer,
                                                         correct
                                                     }: {
    data: QuestionFillTheGapData,
    attempt: QuestionFillTheGapAttempt,
    answer: QuestionFillTheGapAnswer,
    correct: boolean
}) {
    const getGapIndex = useCallback((segmentIndex: number) => {
        let gapIndex = 0;
        for (let i = 0; i < segmentIndex; i++) if (typeof attempt.segments[i] !== "string") gapIndex++;
        return gapIndex;
    }, [attempt.segments]);

    return <ul className="flex items-center md:flex-row flex-wrap gap-x-1 gap-y-2">
        {attempt.segments.map((segment, index) => typeof segment === "string"
            ? <span key={index}>{segment}</span>
            : segment.type === "text"
                ? <Chip
                    size="sm"
                    key={index}
                    color={data.gaps[getGapIndex(index)].correctValues.includes(answer.answers[getGapIndex(index)])
                        ? "success"
                        : "danger"
                    }
                >
                    {answer.answers[getGapIndex(index)]}
                </Chip>
                : <Popover key={index}>
                    <PopoverTrigger>
                        <Chip
                            size="sm"
                            color={data.gaps[getGapIndex(index)].correctValues.includes(answer.answers[getGapIndex(index)])
                                ? "success"
                                : "danger"
                            }
                        >
                            {answer.answers[getGapIndex(index)]}
                        </Chip>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-96">
                        <span className="flex gap-2 items-center flex-wrap text-success">
                            <IconCheck/>
                            {data.gaps[getGapIndex(index)].correctValues.join(", ")}
                        </span>
                        <Divider/>
                        <span className="flex gap-2 items-center flex-wrap text-danger">
                            <IconX/>
                            {data.gaps[getGapIndex(index)].wrongValues?.join(", ")}
                        </span>
                    </PopoverContent>
                </Popover>
        )}
    </ul>
}