"use client";

import {
    QuestionChoiceAnswer,
    QuestionChoiceAttempt,
    QuestionChoiceData
} from "@/features/beta_question/QuestionChoice";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Checkbox } from "@nextui-org/checkbox";

export default function ChoiceQuestionCorrection({
                                                     data,
                                                     attempt: { choices, single },
                                                     answer,
                                                     correct
                                                 }: {
    data: QuestionChoiceData,
    attempt: QuestionChoiceAttempt,
    answer: QuestionChoiceAnswer,
    correct: boolean
}) {
    return <div>
        <Single correction={data.choices} orderedChoices={choices} answer={answer.selectedChoices}/>
    </div>;
}

function Single({ correction, orderedChoices, answer }: {
    correction: Record<string, boolean>,
    orderedChoices: string[],
    answer: string[]
}) {
    return <Accordion>
        {orderedChoices.map((choice, index) => <AccordionItem
            key={index}
            title={choice}
            indicator={({ isOpen, indicator }) => correction[choice]
                ? isOpen ? indicator : <IconCheck/>
                : <IconX/>
            }
            classNames={{ title: correction[choice] != answer.includes(choice) && "text-danger-500" }}
            startContent={<Checkbox isReadOnly isSelected={answer.includes(choice)}/>}
        >
            {correction[choice]
                ? <span className="text-green-500"> - Correct</span>
                : <span className="text-red-500"> - Incorrect</span>}
        </AccordionItem>)}
    </Accordion>
}