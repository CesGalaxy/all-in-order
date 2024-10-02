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
        // If the question is single choice, the answer is correct if it matches at least one of the correct choices
        return Object.keys(choices).length === 0
            || Object
                .entries(choices)
                .some(([choice, correct]) => !correct && answer.selectedChoices.includes(choice))
    } else {
        // If the question is multiple choice, the answer is correct if it matches all the correct choices
        return Object
            .entries(choices)
            .every(([choice, correct]) => correct === answer.selectedChoices.includes(choice))
    }
}
