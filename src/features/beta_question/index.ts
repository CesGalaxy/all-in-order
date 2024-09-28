import { Json } from "@/supabase/database";
import {
    QuestionChoiceAnswer,
    QuestionChoiceAttempt,
    QuestionChoiceData
} from "@/features/beta_question/QuestionChoice";
import {
    QuestionFillTheGapAnswer,
    QuestionFillTheGapAttempt,
    QuestionFillTheGapData
} from "@/features/beta_question/QuestionFillTheGap";

export interface BaseQuestion<T extends Json> {
    title: string;
    details: string;
    type: T;
}

export type QuestionData = (QuestionChoiceData | QuestionFillTheGapData) & Json;
export type QuestionAttempt = (QuestionChoiceAttempt | QuestionFillTheGapAttempt) & Json;
export type QuestionAnswer = (QuestionChoiceAnswer | QuestionFillTheGapAnswer) & Json;

export type QuestionDraft<T extends BaseQuestion<U> = BaseQuestion<any>, U extends Json = any> =
    Omit<T, "title" | "details" | "type">
    | string
    | undefined;
