"use client";

import { QuestionRelationAnswer, QuestionRelationAttempt } from "@/modules/learn/question/Relation";
import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@heroui/button";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

interface Props {
    attempt: QuestionRelationAttempt,
    draft?: QuestionRelationAnswer,
    setAnswer: (answer?: QuestionRelationAnswer) => void
}

function ExaminateRelationQuestion({ attempt, draft, setAnswer }: Props) {
    const { terms, definitions } = attempt;

    const [answers, setAnswers] = useState<string[]>(Array(terms.length).fill(undefined));
    const [i, setI] = useState<number>(0);

    const valid = answers.length === terms.length && answers.every(Boolean);

    useEffect(() => {
        if (valid) setAnswer({ pairs: Object.fromEntries(terms.map((term, i) => [term, answers[i]])) });
    }, [answers, setAnswer, terms, valid]);

    useEffect(() => {
        if (!valid && draft) setAnswer(undefined);
    }, [draft, setAnswer, valid]);

    return <div className="space-y-4">
        <header className="font-medium text-lg text-center sticky top-0 bg-background z-10 py-4">{terms[i]}</header>
        <ul className="space-y-4">
            {definitions.map((definition, index) => <li key={index} className="w-full">
                <Button
                    className="w-full"
                    onPress={() => {
                        const newAnswers = [...answers];
                        newAnswers[i] = definition;
                        setAnswers(newAnswers);
                        setAnswer({ pairs: Object.fromEntries(terms.map((term, i) => [term, newAnswers[i]])) });
                    }}
                    color={answers[i] === definition ? "primary" : "default"}
                >
                    {definition}
                </Button>
            </li>)}
        </ul>
        <ButtonGroup className="max-w-96 w-full justify-center sticky bottom-0 bg-background py-4">
            <Button onPress={() => setI(i - 1)} isDisabled={i === 0}><IconArrowLeft/></Button>
            <Button onPress={() => setI(i + 1)} isDisabled={i === terms.length - 1}><IconArrowRight/></Button>
        </ButtonGroup>
    </div>;
}

export default ExaminateRelationQuestion;
