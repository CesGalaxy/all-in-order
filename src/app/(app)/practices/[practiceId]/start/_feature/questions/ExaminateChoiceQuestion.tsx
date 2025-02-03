"use client";

import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { QuestionChoiceAnswer, QuestionChoiceAttempt } from "@/modules/learn/question/Choice";

interface Props {
    attempt: QuestionChoiceAttempt,
    draft?: QuestionChoiceAnswer,
    setAnswer: (answer?: QuestionChoiceAnswer) => void
}

function ExaminateChoiceQuestion({ attempt, draft, setAnswer }: Props) {
    const { correctChoices, mustSelectAll } = attempt;

    const isMultiple = correctChoices > 1;

    return <div>
        <header className="text-xl">
            {isMultiple
                ? mustSelectAll
                    ? "Select at least 1 of the " + correctChoices + " correct answers"
                    : "Select the " + correctChoices + " correct answers"
                : "Choose the correct answer"}
        </header>
        <Divider className="my-4"/>
        <ul className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-4 p-4">
            {isMultiple
                ? <Multiple attempt={attempt} draft={draft} setAnswer={setAnswer}/>
                : <Single attempt={attempt} draft={draft} setAnswer={setAnswer}/>}
        </ul>
    </div>;
}

function Single({ attempt: { choices }, draft, setAnswer }: Props) {
    return choices.map((choice, index) => <li key={index} className="w-full">
            <Button
                className="w-full"
                onPress={() => draft?.selectedChoices.includes(choice)
                    ? setAnswer(undefined)
                    : setAnswer({ selectedChoices: [choice] })}
                color={draft?.selectedChoices.includes(choice) ? "primary" : "default"}
            >
                {choice}
            </Button>
        </li>
    );
}

function Multiple({ attempt: { choices }, draft, setAnswer }: Props) {
    return choices.map((choice, index) => <li key={index} className="w-full">
            <Button
                className="w-full"
                onPress={() => draft?.selectedChoices.includes(choice)
                    ? draft.selectedChoices.length > 1
                        ? setAnswer({ selectedChoices: draft.selectedChoices.filter(c => c !== choice) })
                        : setAnswer(undefined)
                    : setAnswer({ selectedChoices: [...(draft?.selectedChoices || []), choice] })}
                color={draft?.selectedChoices.includes(choice) ? "primary" : "default"}
            >
                {choice}
            </Button>
        </li>
    );
}

export default ExaminateChoiceQuestion;
