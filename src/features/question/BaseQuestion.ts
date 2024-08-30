import { ChoiceQuestion } from "@/features/question/questions/ChoiceQuestion";

export interface BaseQuestion {
    title: string;
    details?: string[];
}

export type Question = ChoiceQuestion // | FillTheGapQuestion;
