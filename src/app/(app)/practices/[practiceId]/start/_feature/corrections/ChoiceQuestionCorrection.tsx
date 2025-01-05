"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { IconCheck, IconChevronLeft, IconX } from "@tabler/icons-react";
import { Checkbox } from "@nextui-org/checkbox";
import { QuestionChoiceAnswer, QuestionChoiceAttempt, QuestionChoiceData } from "@/modules/learn/question/Choice";

export default function ChoiceQuestionCorrection({
                                                     data,
                                                     attempt: { choices, correctChoices, mustSelectAll },
                                                     answer,
                                                 }: {
    data: QuestionChoiceData,
    attempt: QuestionChoiceAttempt,
    answer: QuestionChoiceAnswer,
    correct: boolean
}) {
    return <div>
        {mustSelectAll
            ? correctChoices === 1
                ? <Single correction={data.choices} orderedChoices={choices} answer={answer.selectedChoices}/>
                : <MultipleOptional correction={data.choices} orderedChoices={choices} answer={answer.selectedChoices}/>
            : <Multiple correction={data.choices} orderedChoices={choices} answer={answer.selectedChoices}/>
        }
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
            indicator={({ isOpen }) => correction[choice]
                ? isOpen ? <IconChevronLeft/> : <IconCheck/>
                : <IconX/>
            }
            classNames={{ title: correction[choice] != answer.includes(choice) && "text-danger-500 font-medium" }}
            startContent={<Checkbox isReadOnly isSelected={answer.includes(choice)}/>}
        >
            {correction[choice]
                ? <span className="text-success">This was the correct answer</span>
                : <span className="text-danger">This wasn&apos;t the correct answer</span>}
        </AccordionItem>)}
    </Accordion>
}

function MultipleOptional({ correction, orderedChoices, answer }: {
    correction: Record<string, boolean>,
    orderedChoices: string[],
    answer: string[]
}) {
    return <Accordion>
        {orderedChoices.map((choice, index) => <AccordionItem
            key={index}
            title={choice}
            indicator={({ isOpen, indicator }) => correction[choice]
                ? isOpen ? <IconChevronLeft/> : <IconCheck/>
                : <IconX/>
            }
            classNames={{
                // TODO: Fix this shit
                title: answer.includes(choice)
                    ? correction[choice] ? "text-success font-medium" : "text-danger font-medium"
                    : correction[choice] && "text-primary font-medium"
            }}
            startContent={<Checkbox isReadOnly isSelected={answer.includes(choice)}/>}
        >
            {correction[choice]
                ? <span className="text-success">This was one of the correct answers</span>
                : <span className="text-danger">This wasn&apos;t a correct answer</span>}
        </AccordionItem>)}
    </Accordion>
}

function Multiple({ correction, orderedChoices, answer }: {
    correction: Record<string, boolean>,
    orderedChoices: string[],
    answer: string[]
}) {
    return <Accordion>
        {orderedChoices.map((choice, index) => <AccordionItem
            key={index}
            title={choice}
            indicator={({ isOpen, indicator }) => correction[choice]
                ? isOpen ? <IconChevronLeft/> : <IconCheck/>
                : <IconX/>
            }
            classNames={{
                // TODO: Fix this shit
                title: answer.includes(choice) == correction[choice]
                    ? "text-success font-medium"
                    : "text-danger font-medium"
            }}
            startContent={<Checkbox isReadOnly isSelected={answer.includes(choice)}/>}
        >
            {correction[choice]
                ? <span className="text-success">This was one of the correct answers</span>
                : <span className="text-danger">This wasn&apos;t a correct answer</span>}
        </AccordionItem>)}
    </Accordion>
}
