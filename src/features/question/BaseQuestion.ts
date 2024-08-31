import { ChoiceQuestion } from "@/features/question/questions/ChoiceQuestion";
import { FillTheGapQuestion } from "@/features/question/questions/FillTheGapQuestion";

export interface BaseQuestion {
    title: string;
    details?: string;
}

export type Question = ChoiceQuestion | FillTheGapQuestion;
