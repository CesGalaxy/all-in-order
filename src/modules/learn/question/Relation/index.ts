import { z } from "zod";
import { QuestionAnswerValidator, QuestionAttemptGenerator } from "@/modules/learn/question";

const QUESTION_Relation_DATA = z.object({
    pairs: z.record(z.string(), z.string()),
})

export type QuestionRelationData = z.infer<typeof QUESTION_Relation_DATA>;

export type QuestionRelationAttempt = {
    terms: string[];
    definitions: string[];
};
export type QuestionRelationAnswer = QuestionRelationData;

export const generateRelationQuestionAttempt: QuestionAttemptGenerator<'relation'> = (q) => ({
    terms: Object.keys(q.pairs).sort(() => Math.random() - 0.5),
    definitions: Object.values(q.pairs).sort(() => Math.random() - 0.5),
});

export const validateRelationQuestion: QuestionAnswerValidator<'relation'> = (data, answer) => {
    return Object.keys(data.pairs).every(key => data.pairs[key] === answer.pairs[key]);
}