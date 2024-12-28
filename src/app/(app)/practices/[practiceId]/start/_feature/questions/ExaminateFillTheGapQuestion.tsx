"use client";

import { GapAttempt, QuestionFillTheGapAnswer, QuestionFillTheGapAttempt } from "@aio/db/features/questions/FillTheGap";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

function ExaminateFillTheGapQuestion({ attempt: { segments }, draft, setAnswer }: {
    attempt: QuestionFillTheGapAttempt,
    draft?: QuestionFillTheGapAnswer,
    setAnswer: (answer?: QuestionFillTheGapAnswer) => void
}) {
    const [answers, setAnswers] = useState<(string)[]>(
        segments
            .filter((segment): segment is GapAttempt => typeof segment !== "string")
            .map(() => "")
    );

    const getGapIndex = useCallback((segmentIndex: number) => {
        let gapIndex = 0;
        for (let i = 0; i < segmentIndex; i++) if (typeof segments[i] !== "string") gapIndex++;
        return gapIndex;
    }, [segments]);

    const areAllFieldsFilled = useMemo(() => answers.every(Boolean), [answers]);

    useEffect(() => {
        if (areAllFieldsFilled) setAnswer({ answers });
    }, [areAllFieldsFilled, answers, setAnswer]);

    useEffect(() => {
        if (!areAllFieldsFilled && draft) setAnswer();
    }, [areAllFieldsFilled, draft, setAnswer])

    return <ul className="flex items-center md:flex-row flex-wrap gap-x-1 gap-y-2">
        {segments.map((segment, index) => typeof segment === "string"
            ? <span key={index}>{segment}</span>
            : segment.type === "text"
                ? <Input
                    key={index}
                    className="w-32 lg:w-64 xl:w-96"
                    placeholder={segment.hint}
                    value={answers[getGapIndex(index)]}
                    onValueChange={value =>
                        setAnswers(answers.map((v, i) => i === getGapIndex(index) ? value : v))}
                />
                : <Select
                    key={index}
                    className="w-32 lg:w-64 xl:w-96"
                    placeholder={segment.hint}
                    aria-label={segment.hint || "Fill the gap"}
                    selectedKeys={[...(answers[getGapIndex(index)] ? [answers[getGapIndex(index)]] : [])]}
                    onSelectionChange={value =>
                        setAnswers(answers.map((v, i) =>
                            i === getGapIndex(index)
                                ? value.currentKey
                                    ? value.currentKey
                                    : v
                                : v
                        ))}
                >
                    {segment.answers.map((answer, index) =>
                        <SelectItem key={answer}>{answer}</SelectItem>)}
                </Select>
        )}
    </ul>
}

export default ExaminateFillTheGapQuestion;