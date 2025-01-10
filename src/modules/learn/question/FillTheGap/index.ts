import { z } from "zod";
import { QuestionAnswerValidator, QuestionAttemptGenerator } from "@/modules/learn/question";

export const QUESTION_FillTheGap_DATA_Gap = z.object({
    position: z.number(),
    type: z.enum(["text", "choice"]),
    hint: z.string().optional(),
    correctValues: z.array(z.string()),
    wrongValues: z.array(z.string()).optional(),
});

export const QUESTION_FillTheGap_DATA = z.object({
    text: z.string(),
    gaps: z.array(QUESTION_FillTheGap_DATA_Gap),
});

export type QuestionFillTheGapDataGap = z.infer<typeof QUESTION_FillTheGap_DATA_Gap>;
export type QuestionFillTheGapData = z.infer<typeof QUESTION_FillTheGap_DATA>;

export interface QuestionFillTheGapAttempt {
    segments: AttemptSegment[];
}

export type AttemptSegment = string | GapAttempt;

export interface GapAttempt {
    hint?: string,
    type: "text" | "choice",
    // TODO: For text, no answers - yet.
    answers: string[];
}

export type QuestionFillTheGapAnswer = {
    answers: string[];
}

export const generateFillTheGapQuestionAttempt: QuestionAttemptGenerator<'fill_the_gap'> = (data) => {
    const segments: AttemptSegment[] = [];
    let currentTextSegment = "";

    // Check for each char
    for (let i = 0; i < data.text.length; i++) {
        // Add the char to the current text segment buffer
        currentTextSegment += data.text[i];

        // Check for each gap
        for (let j = 0; j < data.gaps.length; j++) {
            const gap = data.gaps[j];

            if (gap.position === i) {
                // Add the text segment (just the first time
                if (currentTextSegment) {
                    segments.push(currentTextSegment);
                    currentTextSegment = "";
                }

                segments.push({
                    hint: gap.hint,
                    type: gap.type,
                    answers: [...gap.correctValues, ...(gap.wrongValues || [])].sort(() => .5 - Math.random()),
                });
            }
        }
    }

    segments.push(currentTextSegment);

    return { segments };
}

export const validateFillTheGapQuestion: QuestionAnswerValidator<'fill_the_gap'> = ({ gaps }, answer) =>
    gaps.every((gap, index) => {
        const answerValue = answer.answers[index].trim().toLowerCase();
        return gap.correctValues.map(v => v.trim().toLowerCase()).includes(answerValue);
        // ¿? --> && !(gap.wrongValues || []).includes(answerValue);
    });
