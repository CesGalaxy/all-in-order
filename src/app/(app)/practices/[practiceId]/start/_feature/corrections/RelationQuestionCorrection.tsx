"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Checkbox } from "@heroui/checkbox";
import {
    QuestionRelationAnswer,
    QuestionRelationAttempt,
    QuestionRelationData
} from "@/modules/learn/question/Relation";

export default function RelationQuestionCorrection({
                                                       data,
                                                       attempt: { terms },
                                                       answer,
                                                   }: {
    data: QuestionRelationData,
    attempt: QuestionRelationAttempt,
    answer: QuestionRelationAnswer,
    correct: boolean
}) {
    const areAllCorrect = Object.keys(data.pairs).every(key => data.pairs[key] === answer.pairs[key]);

    return <div>
        <Accordion
            selectionMode="multiple"
            defaultExpandedKeys={terms.filter(term => data.pairs[term] !== answer.pairs[term])}
        >
            {terms.map((term, index) => <AccordionItem
                key={term}
                title={term}
                startContent={<Checkbox isSelected={data.pairs[term] === answer.pairs[term]} disabled/>}
            >
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg">Your answer</h3>
                        <p>{answer.pairs[term]}</p>
                    </div>
                    <div>
                        <h3 className="text-lg">Correct answer</h3>
                        <p>{data.pairs[term]}</p>
                    </div>
                </div>
            </AccordionItem>)}
        </Accordion>
        <div className="flex justify-center my-4">
            {areAllCorrect
                ? <IconCheck className="text-green-500" size={32}/>
                : <IconX className="text-red-500" size={32}/>}
        </div>
    </div>;
}
