// import { z } from "zod";
// import { QuestionAttemptGenerator } from "@/modules/learn/question";
//
// const QUESTION_Relation_DATA = z.object({
//     pairs: z.map(z.string(), z.string()),
// })
//
// export type QuestionRelationData = z.infer<typeof QUESTION_Relation_DATA>;
//
// export type QuestionRelationAttempt = QuestionRelationData;
// export type QuestionRelationAnswer = QuestionRelationData;
//
// export const generateRelationQuestionAttempt: QuestionAttemptGenerator<'relation'> = (q) => q;