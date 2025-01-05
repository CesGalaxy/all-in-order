import { z } from "zod";
import { QuestionAnswerValidator, QuestionAttemptGenerator } from "@/modules/learn/question";

export const QUESTION_CHOICE_INPUT_METHOD = z.enum(["checklist", "slots"]);

export const QUESTION_Choice_DATA = z.object({
    choices: z.record(z.boolean()),
    method: QUESTION_CHOICE_INPUT_METHOD,
    mustSelectAll: z.boolean(),
});

export type ChoicesInputMethod = z.infer<typeof QUESTION_CHOICE_INPUT_METHOD>;
export type QuestionChoiceData = z.infer<typeof QUESTION_Choice_DATA>;

export interface QuestionChoiceAttempt {
    choices: string[],
    correctChoices: number,
    mustSelectAll: boolean,
    method: ChoicesInputMethod,
}

export type QuestionChoiceAnswer = {
    selectedChoices: string[],
}

export const generateChoiceQuestionAttempt: QuestionAttemptGenerator<'choice'> =
    ({ choices, mustSelectAll, method }) => ({
        choices: Object.keys(choices).sort(() => Math.random() - 0.5),
        correctChoices: Object.values(choices).filter(Boolean).length,
        mustSelectAll,
        method,
    });

export const validateChoiceQuestion: QuestionAnswerValidator<'choice'> =
    ({ choices, mustSelectAll }, answer) => mustSelectAll
        // All correct choices are selected
        ? Object.entries(choices)
            .every(([choice, correct]) => correct === answer.selectedChoices.includes(choice))
        // At least one choice is selected
        : Object.values(choices).filter(Boolean).length > 1
            // At least one correct choice is selected, and no incorrect choices are selected
            ? Object.entries(choices)
                .some(([choice, correct]) => correct && answer.selectedChoices.includes(choice))
            && !Object.entries(choices)
                .some(([choice, correct]) => !correct && answer.selectedChoices.includes(choice))
            // And all correct choices (1) are selected
            : Object.entries(choices)
                .every(([choice, correct]) => correct == answer.selectedChoices.includes(choice));