"use client";

import { FillTheGapQuestion, FillTheGapQuestionAnswer } from "@/features/question/questions/FillTheGapQuestion";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useEffect, useMemo, useState } from "react";
import { useQuestionAnswerContext } from "@/features/question/QuestionAnswerContext";

export default function AnswerFillTheGapQuestion({ question }: { question: FillTheGapQuestion }) {
    const { setAnswer, answer } = useQuestionAnswerContext<FillTheGapQuestionAnswer>();
    const gapsAmount = useMemo(() => question.segments.filter(segment => typeof segment !== "string").length, [question.segments]);

    const [gaps, setGaps] = useState<(string | undefined)[]>(answer?.answers || new Array(gapsAmount).fill(undefined));

    useEffect(() => {
        // If all answers are filled
        if (gaps.every(answer => answer !== undefined && answer !== "")) {
            // If there are any changes compared with the previous answer
            console.log(gaps.join() !== answer?.answers.join());
            if (gaps.join() !== answer?.answers.join()) setAnswer({ answers: gaps } as FillTheGapQuestionAnswer);
        } else {
            if (answer !== null) setAnswer(null);
        }
    }, [answer, answer?.answers, gaps, setAnswer]);

    const getGapIndexByAnswerIndex = (answerIndex: number) => {
        let gapIndex = 0;
        for (let i = 0; i < answerIndex; i++) {
            if (typeof question.segments[i] !== "string") gapIndex++;
        }
        return gapIndex;
    }

    return <ul className="w-full h-full flex items-center justify-center gap-4 flex-wrap p-16">
        {question.segments.map((segment, i) => typeof segment === "string"
            ? <li key={i} className="text-xl w-fit">{segment}</li>
            : segment.type === "text"
                ? <Input
                    key={i}
                    placeholder={segment.hint}
                    as="li"
                    className="flex items-center gap-1 w-fit"
                    aria-label="Answer"
                    value={gaps[getGapIndexByAnswerIndex(i)]}
                    onChange={e => {
                        const newAnswers = [...gaps];
                        newAnswers[getGapIndexByAnswerIndex(i)] = e.target.value;
                        setGaps(newAnswers);
                    }}
                />
                : <Select
                    key={i}
                    placeholder={segment.hint}
                    className="max-w-64"
                    aria-label="Answer"
                    selectedKeys={[gaps[getGapIndexByAnswerIndex(i)]?.toString() || ""]}
                    onChange={e => {
                        const newAnswers = [...gaps];
                        newAnswers[getGapIndexByAnswerIndex(i)] = e.target.value;
                        setGaps(newAnswers);
                    }}
                >
                    {segment.choices.map(([choice, _], j) =>
                        <SelectItem key={j.toString()} className="flex items-center gap-1">
                            {choice}
                        </SelectItem>
                    )}
                </Select>
        )}
    </ul>;
}