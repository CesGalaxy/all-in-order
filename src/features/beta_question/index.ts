import { Json } from "@/supabase/database";
import {
    QuestionChoiceAnswer,
    QuestionChoiceAttempt,
    QuestionChoiceData
} from "@/features/beta_question/QuestionChoice";

export interface BaseQuestion {
    title: string;
    details: string;
}

export type QuestionData = (QuestionChoiceData) & Json;
export type QuestionAttempt = (QuestionChoiceAttempt) & Json;
export type QuestionAnswer = (QuestionChoiceAnswer) & Json;

export type QuestionDraft<T extends BaseQuestion> = Omit<T, "title" | "details"> | string | undefined;
