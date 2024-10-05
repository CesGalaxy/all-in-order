import { Json } from "@/supabase/database";
import {
    generateChoiceQuestionAttempt,
    QuestionChoiceAnswer,
    QuestionChoiceAttempt,
    QuestionChoiceData,
    validateChoiceQuestion
} from "@/features/beta_question/QuestionChoice";
import {
    generateFillTheGapQuestionAttempt,
    QuestionFillTheGapAnswer,
    QuestionFillTheGapAttempt,
    QuestionFillTheGapData,
    validateFillTheGapQuestion
} from "@/features/beta_question/QuestionFillTheGap";
import {
    generateTrueOrFalseQuestionAttempt,
    QuestionTrueOrFalseAnswer,
    QuestionTrueOrFalseAttempt,
    QuestionTrueOrFalseData,
    validateTrueOrFalseQuestion
} from "@/features/beta_question/QuestionTrueOrFalse";

export interface BaseQuestion<T extends Json> {
    title: string;
    details: string;
    type: T;
}

export type QuestionData = QuestionChoiceData | QuestionFillTheGapData | QuestionTrueOrFalseData;
export type QuestionAttempt = QuestionChoiceAttempt | QuestionFillTheGapAttempt | QuestionTrueOrFalseAttempt;
export type QuestionAnswer = QuestionChoiceAnswer | QuestionFillTheGapAnswer | QuestionTrueOrFalseAnswer;

export type QuestionDraft<T extends BaseQuestion<U> = BaseQuestion<any>, U extends Json = any> =
    Omit<T, "title" | "details" | "type">
    | string
    | undefined;

export const QUESTION_ATTEMPT_GENERATORS = {
    choice: generateChoiceQuestionAttempt,
    fill_the_gap: generateFillTheGapQuestionAttempt,
    true_or_false: generateTrueOrFalseQuestionAttempt,
}

export function generateQuestionAttempt<T extends QuestionData>(data: T): QuestionAttempt {
    return QUESTION_ATTEMPT_GENERATORS[data.type](data as any);
}

export const QUESTION_VALIDATORS = {
    choice: validateChoiceQuestion,
    fill_the_gap: validateFillTheGapQuestion,
    true_or_false: validateTrueOrFalseQuestion,
}

export function validateQuestion(data: QuestionData, answer: QuestionAnswer): boolean {
    return QUESTION_VALIDATORS[data.type](data as any, answer as any);
}
