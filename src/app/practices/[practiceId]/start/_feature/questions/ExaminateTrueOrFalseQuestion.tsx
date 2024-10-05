"use client";

import { QuestionTrueOrFalseAnswer, QuestionTrueOrFalseAttempt } from "@/features/beta_question/QuestionTrueOrFalse";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";

interface Props {
    attempt: QuestionTrueOrFalseAttempt,
    draft?: QuestionTrueOrFalseAnswer,
    setAnswer: (answer?: QuestionTrueOrFalseAnswer) => void
}

function ExaminateTrueOrFalseQuestion({ attempt: { rows }, draft, setAnswer }: Props) {
    return <div>
        <header className="text-xl">
            Check the correct statements
        </header>
        <Divider className="my-4"/>
        <ul className="flex flex-col items-stretch gap-4 p-4">
            {rows.map((row, index) => <li key={index} className="w-full">
                <Button
                    className="w-full justify-start"
                    onPress={() => draft?.selectedRows.includes(row)
                        ? draft.selectedRows.length === 1
                            ? setAnswer()
                            : setAnswer({ selectedRows: draft.selectedRows.filter(r => r !== row) })
                        : setAnswer({ selectedRows: [...(draft?.selectedRows || []), row] })
                    }
                    color={draft?.selectedRows.includes(row) ? "primary" : "default"}
                >
                    {row}
                </Button>
            </li>)}
        </ul>
    </div>;
}

export default ExaminateTrueOrFalseQuestion;
