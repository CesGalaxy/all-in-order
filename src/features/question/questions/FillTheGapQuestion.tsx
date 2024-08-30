import { BaseQuestion } from "@/features/question/BaseQuestion";

export interface FillTheGapQuestion extends BaseQuestion {
    type: "fill_the_gap";
    text: (string | FillTheGapQuestionGap)[];
}

export type FillTheGapQuestionGap = {
    hint?: string;
} & (
    { type: "text", answers: string[] }
    | { type: "choice", choices: [string, boolean][] }
    );