import { BaseQuestion } from "@/features/beta_question/index";

export interface QuestionTrueOrFalseData extends BaseQuestion<"true_or_false"> {
    rows: Record<string, boolean>;
}

export interface QuestionTrueOrFalseAttempt {
    rows: string[];
}

export interface QuestionTrueOrFalseAnswer {
    selectedRows: string[];
}

export function generateTrueOrFalseQuestionAttempt(data: QuestionTrueOrFalseData): QuestionTrueOrFalseAttempt {
    return { rows: Object.keys(data.rows) };
}

export function validateTrueOrFalseQuestion({ rows }: QuestionTrueOrFalseData, answer: QuestionTrueOrFalseAnswer): boolean {
    return Object
        .entries(rows)
        .every(([row, correct]) => correct === answer.selectedRows.includes(row));
}
