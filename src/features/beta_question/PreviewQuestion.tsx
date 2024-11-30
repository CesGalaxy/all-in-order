import { QuestionAttempt } from "@aio/db/features/questions";
import PreviewChoiceQuestion from "@/features/beta_question/preview/PreviewChoiceQuestion";
import PreviewFillTheGapQuestion from "@/features/beta_question/preview/PreviewFillTheGapQuestion";
import PreviewTrueOrFalseQuestion from "@/features/beta_question/preview/PreviewTrueOrFalseQuestion";

export const QUESTION_PREVIEWS = {
    choice: PreviewChoiceQuestion,
    fill_the_gap: PreviewFillTheGapQuestion,
    true_or_false: PreviewTrueOrFalseQuestion,
}

export default function PreviewQuestion({ type, attempt }: {
    type: keyof typeof QUESTION_PREVIEWS,
    attempt: QuestionAttempt
}) {
    const Preview = QUESTION_PREVIEWS[type];
    return <Preview question={attempt as any}/>
}