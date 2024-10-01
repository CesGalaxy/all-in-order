"use client";

import { QuestionChoiceAnswer, QuestionChoiceAttempt } from "@/features/beta_question/QuestionChoice";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";

interface Props {
    attempt: QuestionChoiceAttempt,
    draft?: QuestionChoiceAnswer,
    setAnswer: (answer: QuestionChoiceAnswer) => void
}

function ExaminateChoiceQuestion({ attempt, draft, setAnswer }: Props) {
    const { choices, correctChoices, single } = attempt;

    const isMultiple = correctChoices > 1;

    return <div>
        <header className="text-xl">
            {isMultiple
                ? single
                    ? "Select at least 1 of the " + correctChoices + " correct answers"
                    : "Select the " + correctChoices + " correct answers"
                : "Choose the correct answer"}
        </header>
        <Divider className="my-4"/>
        <ul className="flex flex-col items-stretch gap-4 p-4">
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
                    ? setAnswer({ selectedChoices: [] })
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
                    ? setAnswer({ selectedChoices: draft.selectedChoices.filter(c => c !== choice) })
                    : setAnswer({ selectedChoices: [...(draft?.selectedChoices || []), choice] })}
                color={draft?.selectedChoices.includes(choice) ? "primary" : "default"}
            >
                {choice}
            </Button>
        </li>
    );
}

export default ExaminateChoiceQuestion;
