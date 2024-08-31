import { BaseQuestion } from "@/features/question/BaseQuestion";

export interface ChoiceQuestion extends BaseQuestion {
    type: "choice";
    list_type: "none" | "alphabet" | "number" | "roman";
    correct_choices: string[];
    wrong_choices: string[];
}

export function ChoiceQuestionAnswerTooltip({ question }: { question: ChoiceQuestion }) {
    return <ul>
        <li className="mb-4">
            <p className="text-success text-lg">Correct choices</p>
            <ul className="list-disc ml-6">
                {(question.correct_choices as string[]).map(choice => <li key={choice}>
                    {choice}
                </li>)}
            </ul>
        </li>
        <li>
            <p className="text-danger text-lg">Wrong choices</p>
            <ul className="list-disc ml-6">
                {question.wrong_choices.map(choice => <li key={choice}>
                    {choice}
                </li>)}
            </ul>
        </li>
    </ul>;
}
