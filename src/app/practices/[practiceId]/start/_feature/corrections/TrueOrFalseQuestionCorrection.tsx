import {
    QuestionTrueOrFalseAnswer,
    QuestionTrueOrFalseAttempt,
    QuestionTrueOrFalseData
} from "@/features/beta_question/QuestionTrueOrFalse";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function TrueOrFalseQuestionCorrection({ data: { rows }, answer: { selectedRows } }: {
    data: QuestionTrueOrFalseData,
    attempt: QuestionTrueOrFalseAttempt,
    answer: QuestionTrueOrFalseAnswer,
    correct: boolean
}) {
    return <ul>
        {Object.entries(rows).map(([row, correct]) => <li key={row} className="flex items-center gap-2 mb-1">
            {correct
                ? <IconCheck className="text-success"/>
                : <IconX className="text-danger"/>
            }
            <span className={correct === selectedRows.includes(row) ? "text-default-600" : "text-danger"}>
                {row}
            </span>
        </li>)}
    </ul>;
}