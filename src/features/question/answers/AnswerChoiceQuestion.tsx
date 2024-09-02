"use client";

import { ChoiceQuestion, ChoiceQuestionAnswer } from "@/features/question/questions/ChoiceQuestion";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@nextui-org/button";
import { useQuestionAnswerContext } from "@/features/question/QuestionAnswerContext";

export default function AnswerChoiceQuestion({ question, randomSeed }: { question: ChoiceQuestion, randomSeed: number }) {
    const isMultipleChoice = question.correct_choices.length > 1;

    const {setAnswer, answer} = useQuestionAnswerContext<ChoiceQuestionAnswer>();

    // Shuffle the choices
    const choices = useMemo(() => [
            ...question.correct_choices.map(choice => ({ choice, correct: true })),
            ...question.wrong_choices.map(choice => ({ choice, correct: false }))
        ]
            .map(value => {
                const x = Math.sin(randomSeed++) * Math.floor(randomSeed * 1000);
                return { value, sort: x - Math.floor(x) };
            })
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
            .reverse(),
        [question.correct_choices, question.wrong_choices, randomSeed]);

    const [selectedChoices, setSelectedChoices] = useState<string[]>(answer?.selected_choices || []);

    const selectChoice = (choice: string) => {
        // If already selected, remove it
        if (selectedChoices.includes(choice)) {
            setSelectedChoices(selectedChoices.filter(c => c !== choice));
        } else if (isMultipleChoice) {
            setSelectedChoices(selectedChoices => selectedChoices.includes(choice)
                ? selectedChoices.filter(c => c !== choice)
                : [...selectedChoices, choice]);
        } else {
            setSelectedChoices([choice]);
        }
    }

    useEffect(() => {
        if (selectedChoices.length > 0) {
            if (selectedChoices.join() !== answer?.selected_choices.join()) setAnswer({ selected_choices: selectedChoices });
        } else {
            if (answer !== null) setAnswer(null);
        }
    }, [answer, choices.length, selectedChoices, setAnswer]);

    return <div className="w-full h-full flex flex-col gap-4 p-2">
        <h1 className="text-center w-full text-xl text-default-500">
            {isMultipleChoice ? "Select all that apply" : "Select one"}
        </h1>
        <ul className="flex-grow  h-full flex items-center justify-center gap-8 flex-wrap">
            {choices.map(({ choice }, i) => <li key={i}>
                <Button
                    onClick={() => selectChoice(choice)}
                    size="lg"
                    color={selectedChoices.includes(choice) ? "primary" : "default"}
                >
                    {choice}
                </Button>
            </li>)}
        </ul>
    </div>
}