import { ChoiceQuestion, ChoiceQuestionAnswer } from "@/features/question/questions/ChoiceQuestion";
import { FillTheGapQuestion, FillTheGapQuestionAnswer } from "@/features/question/questions/FillTheGapQuestion";

export interface BaseQuestion {
    title: string;
    details?: string;
}

export type Question = ChoiceQuestion | FillTheGapQuestion;
export type Answer = ChoiceQuestionAnswer | FillTheGapQuestionAnswer;
