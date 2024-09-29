import { QuestionAttempt } from "@/features/beta_question/index";
import PreviewChoiceQuestion from "@/features/beta_question/preview/PreviewChoiceQuestion";

export const QUESTION_PREVIEWS = {
    choice: PreviewChoiceQuestion,
    fill_the_gap: PreviewChoiceQuestion,
}

export default function PreviewQuestion({ type, attempt }: {
    type: keyof typeof QUESTION_PREVIEWS,
    attempt: QuestionAttempt
}) {
    const Preview = QUESTION_PREVIEWS[type];
    return <Preview question={attempt as any}/>
}