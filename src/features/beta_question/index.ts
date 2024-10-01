import { Json } from "@/supabase/database";
import {
    choiceQuestionInitialAnswerDraft,
    generateChoiceQuestionAttempt,
    QuestionChoiceAnswer,
    QuestionChoiceAttempt,
    QuestionChoiceData
} from "@/features/beta_question/QuestionChoice";
import {
    fillTheGapQuestionInitialAnswerDraft,
    generateFillTheGapQuestionAttempt,
    QuestionFillTheGapAnswer,
    QuestionFillTheGapAttempt,
    QuestionFillTheGapData
} from "@/features/beta_question/QuestionFillTheGap";

export interface BaseQuestion<T extends Json> {
    title: string;
    details: string;
    type: T;
}

export type QuestionData = QuestionChoiceData | QuestionFillTheGapData;
export type QuestionAttempt = QuestionChoiceAttempt | QuestionFillTheGapAttempt;
export type QuestionAnswer = QuestionChoiceAnswer | QuestionFillTheGapAnswer;

export type QuestionDraft<T extends BaseQuestion<U> = BaseQuestion<any>, U extends Json = any> =
    Omit<T, "title" | "details" | "type">
    | string
    | undefined;

export const QUESTION_ATTEMPT_GENERATORS = {
    choice: generateChoiceQuestionAttempt,
    fill_the_gap: generateFillTheGapQuestionAttempt,
}

export function generateQuestionAttempt<T extends QuestionData>(data: T): QuestionAttempt {
    return QUESTION_ATTEMPT_GENERATORS[data.type](data as any);
}

export const QUESTION_INITIAL_ANSWER_DRAFTS = {
    choice: choiceQuestionInitialAnswerDraft,
    fill_the_gap: fillTheGapQuestionInitialAnswerDraft,
}
