import { QuestionData } from "@aio/db/features/questions";
import ChoiceQuestionSolution from "@/features/beta_question/solution/ChoiceQuestionSolution";
import FillTheGapQuestionSolution from "@/features/beta_question/solution/FillTheGapQuestionSolution";
import TrueOrFalseQuestionSolution from "@/features/beta_question/solution/TrueOrFalseQuestionSolution";

export const QUESTION_SOLUTIONS = {
    choice: ChoiceQuestionSolution,
    fill_the_gap: FillTheGapQuestionSolution,
    true_or_false: TrueOrFalseQuestionSolution,
}

export default function QuestionSolution({ data }: { data: QuestionData }) {
    const Preview = QUESTION_SOLUTIONS[data.type];
    return <Preview question={data as never}/>
}