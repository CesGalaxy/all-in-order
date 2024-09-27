import { BaseQuestion } from "@/features/beta_question/index";

export type ChoicesInputMethod = 'checklist' | 'slots';

export interface QuestionChoiceData extends BaseQuestion {
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