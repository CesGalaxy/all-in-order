import type { Json } from "@aio/db/supabase";
import type { Dispatch, FC, SetStateAction } from "react";
import { IconLine, IconListCheck, IconMist } from "@tabler/icons-react";
import {
    generateChoiceQuestionAttempt,
    QuestionChoiceAnswer,
    QuestionChoiceAttempt,
    QuestionChoiceData,
    validateChoiceQuestion
} from "@/modules/learn/question/Choice";
import {
    generateFillTheGapQuestionAttempt,
    QuestionFillTheGapAnswer,
    QuestionFillTheGapAttempt,
    QuestionFillTheGapData,
    validateFillTheGapQuestion
} from "@/modules/learn/question/FillTheGap";
import PreviewChoiceQuestion from "@/modules/learn/question/Choice/_preview";
import CreateChoiceQuestion from "@/modules/learn/question/Choice/_question";
import ChoiceQuestionSolution from "@/modules/learn/question/Choice/_solution";
import PreviewFillTheGapQuestion from "@/modules/learn/question/FillTheGap/_preview";
import CreateFillTheGapQuestion from "@/modules/learn/question/FillTheGap/_question";
import FillTheGapQuestionSolution from "@/modules/learn/question/FillTheGap/_solution";
import {
    generateRelationQuestionAttempt,
    QuestionRelationAnswer,
    QuestionRelationAttempt,
    QuestionRelationData,
    validateRelationQuestion
} from "@/modules/learn/question/Relation";
import CreateRelationQuestion from "@/modules/learn/question/Relation/_question";
import PreviewRelationQuestion from "@/modules/learn/question/Relation/_preview";
import RelationQuestionSolution from "@/modules/learn/question/Relation/_solution";

export type Question<T extends QuestionType = any> = {
    title: string;
    details?: string;
    type: T;
} & QuestionData[T];

export type QuestionType = 'choice' | 'fill_the_gap' | 'relation';

type QuestionRecord<T = any> = Record<QuestionType, T>;

export interface QuestionData extends QuestionRecord<Json> {
    'choice': QuestionChoiceData;
    'fill_the_gap': QuestionFillTheGapData;
    'relation': QuestionRelationData;
}

export interface QuestionAttempt extends QuestionRecord {
    'choice': QuestionChoiceAttempt;
    'fill_the_gap': QuestionFillTheGapAttempt;
    'relation': QuestionRelationAttempt;
}

export interface QuestionAnswer extends QuestionRecord<Json> {
    'choice': QuestionChoiceAnswer;
    'fill_the_gap': QuestionFillTheGapAnswer;
    'relation': QuestionRelationAnswer;
}

export type QuestionAttemptGenerator<T extends QuestionType> = (data: QuestionData[T]) => QuestionAttempt[T];
export type QuestionAnswerValidator<T extends QuestionType> = (data: QuestionData[T], answer: QuestionAnswer[T]) => boolean;


// Drafts
export type QuestionDraft<T extends QuestionType> = QuestionData[T] | string | undefined;
export type SetQuestionDraft<T extends QuestionType> = Dispatch<SetStateAction<QuestionDraft<T>>>;

export interface QuestionCreatorProps<T extends QuestionType> {
    draft?: QuestionDraft<T>;
    setDraft: SetQuestionDraft<T>;
    initialData?: QuestionData[T];
}

export const QUESTION_ATTEMPT_GENERATORS: { [T in QuestionType]: QuestionAttemptGenerator<T> } = {
    choice: generateChoiceQuestionAttempt,
    fill_the_gap: generateFillTheGapQuestionAttempt,
    relation: generateRelationQuestionAttempt,
} satisfies QuestionRecord;

export const QUESTION_ANSWER_VALIDATORS: { [T in QuestionType]: QuestionAnswerValidator<T> } = {
    choice: validateChoiceQuestion,
    fill_the_gap: validateFillTheGapQuestion,
    relation: validateRelationQuestion,
} satisfies QuestionRecord;

export const QUESTION_CREATORS: { [T in QuestionType]: FC<QuestionCreatorProps<T>> } = {
    'choice': CreateChoiceQuestion,
    'fill_the_gap': CreateFillTheGapQuestion,
    'relation': CreateRelationQuestion,
} satisfies QuestionRecord;

export const QUESTION_ICONS = {
    choice: IconListCheck,
    fill_the_gap: IconMist,
    relation: IconLine,
} satisfies QuestionRecord;

// TODO: Use data instead of attempt
export const QUESTION_PREVIEWS: { [T in QuestionType]: FC<{ attempt: QuestionAttempt[T] }> } = {
    choice: PreviewChoiceQuestion,
    fill_the_gap: PreviewFillTheGapQuestion,
    relation: PreviewRelationQuestion,
} satisfies QuestionRecord;

export const QUESTION_SOLUTIONS = {
    choice: ChoiceQuestionSolution,
    fill_the_gap: FillTheGapQuestionSolution,
    relation: RelationQuestionSolution,
} satisfies QuestionRecord;