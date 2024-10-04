import { BaseQuestion } from "@/features/beta_question/index";

export type ChoicesInputMethod = 'checklist' | 'slots';

export interface QuestionChoiceData extends BaseQuestion<"choice"> {
    choices: Record<string, boolean>,
    method: ChoicesInputMethod,
    single: boolean,
}

export interface QuestionChoiceAttempt {
    choices: string[],
    correctChoices: number,
    single: boolean,
    method: ChoicesInputMethod,
}

export interface QuestionChoiceAnswer {
    selectedChoices: string[],
}

export function generateChoiceQuestionAttempt(data: QuestionChoiceData): QuestionChoiceAttempt {
    const shuffledChoices = Object.keys(data.choices).sort(() => Math.random() - 0.5);
    return {
        choices: shuffledChoices,
        correctChoices: Object.values(data.choices).filter(Boolean).length,
        single: data.single,
        method: data.method,
    }
}

export function validateChoiceQuestion({ choices, single }: QuestionChoiceData, answer: QuestionChoiceAnswer): boolean {
    if (single) {
        const multipleChoices = Object.values(choices).filter(Boolean).length > 1;

        return multipleChoices
            // At least one correct choice is selected
            ? Object
                .entries(choices)
                .some(([choice, correct]) => correct && answer.selectedChoices.includes(choice))
            // And no incorrect choices are selected
            && !Object
                .entries(choices)
                .some(([choice, correct]) => !correct && answer.selectedChoices.includes(choice))
            // And all correct choices (1) are selected
            : Object
                .entries(choices)
                .every(([choice, correct]) => correct == answer.selectedChoices.includes(choice))
    } else {
        // All correct choices are selected
        return Object
            .entries(choices)
            .every(([choice, correct]) => correct === answer.selectedChoices.includes(choice))
    }
}
