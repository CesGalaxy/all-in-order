import { QuestionData } from "@/features/beta_question/index";
import ChoiceQuestionSolution from "@/features/beta_question/solution/ChoiceQuestionSolution";
import FillTheGapQuestionSolution from "@/features/beta_question/solution/FillTheGapQuestionSolution";

export const QUESTION_SOLUTIONS = {
    choice: ChoiceQuestionSolution,
    fill_the_gap: FillTheGapQuestionSolution,
}

export default function QuestionSolution({ data }: { data: QuestionData }) {
    const Preview = QUESTION_SOLUTIONS[data.type];
    return <Preview question={data as never}/>
}