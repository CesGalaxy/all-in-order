import type { ChoiceQuestion, ChoiceQuestionAnswer } from "@/features/question/questions/ChoiceQuestion";
import type { FillTheGapQuestion, FillTheGapQuestionAnswer } from "@/features/question/questions/FillTheGapQuestion";
import { Json } from "@/supabase/database";
import { RelationQuestion, RelationQuestionAnswer } from "@/features/question/questions/RelationQuestion";

export interface BaseQuestion {
    title: string;
    details?: string;
}

export type Question = (ChoiceQuestion | FillTheGapQuestion | RelationQuestion) & Json;
export type Answer = (ChoiceQuestionAnswer | FillTheGapQuestionAnswer | RelationQuestionAnswer) & Json;
