import { BaseQuestion } from "@/features/beta_question/index";

export interface QuestionFillTheGapData extends BaseQuestion<"fill_the_gap"> {
    text: string;
    gaps: Gap[];
}

export interface Gap {
    position: number;
    type: "text" | "choice";
    hint?: string;
    correctValues: string[];
    wrongValues?: string[];
}

export interface QuestionFillTheGapAttempt {
    segments: AttemptSegment[];
}

export type AttemptSegment = string | GapAttempt;
export type GapAttempt = TextGapAttempt | ChoiceGapAttempt;

export interface BaseGapAttempt {
    hint: "text",
}

export interface TextGapAttempt extends BaseGapAttempt {
    type: "text"
}

export interface ChoiceGapAttempt extends BaseGapAttempt {
    type: "choice",
    choices: string[]
}

export interface QuestionFillTheGapAnswer {
    answers: string[];
}