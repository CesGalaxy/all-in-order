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

export interface GapAttempt {
    hint?: string,
    type: "text" | "choice",
    // TODO: For text, no answers - yet.
    answers: string[];
}

export interface QuestionFillTheGapAnswer {
    answers: string[];
}

export function generateFillTheGapQuestionAttempt(data: QuestionFillTheGapData): QuestionFillTheGapAttempt {
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
                    answers: [...gap.correctValues, ...(gap.wrongValues || [])]
                });
            }
        }
    }

    segments.push(currentTextSegment);

    return { segments };
}

export const fillTheGapQuestionInitialAnswerDraft: QuestionFillTheGapAnswer = {
    answers: [],
}
